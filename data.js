/* ============================================================
 * 华东区域政策日报 H5 数据文件（多日版 v3-真实数据）
 * 规则版本：v3.8（2026-05-07 重建版）
 *
 * ⚠ 重建说明（2026-05-07）：
 *   - 此版本清除了 5/7 事故前的所有占位数据（url=xxx、编造新闻）
 *   - 本次数据全部来源于真实抓取：AI 日报、新浪财经早餐、央行官方通告、
 *     国家数据局、A 股头条、新华网、上证报、中新网、央视新闻、国创中心等
 *   - url 字段均为真实可访问链接；没有真实直链的条目 url 留空，不再编造
 *   - 采集窗口：2026-05-05 ~ 2026-05-06 两天
 *
 * ⚠ 维护铁律：
 *   - 每日新增数据：在 DAILY_DATA_BY_DATE 中追加新的日期键
 *   - AVAILABLE_DATES 数组按降序排列（最新在前）
 *   - 历史数据增量追加，不替换
 *
 * ⚠ 字段约定（v3.8）：
 *   - 政策（entries）：title / dept / date / content / impact(high|mid|low) / region / category / url
 *   - 人事（personnel）：date / source / scope / appointments[] / removals[]
 *   - 友商（competitors）：name / date / region(intl|cn) / category / title / update / url
 *   - 活动（events）：name / time / location / relevance(3|2|1) / note
 *   - 预警（alerts）：level(1|2|3) / title / status / countdown(数字，天) / unit / deadline / url
 *   - 重点关注（highlights）：type(urgent|important) / title / action
 *   - 腾讯（tencent）：date / title / content / url
 * ============================================================ */

/* === 可选日期列表（降序，最新在前） === */
window.AVAILABLE_DATES = [
  "2026-05-06",
  "2026-05-05"
];

/* === 各日期数据 === */
window.DAILY_DATA_BY_DATE = {

  /* ============== 2026-05-06（周三） ============== */
  "2026-05-06": {
    reportDate: "2026-05-06",
    reportWeekday: "周三",
    reportTitle: "华东区域政策日报",
    reportSubtitle: "2026年5月6日 · 节后首个交易日，当日核心动态",

    highlights: [
      {
        type: "urgent",
        title: "国家数据局 × 上海：数据领域国际合作上海综合试点正式启动，临港/浦东/虹桥打造高水平国际数据合作示范区",
        action: "CSIG/腾讯云华东可第一时间对接临港、浦东、虹桥数据示范区落地，争取数据出境负面清单（扩至全市）下的跨境数据服务合作"
      },
      {
        type: "urgent",
        title: "央行 5/6 开展 3000 亿元 3 个月买断式逆回购，缩量续作净回笼 5000 亿元（连续第三个月净回笼）",
        action: "财付通/微众银行关注 5 月资金面从「极度宽松」向「中性偏松」过渡，同业存单利率可能触底回升"
      },
      {
        type: "important",
        title: "字节豆包 5/4 推出付费订阅（68/200/500 元/月三档），A 股头条 5/6 热议，国产大模型集体告别免费时代",
        action: "腾讯元宝产品团队评估付费策略跟进窗口；混元 Hy3 preview Token 计划（28 元起）已先发占位"
      },
      {
        type: "important",
        title: "Anthropic 首届 Code with Claude 开发者大会 5/6 旧金山开幕，ARR 飙升至 440 亿美元冲刺万亿估值",
        action: "CSIG/TEG 跟踪 Anthropic Cowork + Skills 市场、Claude Code 2.2 生态动向，对标腾讯 WorkBuddy 产品路线"
      },
      {
        type: "important",
        title: "2026「五一」全社会跨区域流动 15.25 亿人次（日均+4%），五一档票房 7.48 亿超 2025 全档",
        action: "微信支付/视频号/腾讯文旅团队复盘五一期间核心场景数据，为 6 月消费政策窗口积累案例"
      }
    ],

    entries: [
      { region: "国家级", category: "数据要素", title: "数据领域国际合作上海综合试点正式启动（面向 2030 的 6 大板块 17 项任务）", dept: "国家数据局 × 上海市", date: "2026-05-06", content: "在 2026 全球数字合作交流会暨全球数据周上宣布，上海作为首批试点，推进国际网络、跨境存算、「总对总」数据跨境服务设施建设；临港/浦东/虹桥打造高水平国际数据合作示范区；《国家服务业扩大开放综合试点地区（上海）数据出境负面清单》覆盖范围由自贸区扩展至全市。", impact: "high", impactReason: "腾讯云华东 + 微信国际版 + 游戏/音乐出海业务都可对接跨境数据服务设施与数字出海服务集群（金融科技/数字技术/数字内容/数据合规）", url: "https://www.nda.gov.cn/sjj/swdt/mtsy/0506/20260506201259547307249_pc.html" },
      { region: "国家级", category: "货币政策", title: "央行 5/6 开展 3000 亿元 3 个月期买断式逆回购（净回笼 5000 亿元）", dept: "中国人民银行", date: "2026-05-06", content: "以固定数量、利率招标、多重价位中标方式开展 91 天买断式逆回购 3000 亿元，5 月到期 8000 亿元，实际净回笼 5000 亿元，连续第三个月缩量续作。同日还开展 260 亿元 7 天期逆回购。定性为「削峰填谷」，不代表政策基调转向。", impact: "mid", impactReason: "资金面从极度宽松向中性偏松过渡，影响腾讯金融科技业务资金成本预期", url: "https://www.news.cn/fortune/20260506/91b4bfe6b7864adfbdc9e9502b2dc5da/c.html" },
      { region: "国家级", category: "货币政策", title: "《上证报》解读：资金面持续宽松，买断式逆回购净回笼 5000 亿元", dept: "上海证券报", date: "2026-05-06", content: "4 月 DR001 均值 1.23%（下行 8BP），1 年期 AAA 同业存单 1.47% 创历史新低；招联首经董希淼、中信首经明明均认为系常规「削峰填谷」，预计 5-6 月资金面回归中性偏松。", impact: "mid", impactReason: "对财付通/微众银行同业业务成本预判有参考价值", url: "https://paper.cnstock.com/html/2026-05/06/content_2212810.htm" },
      { region: "国家级", category: "宏观消费", title: "「五一」假期 5/1-5/5 全社会跨区域流动 15.25 亿人次（日均 3.05 亿，同比 +4%）", dept: "交通运输部", date: "2026-05-05", content: "2026 年五一假期全社会跨区域人员流动量预计 152510.3 万人次，日均 30502.1 万人次，同比 2025 年日均增长 4%；5/5 当日预计 29003.5 万人次，同比 +8%。", impact: "mid", impactReason: "微信支付、视频号、腾讯文旅五一期间交易与内容数据可对照此权威口径", url: "https://www.chinanews.com.cn/cj/2026/05-05/10615980.shtml" },
      { region: "国家级", category: "文旅消费", title: "文旅部：「五一」夜间客流超 8000 万人次，文旅消费多点开花", dept: "文化和旅游部", date: "2026-05-05", content: "亲子家庭出游占比明显提升，主题乐园、特色美食、潮流音乐节等应季文旅产品受追捧；文旅消费周期间各地举办约 1.37 万场次活动、发放超 2.84 亿元消费券。", impact: "mid", impactReason: "腾讯文旅、视频号演艺合作可对接下阶段文旅消费周活动", url: "https://news.cctv.cn/2026/05/05/ARTII63LmoHa12rvDVbOVwnI260505.shtml" },
      { region: "国家级", category: "文娱消费", title: "2026 五一档总票房 7.48 亿，超越 2025 五一档最终票房（7.47 亿）", dept: "猫眼/灯塔专业版（权威第三方）", date: "2026-05-05", content: "截至 5/5 19:24 档期票房破 7.48 亿，同比 2025 年小幅增长。", impact: "low", impactReason: "视频号直播、微信小店票务数据可对照", url: "https://stock.jrj.com.cn/2026/05/06073257005326.shtml" },
      { region: "国家级", category: "外交", title: "伊朗外长阿拉格齐 5/6 应邀访华，外长王毅与其举行会谈", dept: "外交部", date: "2026-05-06", content: "中东局势紧张背景下的重要外交活动，外交部发言人正式宣布。", impact: "low", impactReason: "宏观地缘情报，关注能源/跨境结算业务敏感度", url: "https://stock.jrj.com.cn/2026/05/06073257005326.shtml" },
      { region: "上海", category: "消费数据", title: "上海 4/30-5/4 线上线下消费 643.0 亿元，同比 +7.7%", dept: "消费市场大数据实验室（上海）", date: "2026-05-05", content: "监测数据显示五一前四天上海线上线下消费额达 643 亿元，同比增长 7.7%，延续全年消费修复态势。", impact: "mid", impactReason: "腾讯广告/视频号/微信支付在沪商户复盘有参考", url: "https://stock.jrj.com.cn/2026/05/06073257005326.shtml" },
      { region: "浙江", category: "AI/机器人", title: "浙江人形机器人创新中心发布 RAM 三维空间理解模型", dept: "浙江人形机器人创新中心（联合港中文、浙大）", date: "2026-05-05", content: "联合香港中文大学、浙江大学等团队提出 RAM 三维空间视觉模型，提升机器人三维空间理解与操作能力。", impact: "mid", impactReason: "腾讯 Robotics X 实验室可跟踪学术合作，混元具身智能路线有参考", url: "https://www.ncsti.gov.cn/kjdt/kjrd/rgzn_kjrd/" },
      { region: "浙江", category: "土地/房地产", title: "滨江集团联合浙霁置业 26.09 亿元竞得杭州住宅用地", dept: "杭州市自然资源和规划局（土拍）", date: "2026-05-06", content: "公告披露滨江集团联合浙霁置业成功竞得杭州一宗住宅用地，金额 26.09 亿元。", impact: "low", impactReason: "华东区域房地产市场脉搏数据", url: "https://stock.jrj.com.cn/2026/05/06073257005326.shtml" },
      { region: "湖南", category: "安全生产", title: "浏阳全市烟花爆竹生产企业 5/4 19:00 起全面停产整顿（5/5 新闻发布会披露）", dept: "长沙市 / 浏阳市人民政府", date: "2026-05-05", content: "因华盛烟花公司爆炸事故，浏阳全市烟花爆竹企业全面停产整顿，同步开展安全生产大排查、大整治。", impact: "low", impactReason: "地方政府安全生产强监管风向", url: "https://stock.jrj.com.cn/2026/05/06073257005326.shtml" }
    ],

    personnel: [
      {
        date: "2026-05-06", source: "公开信息检索（本轮采集未获取 5/5-5/6 华东省管副部级+的权威人事公示）", scope: "5/5-5/6 人事板块说明",
        appointments: [],
        removals: [],
        note: "规则手册 §2 要求每日采集副部级+及省管干部公示。本轮通过 web_search + web_fetch 在 5/5-5/6 两个工作日（5/5 劳动节假期尾日，5/6 节后首日）未从中组部、各省委组织部、人大常委会等权威源获取到副部级及以上任免或省管干部任前公示的公开信息。按「宁缺毋滥」铁律，本日人事板块留空并注明，后续如有权威渠道补录再回填。"
      }
    ],

    alerts: [
      { level: 2, title: "5 月中长期资金到期压力 2.1 万亿元（2025 年以来月度次高点）", status: "到期压力集中在 5 月下旬，财付通/同业业务密切跟踪", countdown: 14, unit: "天", deadline: "2026-05-20", url: "https://paper.cnstock.com/html/2026-05/06/content_2212810.htm" },
      { level: 3, title: "数据领域国际合作上海综合试点实施细则（6 大板块 17 项任务落地节奏）", status: "试点 5/6 启动，后续临港/浦东/虹桥示范区实施细则值得重点跟进", countdown: 60, unit: "天", deadline: "2026-07-05", url: "https://www.nda.gov.cn/sjj/swdt/mtsy/0506/20260506201259547307249_pc.html" },
      { level: 3, title: "Anthropic Code with Claude 开发者大会巡回（旧金山 5/6 → 伦敦 5/19 → 东京 6/10）", status: "跟踪 Sonnet 4.8、Cowork GA、Skills 市场扩展、KAIROS 持久代理等五大更新", countdown: 12, unit: "天", deadline: "2026-05-19", url: "" }
    ],

    tencent: [
      {
        date: "2026-05-06",
        title: "（本轮采集未获取腾讯 5/6 当日官方新发布）",
        content: "web_search + web_fetch 在腾讯官网 tencent.com/media、腾讯新闻、腾讯云等源上未找到 2026-05-06 当日的权威官方新发布条目。节前已有的邻近动态（均非 5/6 发生）：4/23 发布开源混元 Hy3 preview（2950 亿参数 MoE，256K 上下文）、4/24 Robotics X 联合混元开源 HY-Embodied-0.5-X 具身模型、4/27 Hy3 preview Token 计划（个人版 28 元/月起）。规则手册要求每日必采，但按「宁缺毋滥」铁律本日腾讯板块仅做如实说明，不回塞旧闻冒充当日新闻。",
        url: ""
      }
    ],

    competitors: [
      { name: "Anthropic", date: "2026-05-06", region: "intl", category: "模型公司", title: "首届「Code with Claude」开发者大会旧金山开幕", update: "预计发布五大更新：Claude Code 2.2.x、Cowork 模式 GA + Skills 市场扩展、Sonnet 4.8 GA、Mythos/Glasswing 合作扩展、KAIROS 持久代理。后续巡回伦敦 5/19、东京 6/10。", url: "https://duoke360.com/post/46211" },
      { name: "Anthropic", date: "2026-05-06", region: "intl", category: "模型公司", title: "发布技术报告复盘 Claude Code「降智」三大 Bug（非模型退化）", update: "3/4 推理难度默认由「高」降至「中」、3/26 提示缓存漏洞清除推理历史、4/16 系统提示字数限制致代码质量降约 3%，均已修复；4/23 起重置订阅用户额度。", url: "https://duoke360.com/post/46211" },
      { name: "Anthropic", date: "2026-05-06", region: "intl", category: "模型公司", title: "ARR 飙升至 440 亿美元，最快 2026 年底启动 IPO", update: "Semi Analysis 报告：ARR 近 3 个月新增 ~300 亿美元，日均新增 ~9600 万美元；Claude Code 年化收入 25 亿美元、周活翻倍、约占全球 GitHub 公开提交 4%；当前融资轮 500 亿美元估值突破万亿美元。", url: "https://duoke360.com/post/46211" },
      { name: "OpenAI", date: "2026-05-06", region: "intl", category: "模型公司", title: "GPT-5.6 在 Canary 部署中现身", update: "OpenAI 后台 Canary 灰度被发现 GPT-5.6，呼应 Sam Altman 的「超级 Agent」路线图布局。", url: "https://duoke360.com/post/46211" },
      { name: "字节豆包", date: "2026-05-06", region: "cn", category: "模型公司", title: "豆包付费订阅 A 股头条热议，国产大模型集体告别免费", update: "基础版免费 + 标准版 68 元/月 + 加强版 200 元/月 + 专业版 500 元/月；背景是 2026 年字节 AI 投入 1600 亿元（850 亿用于芯片）、DRAM Q2 跳升 63%、NAND +75%。豆包月活 4.4 亿。", url: "https://stock.jrj.com.cn/2026/05/06073257005326.shtml" },
      { name: "OpenAI / Anthropic", date: "2026-05-05", region: "intl", category: "模型公司", title: "双雄合资企业竞相收购 AI 服务公司（同日）", update: "OpenAI Deployment Company 融资约 40 亿美元（估值 100 亿），投资方含 TPG/贝恩/布鲁克菲尔德等 19 家，三笔收购后期；Anthropic 合资企业融资约 15 亿美元，投资方含黑石/高盛/Apollo/红杉。战略：从「卖模型」延伸至「卖企业级解决方案」。", url: "https://duoke360.com/post/46211" },
      { name: "IBM", date: "2026-05-05", region: "intl", category: "企业软件", title: "Think 2026 发布企业 AI 操作系统蓝图（Agents/Data/Automation/Hybrid）", update: "核心产品：watsonx Orchestrate 多代理控制平面、IBM Concert、IBM Sovereign Core、IBM Bob 企业级代理开发伙伴。Nestlé POC 实现 83% 成本节省、30 倍价格性能提升。合作：AMD/Intel/Mistral/NVIDIA/PAN。", url: "https://duoke360.com/post/46211" },
      { name: "OpenAI", date: "2026-05-05", region: "intl", category: "模型公司", title: "GPT-5.5 Instant 全量推送，幻觉率下降 52.5%", update: "医疗/法律/金融幻觉下降 52.5%、AIME 2025 数学 +15.8 分、回复字数 -30.2%、Plus/Pro 新增「记忆来源 Memory Sources」可调取 Gmail 等。", url: "https://duoke360.com/post/46211" },
      { name: "OpenAI", date: "2026-05-05", region: "intl", category: "模型公司", title: "GPT-5.5 AI 派对：24 小时 8000 人报名", update: "模型自选日期与自提要求，5/5 下午 5:55 举办。", url: "https://duoke360.com/post/46211" },
      { name: "Coinbase", date: "2026-05-05", region: "intl", category: "互联网平台", title: "裁员 14%，借 AI 推动管理扁平化", update: "主要裁撤纯管理岗，管理者最多直管 15 人。", url: "https://duoke360.com/post/46211" },
      { name: "Google", date: "2026-05-05", region: "intl", category: "互联网平台", title: "Google 被加拿大音乐人 Ashley MacIsaac 起诉 AI Overview 诽谤", update: "AI Overview 错误将其识别为性犯罪者，索赔 150 万美元。", url: "https://duoke360.com/post/46211" },
      { name: "美国白宫", date: "2026-05-04", region: "intl", category: "政府监管", title: "拟对新型 AI 模型实施上市前审查（政策 180° 转向）", update: "起草行政命令，导火索为 Anthropic Claude Mythos 的网络安全风险担忧；原 AI 负责人 David Sacks 离职后由白宫幕僚长 Susie Wiles 与财长贝森特接手；将组建政府-科技联合工作组。纽约时报 5/4 首报，5/6 A 股头条持续发酵。", url: "https://duoke360.com/post/46211" }
    ],

    events: [
      { name: "Anthropic Code with Claude 开发者大会（旧金山）", time: "2026-05-06", location: "旧金山", relevance: 3, note: "关注 Claude Code 2.2、Cowork GA、Skills 市场，对标 WorkBuddy" },
      { name: "2026 全球数字合作交流会暨全球数据周", time: "2026-05-06", location: "上海", relevance: 3, note: "国家数据局 × 上海试点启动大会，CSIG/腾讯云华东应主动建联" },
      { name: "Anthropic Code with Claude · 伦敦站", time: "2026-05-19", location: "伦敦", relevance: 2, note: "Claude Code 海外生态跟进" },
      { name: "第四届数字中国建设峰会", time: "2026-05-23 — 05-26", location: "福州", relevance: 3, note: "腾讯参展 + 演讲（CDG 市场团队）" },
      { name: "Anthropic Code with Claude · 东京站", time: "2026-06-10", location: "东京", relevance: 2, note: "亚太生态跟进" }
    ]
  },

  /* ============== 2026-05-05（周二，五一假期尾日） ============== */
  "2026-05-05": {
    reportDate: "2026-05-05",
    reportWeekday: "周二",
    reportTitle: "华东区域政策日报",
    reportSubtitle: "2026年5月5日 · 五一假期尾日，A 股仍在休市",

    highlights: [
      {
        type: "urgent",
        title: "OpenAI GPT-5.5 Instant 全量推送，医疗/法律/金融幻觉率下降 52.5%",
        action: "腾讯元宝/混元产品团队对照幻觉率、字数精简、记忆来源 Memory Sources 三项体验升级，评估自身主力模型差距"
      },
      {
        type: "urgent",
        title: "OpenAI 与 Anthropic 同日宣布：双方合资企业竞相收购 AI 服务公司，路线从「卖模型」转「卖企业解决方案」",
        action: "CSIG 战略团队评估对标腾讯云 + 微信生态企业化打包方案的竞争压力"
      },
      {
        type: "important",
        title: "IBM Think 2026 发布企业 AI 操作系统蓝图（Agents/Data/Automation/Hybrid 四大系统）",
        action: "对标腾讯云 + WorkBuddy + AI Agent 中台建设路线，建议产品/解决方案团队走访 Think 大会资料"
      },
      {
        type: "important",
        title: "浙江人形机器人创新中心联合港中文/浙大发布 RAM 三维空间理解模型",
        action: "Robotics X + 混元具身团队跟踪，考虑学术合作或华东机器人生态布局"
      },
      {
        type: "important",
        title: "「五一」假期尾日跨区域流动 2.9 亿人次（同比 +8%），上海线上线下消费 643 亿（+7.7%）",
        action: "微信支付/视频号 5/6 节后首个工作日复盘五一期间 GMV，输出华东区域战报"
      }
    ],

    entries: [
      { region: "国家级", category: "宏观消费", title: "「五一」5/5 单日全社会跨区域流动 2.9 亿人次（同比 +8%）", dept: "交通运输部", date: "2026-05-05", content: "5/5 当日预计 29003.5 万人次，环比 -3.1%，同比 +8%；5 天假期累计 15.25 亿人次、日均 3.05 亿人次、同比 +4%。", impact: "mid", impactReason: "微信支付/视频号/腾讯文旅数据对标权威口径", url: "https://www.chinanews.com.cn/cj/2026/05-05/10615980.shtml" },
      { region: "国家级", category: "文旅消费", title: "央视新闻：五一文旅消费多点开花，夜间客流超 8000 万人次", dept: "文化和旅游部", date: "2026-05-05", content: "亲子家庭出游占比明显提升，主题乐园、特色美食、潮流音乐节受追捧。", impact: "mid", impactReason: "腾讯文旅 + 视频号演艺合作窗口", url: "https://news.cctv.cn/2026/05/05/ARTII63LmoHa12rvDVbOVwnI260505.shtml" },
      { region: "国家级", category: "文娱消费", title: "2026 五一档票房 5/5 19:24 突破 7.48 亿，超 2025 全档", dept: "猫眼/灯塔专业版", date: "2026-05-05", content: "截至 5/5 19:24 档期票房破 7.48 亿，超过 2025 年五一档最终 7.47 亿。", impact: "low", impactReason: "视频号直播、微信小店票务对照", url: "https://stock.jrj.com.cn/2026/05/06073257005326.shtml" },
      { region: "国家级", category: "外交", title: "外交部宣布伊朗外长阿拉格齐 5/6 访华（5/5 预告）", dept: "外交部", date: "2026-05-05", content: "外交部发言人 5/5 宣布：伊朗外长将于 5/6 应邀访华，外长王毅与其举行会谈。", impact: "low", impactReason: "宏观地缘情报", url: "https://stock.jrj.com.cn/2026/05/06073257005326.shtml" },
      { region: "上海", category: "消费数据", title: "上海五一前四天（4/30-5/4）线上线下消费 643 亿元，同比 +7.7%", dept: "消费市场大数据实验室（上海）", date: "2026-05-05", content: "监测显示上海五一前四天消费同比增长 7.7%，延续全年消费修复态势。", impact: "mid", impactReason: "腾讯广告/视频号/微信支付在沪商户复盘参考", url: "https://stock.jrj.com.cn/2026/05/06073257005326.shtml" },
      { region: "浙江", category: "AI/机器人", title: "浙江人形机器人创新中心联合港中文/浙大发布 RAM 三维空间理解模型", dept: "浙江人形机器人创新中心", date: "2026-05-05", content: "提出 RAM 三维空间视觉模型，提升机器人三维空间理解与操作能力，属机器人空间智能领域重要突破。", impact: "mid", impactReason: "Robotics X 实验室 + 混元具身智能路线跟踪", url: "https://www.ncsti.gov.cn/kjdt/kjrd/rgzn_kjrd/" },
      { region: "湖南", category: "安全生产", title: "浏阳烟花爆竹企业全面停产整顿，省市县三级启动事故调查", dept: "长沙市/浏阳市人民政府", date: "2026-05-05", content: "因华盛烟花公司爆炸事故，自 5/4 19:00 起浏阳全市烟花爆竹企业全面停产；5/5 发布会明确开展安全生产大排查、大整治，压实企业主体责任。", impact: "low", impactReason: "湖南地方安全生产强监管风向", url: "https://stock.jrj.com.cn/2026/05/06073257005326.shtml" }
    ],

    personnel: [
      {
        date: "2026-05-05", source: "公开信息检索（本轮采集未获取 5/5 华东副部级+任免或省管公示权威信息）", scope: "5/5 人事板块说明",
        appointments: [],
        removals: [],
        note: "5/5 为五一假期尾日，中组部、各省委组织部无新公示发布。本日人事板块留空，后续如在节后回溯到权威渠道再行补录。"
      }
    ],

    alerts: [
      { level: 3, title: "白宫 AI 上市前审查行政命令起草进度", status: "纽约时报 5/4 首报，导火索为 Claude Mythos 安全担忧；5/6 A 股头条发酵。跟踪对腾讯海外模型出海的潜在影响", countdown: 60, unit: "天", deadline: "2026-07-04", url: "https://duoke360.com/post/46211" },
      { level: 3, title: "Anthropic 万亿估值融资轮 + 2026 年底 IPO 计划", status: "ARR 440 亿美元、融资 500 亿美元，估值突破 1 万亿。关注对腾讯混元/元宝估值锚定影响", countdown: 240, unit: "天", deadline: "2026-12-31", url: "https://duoke360.com/post/46211" }
    ],

    tencent: [
      {
        date: "2026-05-05",
        title: "（本轮采集未获取腾讯 5/5 当日官方新发布）",
        content: "5/5 为五一假期尾日，腾讯官方未发布新动态。用户可查阅 tencent.com/zh-cn/media/news.html 获取腾讯官方媒体中心最新资讯。邻近动态：4/23 发布开源混元 Hy3 preview、4/24 开源 HY-Embodied-0.5-X 具身模型、4/27 推出 Hy3 preview Token 计划。",
        url: "https://www.tencent.com/zh-cn/media/news.html"
      }
    ],

    competitors: [
      { name: "OpenAI", date: "2026-05-05", region: "intl", category: "模型公司", title: "GPT-5.5 Instant 全量推送，三大体验升级", update: "医疗/法律/金融幻觉率下降 52.5%、AIME 2025 数学 +15.8 分、回复字数精简 30.2%，Plus/Pro 新增「记忆来源 Memory Sources」。", url: "https://duoke360.com/post/46211" },
      { name: "OpenAI", date: "2026-05-05", region: "intl", category: "模型公司", title: "GPT-5.5 AI 派对：24 小时 8000 人报名", update: "模型自选日期与自提要求，5/5 下午 5:55 举办。", url: "https://duoke360.com/post/46211" },
      { name: "OpenAI", date: "2026-05-05", region: "intl", category: "模型公司", title: "OpenAI Deployment Company 融资 40 亿美元、估值 100 亿，开启企业级收购", update: "投资方：TPG、贝恩资本、布鲁克菲尔德等 19 家；三笔 AI 服务公司收购进入后期。战略从「卖模型」延伸至「卖企业解决方案」。", url: "https://duoke360.com/post/46211" },
      { name: "Anthropic", date: "2026-05-05", region: "intl", category: "模型公司", title: "Anthropic 合资企业融资 15 亿美元，同日与 OpenAI 角逐企业级市场", update: "投资方：黑石、高盛、Apollo、红杉等。", url: "https://duoke360.com/post/46211" },
      { name: "IBM", date: "2026-05-05", region: "intl", category: "企业软件", title: "Think 2026 发布企业 AI 操作系统蓝图", update: "watsonx Orchestrate 多代理控制平面、IBM Concert、Sovereign Core、IBM Bob。Nestlé POC 节省 83% 成本、30 倍价格性能提升。合作伙伴：AMD/Intel/Mistral/NVIDIA/PAN。", url: "https://duoke360.com/post/46211" },
      { name: "Coinbase", date: "2026-05-05", region: "intl", category: "互联网平台", title: "裁员 14%，AI 推动管理扁平化", update: "管理者最多直管 15 人。", url: "https://duoke360.com/post/46211" },
      { name: "Google", date: "2026-05-05", region: "intl", category: "互联网平台", title: "Ashley MacIsaac 起诉 AI Overview 诽谤，索赔 150 万美元", update: "AI Overview 错误将其识别为性犯罪者。", url: "https://duoke360.com/post/46211" }
    ],

    events: [
      { name: "2026 五一档档期（票房 7.48 亿收官）", time: "2026-05-01 — 05-05", location: "全国院线", relevance: 1, note: "视频号直播/微信票务数据复盘" },
      { name: "Anthropic Code with Claude 开发者大会（旧金山）", time: "2026-05-06", location: "旧金山", relevance: 3, note: "次日开幕，先发跟踪" },
      { name: "2026 全球数字合作交流会暨全球数据周", time: "2026-05-06", location: "上海", relevance: 3, note: "次日开幕，国家数据局 × 上海试点启动" },
      { name: "第四届数字中国建设峰会", time: "2026-05-23 — 05-26", location: "福州", relevance: 3, note: "腾讯参展 + 演讲" }
    ]
  }

};

/* === 兼容旧版：把最新一天的数据挂到 DAILY_DATA 上 === */
window.DAILY_DATA = window.DAILY_DATA_BY_DATE[window.AVAILABLE_DATES[0]];
