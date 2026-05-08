/* ============================================================
 * 华东政策日报 H5 渲染逻辑 · v4（三池 + 六视图）
 *
 * 架构：从 entries/personnel/competitors 三池筛出 6 栏目
 *   导读 = entries.filter(isTop)
 *   预警 = entries.filter(level && deadline)
 *   政策 = entries.filter(category ∈ POLICY_CATS)
 *   行业 = entries.filter(category ∈ INDUSTRY_CATS) + competitors
 *   人事 = personnel（直出）
 *   活动 = entries.filter(category === '活动')
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
  function fallbackSearchLink(title, extra) {
    var q = encodeURIComponent((title || '') + (extra ? ' ' + extra : ''));
    return 'https://www.baidu.com/s?wd=' + q;
  }
  function resolveLink(item, extraKeyword) {
    if (item && item.url) return item.url;
    return fallbackSearchLink(item && (item.title || item.name) || '', extraKeyword || '');
  }
  function getWeekday(dateStr) {
    var d = new Date(dateStr);
    if (isNaN(d.getTime())) return '';
    var wk = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return wk[d.getDay()];
  }

  /* ===== 视图筛选函数（从三池 → 六栏目） ===== */
  function getHighlights(data) {
    return (data.entries || []).filter(function (e) { return e.isTop; });
  }
  function getAlerts(data) {
    return (data.entries || []).filter(function (e) { return e.level && e.deadline; })
      .slice()
      .sort(function (a, b) {
        if (a.level !== b.level) return a.level - b.level;
        return (a.countdown || 0) - (b.countdown || 0);
      });
  }
  function getPolicy(data) {
    var cats = window.POLICY_CATS || [];
    return (data.entries || []).filter(function (e) { return cats.indexOf(e.category) !== -1; });
  }
  function getIndustryEntries(data) {
    var cats = window.INDUSTRY_CATS || [];
    return (data.entries || []).filter(function (e) { return cats.indexOf(e.category) !== -1; });
  }
  function getEvents(data) {
    return (data.entries || []).filter(function (e) { return e.category === '活动'; })
      .slice()
      .sort(function (a, b) { return (b.relevance || 0) - (a.relevance || 0); });
  }

  /* ===== 渲染：导读 ===== */
  function renderHighlights(data) {
    var list = getHighlights(data);
    if (!list.length) return '<div class="empty">本日暂无导读事项</div>';
    return list.map(function (h) {
      var flag = h.impact === 'high' ? '🚨 重点' : '⭐ 关注';
      var href = resolveLink(h);
      return (
        '<a class="highlight-card ' + (h.impact === 'high' ? 'urgent' : 'important') + '" href="' + escapeHtml(href) + '" target="_blank" rel="noopener">' +
        '<span class="highlight-flag">' + flag + '</span>' +
        '<div class="highlight-title">' + escapeHtml(h.title) + '</div>' +
        (h.headline ? '<div class="highlight-headline">' + escapeHtml(h.headline) + '</div>' : '') +
        (h.action ? '<div class="highlight-action">💡 ' + escapeHtml(h.action) + '</div>' : '') +
        '<span class="card-link-arrow">查看原文 ›</span>' +
        '</a>'
      );
    }).join('');
  }

  /* ===== 渲染：预警 ===== */
  function renderAlerts(data) {
    var list = getAlerts(data);
    if (!list.length) return '<div class="empty">本日暂无预警事项</div>';
    return list.map(function (al) {
      var icon = al.level === 1 ? '🚨' : (al.level === 2 ? '⚠️' : '🔔');
      var href = resolveLink(al);
      var titleHtml = '<a href="' + escapeHtml(href) + '" target="_blank" rel="noopener">' + escapeHtml(al.title) + '</a>';
      return (
        '<div class="alert-card level-' + al.level + '">' +
        '<div class="alert-countdown">' +
        '<span class="alert-icon">' + icon + '</span>' +
        '<span class="alert-num">' + (al.countdown != null ? al.countdown : '-') + '</span>' +
        '<span class="alert-unit">天</span>' +
        '</div>' +
        '<div class="alert-body">' +
        '<div class="alert-title">' + titleHtml + '</div>' +
        (al.status ? '<div class="alert-status">' + escapeHtml(al.status) + '</div>' : '') +
        (al.content ? '<div class="alert-status">' + escapeHtml(al.content) + '</div>' : '') +
        (al.deadline ? '<div class="alert-deadline">截止 ' + escapeHtml(al.deadline) + '</div>' : '') +
        '</div>' +
        '</div>'
      );
    }).join('');
  }

  /* ===== 渲染：政策 / 行业（共用，按地区分组 entry 卡） ===== */
  function renderEntryList(list, emptyText) {
    if (!list.length) return '<div class="empty">' + emptyText + '</div>';
    var REGION_ORDER = ['国家级', '上海', '江苏', '浙江', '安徽', '福建', '湖南', '江西', '全国', '国际', '其他'];
    var groups = {};
    list.forEach(function (e) {
      var r = e.region || '其他';
      if (!groups[r]) groups[r] = [];
      groups[r].push(e);
    });
    var html = '';
    REGION_ORDER.concat(Object.keys(groups).filter(function (r) { return REGION_ORDER.indexOf(r) === -1; }))
      .forEach(function (region) {
        var arr = groups[region];
        if (!arr || !arr.length) return;
        html += '<div class="region-group">';
        html += '<div class="region-header"><span>' + escapeHtml(region) + '</span><span class="region-count">' + arr.length + ' 条</span></div>';
        html += '<div class="region-body">';
        arr.forEach(function (e) {
          var href = resolveLink(e, e.dept || '');
          var titleHtml = '<a href="' + escapeHtml(href) + '" target="_blank" rel="noopener">' + escapeHtml(e.title) + '</a>';
          html += '<div class="entry-card' + (e.isBackfill ? ' backfill' : '') + (e.isTop ? ' top' : '') + '">';
          html += '<div class="entry-title">';
          if (e.isTop) html += '<span class="backfill-tag" style="background:#fff3cd;color:#856404">📌 导读</span>';
          if (e.isBackfill) html += '<span class="backfill-tag">📌 补录</span>';
          html += titleHtml + '</div>';
          if (e.headline) html += '<div class="entry-headline" style="font-size:13px;color:#666;margin:4px 0">' + escapeHtml(e.headline) + '</div>';
          html += '<div class="entry-meta">';
          if (e.dept) html += '<span class="card-meta-item">' + escapeHtml(e.dept) + '</span>';
          if (e.source && e.source !== e.dept) html += '<span class="card-meta-item">源：' + escapeHtml(e.source) + '</span>';
          if (e.date) html += '<span class="card-meta-item">' + escapeHtml(e.date) + '</span>';
          if (e.category) html += '<span class="card-meta-item">' + escapeHtml(e.category) + '</span>';
          html += impactChip(e.impact);
          html += '</div>';
          if (e.content) html += '<div class="entry-content">' + escapeHtml(e.content) + '</div>';
          if (e.impactReason) html += '<div class="entry-reason">📊 影响：' + escapeHtml(e.impactReason) + '</div>';
          if (e.action) html += '<div class="entry-reason" style="background:#fff8e1;color:#5d4037">💡 行动：' + escapeHtml(e.action) + '</div>';
          html += '</div>';
        });
        html += '</div></div>';
      });
    return html;
  }

  function renderPolicy(data) {
    return renderEntryList(getPolicy(data), '本日暂无政策发文');
  }

  /* ===== 渲染：行业（产业 entries + competitors） ===== */
  function renderIndustry(data) {
    var industryEntries = getIndustryEntries(data);
    var competitors = data.competitors || [];
    var tencent = competitors.filter(function (c) { return c.isTencent; });
    var intl = competitors.filter(function (c) { return !c.isTencent && c.region === 'intl'; });
    var cn = competitors.filter(function (c) { return !c.isTencent && c.region !== 'intl'; });

    var html = '';

    // 1) 产业动态（entries 里 INDUSTRY_CATS）
    if (industryEntries.length) {
      html += '<div class="competitor-section"><div class="competitor-section-title">📈 产业动态（' + industryEntries.length + '）</div></div>';
      html += renderEntryList(industryEntries, '暂无产业动态');
    }

    // 2) 腾讯
    if (tencent.length) {
      html += '<div class="competitor-section"><div class="competitor-section-title">🐧 腾讯动态（' + tencent.length + '）</div></div>';
      html += tencent.map(competitorCard).join('');
    }

    // 3) 国外友商
    if (intl.length) {
      html += '<div class="competitor-section"><div class="competitor-section-title">🌍 国外友商（' + intl.length + '）</div></div>';
      html += intl.map(competitorCard).join('');
    }

    // 4) 国内友商
    if (cn.length) {
      html += '<div class="competitor-section"><div class="competitor-section-title">🇨🇳 国内友商（' + cn.length + '）</div></div>';
      html += cn.map(competitorCard).join('');
    }

    if (!html) return '<div class="empty">本日暂无行业动态</div>';
    return html;
  }

  function competitorCard(c) {
    var href = resolveLink(c, c.name || '');
    var cls = c.isTencent ? 'tencent' : (c.region === 'intl' ? 'intl' : 'cn');
    return (
      '<a class="card competitor-card ' + cls + '" href="' + escapeHtml(href) + '" target="_blank" rel="noopener">' +
      '<div class="card-title">' +
      '<span class="competitor-name">' + escapeHtml(c.name) + '</span>' +
      escapeHtml(c.title) +
      '</div>' +
      '<div class="card-meta">' +
      '<span class="card-meta-item">' + escapeHtml(c.date || '') + '</span>' +
      (c.category ? '<span class="card-meta-item">' + escapeHtml(c.category) + '</span>' : '') +
      '</div>' +
      (c.update ? '<div class="card-content">' + escapeHtml(c.update) + '</div>' : '') +
      '<span class="card-link-arrow">查看原文 ›</span>' +
      '</a>'
    );
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
      if (g.note) html += '<div class="entry-content" style="padding:8px 12px;color:#666;font-size:13px;">ℹ️ ' + escapeHtml(g.note) + '</div>';
      html += '</div>';
      return html;
    }).join('');
  }
  function renderPerson(p, kind) {
    var typeLabel = kind === 'appoint' ? '✅ 任命' : '⛔ 免职';
    var href = p.url ? p.url : nameSearchLink(p.name, p.newRole || p.prevRole);
    var html = '<div class="appoint-block">';
    html += '<span class="appoint-type ' + kind + '">' + typeLabel + '</span>';
    html += '<div class="appoint-name"><a href="' + escapeHtml(href) + '" target="_blank" rel="noopener">' + escapeHtml(p.name) + '</a>' + (p.level ? '<span style="margin-left:8px;font-size:12px;color:#999">（' + escapeHtml(p.level) + '）</span>' : '') + '</div>';
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

  /* ===== 渲染：活动 ===== */
  function renderEvents(data) {
    var list = getEvents(data);
    if (!list.length) return '<div class="empty">暂无活动</div>';
    return list.map(function (e) {
      var stars = '⭐'.repeat(e.relevance || 1);
      var href = resolveLink({ url: e.url, title: e.title, name: e.title }, e.location || '');
      return (
        '<a class="card event-card" href="' + escapeHtml(href) + '" target="_blank" rel="noopener">' +
        '<div class="card-title">' + escapeHtml(e.title) + '<span class="event-relevance">' + stars + '</span></div>' +
        '<div class="card-meta">' +
        '<span class="card-meta-item">📅 ' + escapeHtml(e.eventTime || e.date || '') + '</span>' +
        (e.location ? '<span class="card-meta-item">📍 ' + escapeHtml(e.location) + '</span>' : '') +
        (e.dept ? '<span class="card-meta-item">' + escapeHtml(e.dept) + '</span>' : '') +
        '</div>' +
        (e.content ? '<div class="card-content">' + escapeHtml(e.content) + '</div>' : '') +
        (e.impactReason ? '<div class="entry-reason">📊 ' + escapeHtml(e.impactReason) + '</div>' : '') +
        '<span class="card-link-arrow">查看详情 ›</span>' +
        '</a>'
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
    document.getElementById('policyBody').innerHTML = renderPolicy(data);
    document.getElementById('industryBody').innerHTML = renderIndustry(data);
    document.getElementById('personnelBody').innerHTML = renderPersonnel(data);
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
