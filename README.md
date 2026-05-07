# 华东政策日报 H5

每日华东区域政策、人事、友商、活动、预警动态汇总页面，规则遵循《日报生成规则手册 v3.8》。

## 在线访问

部署后访问：`https://<your-github-username>.github.io/<repo-name>/`

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

## 每日更新流程

1. 编辑 `data.js`，向对应数组追加新条目
2. 提交并推送：

```powershell
git add data.js
git commit -m "update: YYYY-MM-DD 日报数据"
git push origin main
```

3. GitHub Pages 自动重新部署（约 1 分钟生效）

## 6 大模块

- ⚠️ 预警 — 三级倒计时（紧急红 / 重要蓝 / 关注绿）
- 📄 政策 — 国家级 → 上海 → 江苏 → 浙江 → 安徽 → 福建 → 湖南 → 江西
- 👤 人事 — 副部级及以上做四维分析卡片
- 🐧 腾讯 — 独立板块（v3.7 新增）
- 🏢 友商 — 国外在前国内在后（v3.8 排序）
- 📅 活动 — 关联度评级
