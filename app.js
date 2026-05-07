/* ============================================================
 * 华东政策日报 H5 渲染逻辑（v2 多日 + 底部 Tab）
 * ============================================================ */

(function () {
  'use strict';

  /* ===== 状态 ===== */
  var state = {
    currentDate: window.AVAILABLE_DATES[0],
    currentTab: 'highlights'
  };

  /* ===== 工具函数 ===== */
  function escapeHtml(s) {
    if (s == null) return '';
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function impactChip(level) {
    var map = { high: ['chip-high', '高影响'], mid: ['chip-mid', '中影响'], low: ['chip-low', '低影响'] };
    var v = map[level] || map.mid;
    return '<span class="chip ' + v[0] + '">' + v[1] + '</span>';
  }
  function nameSearchLink(name, role) {
    var q = encodeURIComponent((name || '') + ' ' + (role || ''));
    return 'https://www.baidu.com/s?wd=' + q;
  }
  function getWeekday(dateStr) {
    var d = new Date(dateStr);
    if (isNaN(d.getTime())) return '';
    var wk = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return wk[d.getDay()];
  }

  /* ===== 渲染：本日重点关注 ===== */
  function renderHighlights(data) {
    var list = data.highlights || [];
    if (!list.length) return '<div class="empty">本日暂无重点关注事项</div>';
    return list.map(function (h) {
      var flag = h.type === 'urgent' ? '🚨 紧急' : '⭐ 重要';
      return (
        '<div class="highlight-card ' + escapeHtml(h.type) + '">' +
        '<span class="highlight-flag">' + flag + '</span>' +
        '<div class="highlight-title">' + escapeHtml(h.title) + '</div>' +
        (h.action ? '<div class="highlight-action">💡 ' + escapeHtml(h.action) + '</div>' : '') +
        '</div>'
      );
    }).join('');
  }

  /* ===== 渲染：预警 ===== */
  function renderAlerts(data) {
    var list = (data.alerts || []).slice().sort(function (a, b) {
      if (a.level !== b.level) return a.level - b.level;
      return (a.countdown || 0) - (b.countdown || 0);
    });
    if (!list.length) return '<div class="empty">本日暂无预警事项</div>';
    return list.map(function (al) {
      var icon = al.level === 1 ? '🚨' : (al.level === 2 ? '⚠️' : '🔔');
      var titleHtml = al.url
        ? '<a href="' + escapeHtml(al.url) + '" target="_blank" rel="noopener">' + escapeHtml(al.title) + '</a>'
        : escapeHtml(al.title);
      return (
        '<div class="alert-card level-' + al.level + '">' +
        '<div class="alert-countdown">' +
        '<span class="alert-icon">' + icon + '</span>' +
        '<span class="alert-num">' + (al.countdown != null ? al.countdown : '-') + '</span>' +
        '<span class="alert-unit">' + escapeHtml(al.unit || '天') + '</span>' +
        '</div>' +
        '<div class="alert-body">' +
        '<div class="alert-title">' + titleHtml + '</div>' +
        (al.status ? '<div class="alert-status">' + escapeHtml(al.status) + '</div>' : '') +
        (al.deadline ? '<div class="alert-deadline">截止 ' + escapeHtml(al.deadline) + '</div>' : '') +
        '</div>' +
        '</div>'
      );
    }).join('');
  }

  /* ===== 渲染：政策（按地区分组） ===== */
  function renderEntries(data) {
    var entries = data.entries || [];
    if (!entries.length) return '<div class="empty">本日暂无政策动态</div>';
    var REGION_ORDER = ['国家级', '上海', '江苏', '浙江', '安徽', '福建', '湖南', '江西'];
    var groups = {};
    entries.forEach(function (e) {
      var r = e.region || '其他';
      if (!groups[r]) groups[r] = [];
      groups[r].push(e);
    });
    // 按规则手册顺序渲染
    var html = '';
    REGION_ORDER.concat(Object.keys(groups).filter(function (r) { return REGION_ORDER.indexOf(r) === -1; }))
      .forEach(function (region) {
        var arr = groups[region];
        if (!arr || !arr.length) return;
        html += '<div class="region-group">';
        html += '<div class="region-header"><span>' + escapeHtml(region) + '</span><span class="region-count">' + arr.length + ' 条</span></div>';
        html += '<div class="region-body">';
        arr.forEach(function (e) {
          var titleHtml = e.url
            ? '<a href="' + escapeHtml(e.url) + '" target="_blank" rel="noopener">' + escapeHtml(e.title) + '</a>'
            : escapeHtml(e.title);
          html += '<div class="entry-card' + (e.isBackfill ? ' backfill' : '') + '">';
          html += '<div class="entry-title">';
          if (e.isBackfill) html += '<span class="backfill-tag">📌 补录</span>';
          html += titleHtml + '</div>';
          html += '<div class="entry-meta">';
          if (e.dept) html += '<span class="card-meta-item">' + escapeHtml(e.dept) + '</span>';
          if (e.date) html += '<span class="card-meta-item">' + escapeHtml(e.date) + '</span>';
          if (e.category) html += '<span class="card-meta-item">' + escapeHtml(e.category) + '</span>';
          html += impactChip(e.impact);
          html += '</div>';
          if (e.content) html += '<div class="entry-content">' + escapeHtml(e.content) + '</div>';
          if (e.impactReason) html += '<div class="entry-reason">📊 影响：' + escapeHtml(e.impactReason) + '</div>';
          html += '</div>';
        });
        html += '</div></div>';
      });
    return html;
  }

  /* ===== 渲染：人事 ===== */
  function renderPersonnel(data) {
    var groups = data.personnel || [];
    if (!groups.length) return '<div class="empty">本日暂无人事变动</div>';
    return groups.map(function (g) {
      var html = '<div class="personnel-group">';
      html += '<div class="personnel-header">' + escapeHtml(g.scope || '') + '<span class="personnel-source">来源：' + escapeHtml(g.source || '') + '</span></div>';
      (g.appointments || []).forEach(function (p) {
        html += renderPerson(p, 'appoint');
      });
      (g.removals || []).forEach(function (p) {
        html += renderPerson(p, 'remove');
      });
      html += '</div>';
      return html;
    }).join('');
  }
  function renderPerson(p, kind) {
    var typeLabel = kind === 'appoint' ? '✅ 任命' : '⛔ 免职';
    var html = '<div class="appoint-block">';
    html += '<span class="appoint-type ' + kind + '">' + typeLabel + '</span>';
    html += '<div class="appoint-name"><a href="' + nameSearchLink(p.name, p.newRole || p.prevRole) + '" target="_blank" rel="noopener">' + escapeHtml(p.name) + '</a></div>';
    var roles = '';
    if (p.prevRole) roles += '<span>' + escapeHtml(p.prevRole) + '</span>';
    if (p.prevRole && p.newRole) roles += '<span class="arrow">→</span>';
    if (p.newRole) roles += '<span>' + escapeHtml(p.newRole) + '</span>';
    if (roles) html += '<div class="appoint-roles">' + roles + '</div>';
    if (p.note) html += '<div class="appoint-note">' + escapeHtml(p.note) + '</div>';
    if (p.analysis) {
      var a = p.analysis;
      html += '<div class="analysis">';
      if (a.bio) html += '<div class="analysis-row"><span class="analysis-label">人物履历</span>' + escapeHtml(a.bio) + '</div>';
      if (a.leaderLink) html += '<div class="analysis-row"><span class="analysis-label">与领导关联</span>' + escapeHtml(a.leaderLink) + '</div>';
      if (a.tencentLink) html += '<div class="analysis-row"><span class="analysis-label">与腾讯关联</span>' + escapeHtml(a.tencentLink) + '</div>';
      if (a.impact) html += '<div class="analysis-row impact"><span class="analysis-label">对腾讯影响</span>' + escapeHtml(a.impact) + '</div>';
      html += '</div>';
    }
    html += '</div>';
    return html;
  }

  /* ===== 渲染：腾讯动态 ===== */
  function renderTencent(data) {
    var list = data.tencent || [];
    if (!list.length) return '<div class="empty">本日暂无腾讯动态</div>';
    return list.map(function (t) {
      var titleHtml = t.url
        ? '<a href="' + escapeHtml(t.url) + '" target="_blank" rel="noopener">' + escapeHtml(t.title) + '</a>'
        : escapeHtml(t.title);
      return (
        '<div class="card">' +
        '<div class="card-title">' + titleHtml + '</div>' +
        '<div class="card-meta"><span class="card-meta-item">' + escapeHtml(t.date) + '</span></div>' +
        (t.content ? '<div class="card-content">' + escapeHtml(t.content) + '</div>' : '') +
        '</div>'
      );
    }).join('');
  }

  /* ===== 渲染：友商（国外在前 国内在后） ===== */
  function renderCompetitors(data) {
    var list = data.competitors || [];
    if (!list.length) return '<div class="empty">本日暂无友商动态</div>';
    var intl = list.filter(function (c) { return c.region === 'intl'; });
    var cn = list.filter(function (c) { return c.region !== 'intl'; });
    var html = '';
    if (intl.length) {
      html += '<div class="competitor-section"><div class="competitor-section-title">🌍 国外友商（' + intl.length + '）</div></div>';
      html += intl.map(competitorCard).join('');
    }
    if (cn.length) {
      html += '<div class="competitor-section"><div class="competitor-section-title">🇨🇳 国内友商（' + cn.length + '）</div></div>';
      html += cn.map(competitorCard).join('');
    }
    return html;
  }
  function competitorCard(c) {
    var titleHtml = c.url
      ? '<a href="' + escapeHtml(c.url) + '" target="_blank" rel="noopener">' + escapeHtml(c.title) + '</a>'
      : escapeHtml(c.title);
    return (
      '<div class="card competitor-card ' + (c.region === 'intl' ? 'intl' : 'cn') + '">' +
      '<div class="card-title">' +
      '<span class="competitor-name">' + escapeHtml(c.name) + '</span>' +
      titleHtml +
      '</div>' +
      '<div class="card-meta">' +
      '<span class="card-meta-item">' + escapeHtml(c.date) + '</span>' +
      (c.category ? '<span class="card-meta-item">' + escapeHtml(c.category) + '</span>' : '') +
      '</div>' +
      (c.update ? '<div class="card-content">' + escapeHtml(c.update) + '</div>' : '') +
      '</div>'
    );
  }

  /* ===== 渲染：活动 ===== */
  function renderEvents(data) {
    var list = (data.events || []).slice().sort(function (a, b) { return (b.relevance || 0) - (a.relevance || 0); });
    if (!list.length) return '<div class="empty">暂无活动</div>';
    return list.map(function (e) {
      var stars = '⭐'.repeat(e.relevance || 1);
      return (
        '<div class="card event-card">' +
        '<div class="card-title">' + escapeHtml(e.name) + '<span class="event-relevance">' + stars + '</span></div>' +
        '<div class="card-meta">' +
        '<span class="card-meta-item">📅 ' + escapeHtml(e.time) + '</span>' +
        (e.location ? '<span class="card-meta-item">📍 ' + escapeHtml(e.location) + '</span>' : '') +
        '</div>' +
        (e.note ? '<div class="card-content">' + escapeHtml(e.note) + '</div>' : '') +
        '</div>'
      );
    }).join('');
  }

  /* ===== 整体渲染 ===== */
  function renderAll() {
    var data = window.DAILY_DATA_BY_DATE[state.currentDate];
    if (!data) {
      console.warn('No data for date:', state.currentDate);
      return;
    }
    document.getElementById('reportTitle').textContent = data.reportTitle || '华东政策日报';
    document.getElementById('reportSubtitle').textContent = data.reportSubtitle || '';
    document.getElementById('dateTriggerText').textContent = state.currentDate;

    document.getElementById('highlightsBody').innerHTML = renderHighlights(data);
    document.getElementById('alertsBody').innerHTML = renderAlerts(data);
    document.getElementById('entriesBody').innerHTML = renderEntries(data);
    document.getElementById('personnelBody').innerHTML = renderPersonnel(data);
    document.getElementById('tencentBody').innerHTML = renderTencent(data);
    document.getElementById('competitorsBody').innerHTML = renderCompetitors(data);
    document.getElementById('eventsBody').innerHTML = renderEvents(data);
  }

  /* ===== Tab 切换 ===== */
  function switchTab(tabName) {
    state.currentTab = tabName;
    var tabs = document.querySelectorAll('.tab-bar .tab-item');
    tabs.forEach(function (t) {
      t.classList.toggle('active', t.getAttribute('data-tab') === tabName);
    });
    var pages = document.querySelectorAll('.page');
    pages.forEach(function (p) {
      p.hidden = p.getAttribute('data-page') !== tabName;
    });
    // 切 tab 后滚回顶部
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }

  /* ===== 日期选择器 ===== */
  function openDatePicker() {
    var mask = document.getElementById('datePickerMask');
    var listEl = document.getElementById('datePickerList');
    var html = window.AVAILABLE_DATES.map(function (d) {
      var isActive = d === state.currentDate;
      var weekday = getWeekday(d);
      return (
        '<button class="date-picker-item' + (isActive ? ' active' : '') + '" data-date="' + d + '">' +
        '<span>' + d + '<span class="date-picker-weekday">' + weekday + '</span></span>' +
        (isActive ? '<span class="date-picker-check">✓</span>' : '') +
        '</button>'
      );
    }).join('');
    listEl.innerHTML = html;
    mask.hidden = false;
  }
  function closeDatePicker() {
    document.getElementById('datePickerMask').hidden = true;
  }
  function selectDate(date) {
    if (!window.DAILY_DATA_BY_DATE[date]) return;
    state.currentDate = date;
    closeDatePicker();
    renderAll();
    // 切日期后回到"重点"页
    switchTab('highlights');
  }

  /* ===== 事件绑定 ===== */
  function bindEvents() {
    document.querySelectorAll('.tab-bar .tab-item').forEach(function (btn) {
      btn.addEventListener('click', function () {
        switchTab(btn.getAttribute('data-tab'));
      });
    });
    document.getElementById('dateTrigger').addEventListener('click', openDatePicker);
    document.getElementById('datePickerClose').addEventListener('click', closeDatePicker);
    document.getElementById('datePickerMask').addEventListener('click', function (e) {
      if (e.target === e.currentTarget) closeDatePicker();
    });
    document.getElementById('datePickerList').addEventListener('click', function (e) {
      var btn = e.target.closest('.date-picker-item');
      if (btn) selectDate(btn.getAttribute('data-date'));
    });
  }

  /* ===== 启动 ===== */
  function init() {
    if (!window.DAILY_DATA_BY_DATE || !window.AVAILABLE_DATES || !window.AVAILABLE_DATES.length) {
      document.body.innerHTML = '<div style="padding:40px;text-align:center;color:#999">数据未加载</div>';
      return;
    }
    bindEvents();
    renderAll();
    switchTab('highlights');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
