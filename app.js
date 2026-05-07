/* ============================================================
 * 华东区域政策日报 H5 渲染逻辑
 * 规则：v3.8
 * ============================================================ */
(function () {
  const D = window.DAILY_DATA || {};

  /* === 工具函数 === */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  const impactLabel = { high: "高", mid: "中", low: "低" };
  const impactClass = { high: "impact-high", mid: "impact-mid", low: "impact-low" };

  /* === 顶部信息 === */
  function renderHeader() {
    if (D.reportTitle) $("#report-title").textContent = D.reportTitle;
    $("#report-meta").textContent = D.reportSubtitle || "";
    $("#report-date").textContent = (D.reportDate || "") + (D.reportWeekday ? " · " + D.reportWeekday : "");
  }

  /* === 本日重点关注事项 === */
  function renderHighlights() {
    const list = D.highlights || [];
    const box = $("#highlight-list");
    if (!list.length) {
      box.innerHTML = '<div class="empty">本日暂无重点关注事项</div>';
      return;
    }
    box.innerHTML = list.map((h, i) => {
      const cls = h.type === "urgent" ? "urgent" : "important";
      const tag = h.type === "urgent" ? "🔴 紧急" : "🔵 重要";
      return `
        <div class="highlight-item ${cls}">
          <div class="h-title">${tag} · ${esc(h.title)}</div>
          ${h.action ? `<div class="h-action">▶ 行动建议：${esc(h.action)}</div>` : ""}
        </div>`;
    }).join("");
  }

  /* === 政策 Tab === */
  function renderEntries() {
    const list = (D.entries || []).slice();
    const order = ["国家级", "上海", "江苏", "浙江", "安徽", "福建", "湖南", "江西"];
    const groups = {};
    order.forEach(r => groups[r] = []);
    list.forEach(e => {
      const r = e.region || "其他";
      if (!groups[r]) groups[r] = [];
      groups[r].push(e);
    });

    const html = order.filter(r => groups[r] && groups[r].length).map(r => {
      const items = groups[r].map(e => renderEntryCard(e)).join("");
      return `
        <div class="region-block">
          <div class="region-head">📍 ${esc(r)} <span class="count">（${groups[r].length} 条）</span></div>
          ${items}
        </div>`;
    }).join("");

    $("#pane-entries").innerHTML = html || emptyHtml("📄", "本日无新增政策");
    $("#badge-entries").textContent = list.length;
  }

  function renderEntryCard(e) {
    const cls = "card" + (e.isBackfill ? " backfill" : "");
    const impCls = impactClass[e.impact] || "impact-mid";
    const impLab = impactLabel[e.impact] || "中";
    const link = e.url ? `<a class="card-link" href="${esc(e.url)}" target="_blank" rel="noopener">查看原文 →</a>` : "";
    return `
      <div class="${cls}">
        <div class="card-title">${e.url ? `<a href="${esc(e.url)}" target="_blank" rel="noopener">${esc(e.title)}</a>` : esc(e.title)}</div>
        <div class="card-meta">
          <span>🏛 ${esc(e.dept || "—")}</span>
          <span>📅 ${esc(e.date || "—")}</span>
          ${e.category ? `<span>🏷 ${esc(e.category)}</span>` : ""}
          <span class="impact ${impCls}">影响：${impLab}</span>
        </div>
        <div class="card-content">${esc(e.content || "")}</div>
        ${e.impactReason ? `<div class="card-content" style="margin-top:6px;color:#5b6470;font-size:12.5px;">▸ ${esc(e.impactReason)}</div>` : ""}
        ${link}
      </div>`;
  }

  /* === 人事 Tab === */
  function renderPersonnel() {
    const list = D.personnel || [];
    if (!list.length) {
      $("#pane-personnel").innerHTML = emptyHtml("👤", "本日无人事变动");
      $("#badge-personnel").textContent = 0;
      return;
    }
    let count = 0;
    const html = list.map(p => {
      const apps = (p.appointments || []);
      const rms = (p.removals || []);
      count += apps.length + rms.length;
      // 跳过完全空的批次
      if (!apps.length && !rms.length) return "";
      const allItems = [
        ...apps.map(a => renderPerson(a, "appoint")),
        ...rms.map(r => renderPerson(r, "remove"))
      ].join("");
      return `
        <div class="personnel-batch">
          <div class="personnel-head">${esc(p.scope || "人事任免")}<span class="personnel-source">来源：${esc(p.source || "—")}</span></div>
          ${allItems}
        </div>`;
    }).join("");
    $("#pane-personnel").innerHTML = html;
    $("#badge-personnel").textContent = count;
  }

  function renderPerson(person, action) {
    const actLab = action === "appoint" ? "✅ 任命" : "❌ 免职";
    const actCls = action === "appoint" ? "appoint" : "remove";
    const baiduUrl = `https://www.baidu.com/s?wd=${encodeURIComponent((person.name || "") + " " + (person.newRole || person.prevRole || ""))}`;

    let analysisHtml = "";
    if (person.analysis) {
      const a = person.analysis;
      analysisHtml = `
        <dl class="person-analysis">
          ${a.bio ? `<dt>📋 基本履历</dt><dd>${esc(a.bio)}</dd>` : ""}
          ${a.leaderLink ? `<dt>🔗 高层交集</dt><dd>${esc(a.leaderLink)}</dd>` : ""}
          ${a.tencentLink ? `<dt>🐧 腾讯交集</dt><dd>${esc(a.tencentLink)}</dd>` : ""}
          ${a.impact ? `<dt>📊 影响研判</dt><dd class="impact-tag">${esc(a.impact)}</dd>` : ""}
        </dl>`;
    }
    return `
      <div class="person-card">
        <div class="person-row">
          <span class="person-name">${esc(person.name || "—")}</span>
          <span class="person-action ${actCls}">${actLab}</span>
          <a class="card-link" href="${baiduUrl}" target="_blank" rel="noopener">百度搜索</a>
        </div>
        <div class="person-role">→ ${esc(person.newRole || "—")}</div>
        ${person.prevRole ? `<div class="person-prev">原任：${esc(person.prevRole)}</div>` : ""}
        ${person.note ? `<div class="person-prev">备注：${esc(person.note)}</div>` : ""}
        ${analysisHtml}
      </div>`;
  }

  /* === 预警 Tab === */
  function renderAlerts() {
    const list = D.alerts || [];
    if (!list.length) {
      $("#pane-alerts").innerHTML = emptyHtml("⚠️", "本日无预警事项");
      $("#badge-alerts").textContent = 0;
      return;
    }
    const sorted = list.slice().sort((a, b) => (a.level || 9) - (b.level || 9));
    const html = sorted.map(a => {
      const lv = a.level || 3;
      return `
        <div class="alert-card level-${lv}">
          <div class="alert-countdown">
            <span class="num">${a.countdown != null ? a.countdown : "—"}</span>
            <span class="unit">${esc(a.unit || "天")}</span>
          </div>
          <div class="alert-body">
            <div class="alert-title">${esc(a.title || "")}</div>
            <div class="alert-status">${esc(a.status || "")}</div>
            ${a.deadline ? `<div class="alert-status">📌 截止：${esc(a.deadline)}</div>` : ""}
            ${a.url ? `<a class="card-link" href="${esc(a.url)}" target="_blank" rel="noopener">查看详情 →</a>` : ""}
          </div>
        </div>`;
    }).join("");
    $("#pane-alerts").innerHTML = html;
    $("#badge-alerts").textContent = list.length;
  }

  /* === 腾讯 Tab === */
  function renderTencent() {
    const list = D.tencent || [];
    if (!list.length) {
      $("#pane-tencent").innerHTML = emptyHtml("🐧", "本日无腾讯动态");
      $("#badge-tencent").textContent = 0;
      return;
    }
    const html = list.map(t => `
      <div class="card" style="border-left-color:#1a3a6c;">
        <div class="card-title">${t.url ? `<a href="${esc(t.url)}" target="_blank" rel="noopener">${esc(t.title)}</a>` : esc(t.title)}</div>
        <div class="card-meta"><span>📅 ${esc(t.date || "")}</span></div>
        <div class="card-content">${esc(t.content || "")}</div>
        ${t.url ? `<a class="card-link" href="${esc(t.url)}" target="_blank" rel="noopener">查看详情 →</a>` : ""}
      </div>
    `).join("");
    $("#pane-tencent").innerHTML = html;
    $("#badge-tencent").textContent = list.length;
  }

  /* === 友商 Tab（国外在前·国内在后） === */
  function renderCompetitors() {
    const list = D.competitors || [];
    if (!list.length) {
      $("#pane-competitors").innerHTML = emptyHtml("🏢", "本日无友商动态");
      $("#badge-competitors").textContent = 0;
      return;
    }
    const intl = list.filter(c => c.region === "intl");
    const cn = list.filter(c => c.region !== "intl");

    const renderOne = (c) => `
      <div class="competitor-card">
        <div class="competitor-name">${esc(c.name || "—")}${c.category ? ` · <span style="color:#8a8a8a;font-weight:400;">${esc(c.category)}</span>` : ""}</div>
        <div class="competitor-title">${c.url ? `<a href="${esc(c.url)}" target="_blank" rel="noopener">${esc(c.title || "")}</a>` : esc(c.title || "")}</div>
        <div class="competitor-update">${esc(c.update || "")}</div>
        <div class="competitor-meta">📅 ${esc(c.date || "")}</div>
      </div>`;

    let html = "";
    if (intl.length) {
      html += `<div class="competitor-group">
        <div class="competitor-head">🌐 国际企业 <span style="color:#8a8a8a;font-weight:400;">（${intl.length}）</span></div>
        ${intl.map(renderOne).join("")}
      </div>`;
    }
    if (cn.length) {
      html += `<div class="competitor-group">
        <div class="competitor-head">🇨🇳 国内企业 <span style="color:#8a8a8a;font-weight:400;">（${cn.length}）</span></div>
        ${cn.map(renderOne).join("")}
      </div>`;
    }
    $("#pane-competitors").innerHTML = html;
    $("#badge-competitors").textContent = list.length;
  }

  /* === 活动 Tab === */
  function renderEvents() {
    const list = D.events || [];
    if (!list.length) {
      $("#pane-events").innerHTML = emptyHtml("📅", "近期无活动");
      $("#badge-events").textContent = 0;
      return;
    }
    const rows = list.map(e => {
      const stars = "⭐".repeat(e.relevance || 1);
      const relLab = e.relevance === 3 ? "高" : e.relevance === 2 ? "中" : "低";
      return `
        <tr>
          <td><strong>${esc(e.name || "")}</strong>${e.note ? `<div style="color:#5b6470;font-size:12px;margin-top:4px;">${esc(e.note)}</div>` : ""}</td>
          <td>${esc(e.time || "")}</td>
          <td>${esc(e.location || "")}</td>
          <td class="relevance relevance-${e.relevance || 1}">${stars} ${relLab}</td>
        </tr>`;
    }).join("");
    $("#pane-events").innerHTML = `
      <table class="event-table">
        <thead><tr><th>会议/活动</th><th>时间</th><th>地点</th><th>关联度</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>`;
    $("#badge-events").textContent = list.length;
  }

  /* === 空状态 === */
  function emptyHtml(emoji, msg) {
    return `<div class="empty"><span class="empty-emoji">${emoji}</span>${msg}</div>`;
  }

  /* === Tab 切换 === */
  function bindTabs() {
    $$("#tabs .tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const tab = btn.dataset.tab;
        $$("#tabs .tab-btn").forEach(b => b.classList.toggle("active", b === btn));
        $$(".tab-pane").forEach(p => p.classList.toggle("active", p.id === "pane-" + tab));
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  /* === 初始化 === */
  document.addEventListener("DOMContentLoaded", () => {
    renderHeader();
    renderHighlights();
    renderAlerts();
    renderEntries();
    renderPersonnel();
    renderTencent();
    renderCompetitors();
    renderEvents();
    bindTabs();
  });
})();
