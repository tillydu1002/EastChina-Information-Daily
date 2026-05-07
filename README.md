# 华东政策日报 H5

每日华东区域政策、人事、友商、活动、预警动态汇总页面，规则遵循《日报生成规则手册 v3.8》。

## 在线访问

🌐 **https://tillydu1002.github.io/EastChina-Information-Daily/**

手机浏览器直接打开同样可访问（已做响应式适配）。

## 本地预览

```powershell
cd h5
python -m http.server 8765
# 浏览器打开 http://localhost:8765/
```

## 文件结构

| 文件 | 作用 |
|---|---|
| `index.html` | 页面框架（顶栏 + 本日重点关注 + 6 Tab） |
| `style.css` | 全部样式（微软雅黑、影响等级配色） |
| `data.js` | **每日维护的唯一文件**（增量追加，不替换） |
| `app.js` | 渲染逻辑（纯 JS，无构建依赖） |

## 每日更新流程（SOP）

1. 编辑 `data.js`，**向对应数组追加新条目**（v3.8 铁律：增量追加，不替换历史）
2. 一键发布：

```powershell
cd c:/Users/tillydu/WorkBuddy/20260506162756/h5
git add data.js
git commit -m "data: 2026-MM-DD"
git push
```

3. 等约 1 分钟，刷新 https://tillydu1002.github.io/EastChina-Information-Daily/ 即看到最新内容
4. 部署状态可在 GitHub 仓库 → Actions 标签查看（绿色对勾 = 部署成功）

### 回滚

误推后可立刻撤回：

```powershell
git revert HEAD
git push
```

### 数据校验清单（推送前）

- [ ] 政策按省市顺序排列：国家级 → 上海 → 江苏 → 浙江 → 安徽 → 福建 → 湖南 → 江西
- [ ] 副部级及以上人事条目含 bio / leaderLink / tencentLink / impact 四字段
- [ ] 友商按"国外在前、国内在后"排序
- [ ] 补录条目设置 `isBackfill: true`
- [ ] 影响等级填了 `high` / `medium` / `low`
- [ ] 人名链接走百度搜索，不用百科直链

## 6 大模块

- ⚠️ 预警 — 三级倒计时（紧急红 / 重要蓝 / 关注绿）
- 📄 政策 — 国家级 → 上海 → 江苏 → 浙江 → 安徽 → 福建 → 湖南 → 江西
- 👤 人事 — 副部级及以上做四维分析卡片
- 🐧 腾讯 — 独立板块（v3.7 新增）
- 🏢 友商 — 国外在前国内在后（v3.8 排序）
- 📅 活动 — 关联度评级
