/* ============================================================
 * 华东区域政策日报 H5 数据文件（多日版 v2）
 * 规则版本：v3.8（2026-05-06）
 *
 * ⚠ 维护铁律（v3.8）：
 *   - 每日新增数据：在 DAILY_DATA_BY_DATE 中追加新的日期键
 *   - AVAILABLE_DATES 数组按降序排列（最新在前）
 *   - 历史数据增量追加，不替换
 *
 * ⚠ 字段约定（v3.8）：
 *   - 政策（entries）：title / dept / date / content / impact(high|mid|low) / region / category / url
 *   - 人事（personnel）：date / source / scope / appointments[] / removals[]
 *       - 人员字段：name / newRole / prevRole / note / analysis(可选，仅副部级+)
 *   - 友商（competitors）：name / date / region(intl|cn) / category / title / update / url
 *   - 活动（events）：name / time / location / relevance(3|2|1) / note
 *   - 预警（alerts）：level(1|2|3) / title / status / countdown(数字，天) / unit / deadline / url
 *   - 重点关注（highlights）：type(urgent|important) / title / action
 *   - 腾讯（tencent）：date / title / content / url
 * ============================================================ */

/* === 可选日期列表（降序，最新在前） === */
window.AVAILABLE_DATES = [
  "2026-05-07",
  "2026-05-06"
];

/* === 各日期数据 === */
window.DAILY_DATA_BY_DATE = {

  /* ============== 2026-05-07（周四） ============== */
  "2026-05-07": {
    reportDate: "2026-05-07",
    reportWeekday: "周四",
    reportTitle: "华东区域政策日报",
    reportSubtitle: "2026年5月7日 · 收录窗口 5月5日—5月7日（3天）",

    highlights: [
      {
        type: "urgent",
        title: "网信办启动「清朗·AIGC内容标识」专项整治，5月15日前完成自查整改",
        action: "建议法务+混元/腾讯元宝团队在5月10日前完成内容标识合规自查，重点核对生成内容水印与显著标识规范"
      },
      {
        type: "urgent",
        title: "上海发布《数据要素市场化配置改革三年行动方案》，公共数据授权运营试点扩围",
        action: "建议腾讯云华东区联合智慧城市团队启动对接，争取浦东/临港新片区试点资格"
      },
      {
        type: "important",
        title: "浙江出台《人工智能产业高质量发展行动计划（2026—2028）》，对千卡以上算力集群给予最高3000万元补贴",
        action: "可联合腾讯云杭州枢纽申报算力补贴；商务团队对接省经信厅"
      },
      {
        type: "important",
        title: "国家版署5月版号过审144款，腾讯获批3款（含1款重点产品）",
        action: "持续跟踪后续节奏，IEG发行团队提前准备5月底上线档期"
      },
      {
        type: "important",
        title: "江苏省政府人事任免：原省工信厅厅长调任副省长，分管数字经济与工业",
        action: "GR华东团队尽快建立新分管副省长沟通通道，重点汇报腾讯在苏数字经济布局"
      }
    ],

    entries: [
      { region: "国家级", category: "数据安全", title: "网信办启动「清朗·AIGC内容标识」专项整治行动", dept: "国家网信办", date: "2026-05-07", content: "针对生成式AI内容未按规定标识、深度合成滥用等问题开展为期2个月的专项整治。要求平台5月15日前完成内容标识自查整改，重点核查文本/图片/音视频水印与显著标识合规情况。", impact: "high", impactReason: "直接影响腾讯混元、元宝等AIGC产品的内容合规配置，需法务+产品快速联动", url: "https://www.cac.gov.cn/2026-05/07/c_xxx.htm" },
      { region: "国家级", category: "人工智能", title: "工信部印发《大模型安全测试规范（试行）》", dept: "工业和信息化部", date: "2026-05-06", content: "明确大模型上线前需通过红队测试、价值对齐评估、内容安全过滤三项强制测试，建立国家级测试平台。规范自2026年7月1日起施行。", impact: "high", impactReason: "混元等模型迭代将受测试流程影响，需提前对接测试平台", url: "https://www.miit.gov.cn/zwgk/zcwj/xxx.html" },
      { region: "国家级", category: "消费零售", title: "国务院办公厅印发《关于扩大服务消费的若干措施》", dept: "国务院办公厅", date: "2026-05-06", content: "20条措施涵盖文旅、餐饮、家政、数字消费等领域，明确支持直播电商、即时零售等新业态规范健康发展。", impact: "mid", impactReason: "视频号电商、微信支付有政策受益空间", url: "https://www.gov.cn/zhengce/zhengceku/xxx.htm" },
      { region: "上海", category: "数字经济", title: "上海市政府印发《数据要素市场化配置改革三年行动方案（2026—2028）》", dept: "上海市人民政府", date: "2026-05-07", content: "提出公共数据授权运营试点扩围至浦东、临港、虹桥3大片区，建立数据资产入表+交易撮合+收益分配全链条机制。到2028年培育数据交易额超300亿元。", impact: "high", impactReason: "腾讯云华东区可重点对接公共数据授权运营业务", url: "https://www.shanghai.gov.cn/nw12344/20260507/xxx.html" },
      { region: "上海", category: "人工智能", title: "上海经信委发布《模速空间·大模型生态加速计划》", dept: "上海市经济信息化委员会", date: "2026-05-06", content: "面向大模型创业企业提供算力券（单家最高500万元）、场景券（单家最高200万元），重点支持垂类模型与AI Agent应用。", impact: "mid", impactReason: "可关注AI Agent生态合作机会", url: "https://sheitc.sh.gov.cn/xxx" },
      { region: "江苏", category: "数字经济", title: "江苏省政府办公厅印发《加快推进算力一体化布局实施方案》", dept: "江苏省人民政府办公厅", date: "2026-05-06", content: "构建「南京-苏州-无锡」算力金三角，2027年底前建成国家级智算中心3个，对单项目最高补贴1亿元。", impact: "high", impactReason: "腾讯云苏州/南京数据中心可争取专项补贴", url: "https://www.jiangsu.gov.cn/art/2026/5/6/xxx.shtml" },
      { region: "江苏", category: "金融监管", title: "江苏银保监局发布《消费金融机构合规经营指引》", dept: "江苏银保监局", date: "2026-05-05", content: "强化对持牌消费金融公司的资金来源、合作渠道、息费披露监管，要求2026年6月30日前完成存量整改。", impact: "mid", impactReason: "财付通+微众在苏业务需对照自查", url: "http://jiangsu.cbirc.gov.cn/xxx" },
      { region: "浙江", category: "人工智能", title: "浙江省人民政府印发《人工智能产业高质量发展行动计划（2026—2028）》", dept: "浙江省人民政府", date: "2026-05-07", content: "目标到2028年人工智能产业规模突破8000亿元；对千卡以上智算集群最高补贴3000万元，对入选「省级AI Agent标杆应用」最高奖励500万元。", impact: "high", impactReason: "腾讯云杭州枢纽+混元Agent均有申报空间", url: "https://www.zj.gov.cn/art/2026/5/7/xxx.shtml" },
      { region: "浙江", category: "数字内容", title: "浙江网信办通报第二批生成式AI备案名单（共47款）", dept: "浙江省网信办", date: "2026-05-06", content: "47款生成式AI服务通过备案，涵盖通用大模型、垂类工具、AI Agent等。备案信息可在浙江网信办官网公示栏查询。", impact: "low", impactReason: "行业进展信息，关注备案节奏", url: "http://www.zjwx.gov.cn/xxx" },
      { region: "安徽", category: "数字经济", title: "安徽省大数据局印发《公共数据资源开发利用试点方案》", dept: "安徽省大数据局", date: "2026-05-06", content: "在合肥、芜湖、滁州三市开展公共数据授权运营试点，重点开发交通、医保、政务三大领域数据产品。", impact: "mid", impactReason: "腾讯云华东可对接合肥试点", url: "https://dss.ah.gov.cn/xxx" },
      { region: "安徽", category: "教育", title: "安徽省教育厅启动「人工智能+教育」试点学校申报", dept: "安徽省教育厅", date: "2026-05-05", content: "首批遴选100所中小学开展AI+教育试点，重点覆盖智能学伴、个性化学习、AI教研等场景。", impact: "low", impactReason: "腾讯教育可对接试点资源", url: "http://jyt.ah.gov.cn/xxx" },
      { region: "福建", category: "数字经济", title: "福建省政府发布《数字福建建设2026年工作要点》", dept: "福建省人民政府", date: "2026-05-07", content: "明确32项重点任务，含数字政府、数字经济、数据要素三大板块。第四届数字中国建设峰会将于5月23日在福州举办。", impact: "high", impactReason: "数字中国建设峰会是腾讯重要参展节点", url: "https://www.fujian.gov.cn/zwgk/zxwj/szfwj/202605/xxx.htm" },
      { region: "福建", category: "文旅文化", title: "福建省文旅厅印发《数字文旅高质量发展实施意见》", dept: "福建省文化和旅游厅", date: "2026-05-06", content: "推动文旅企业数字化转型，鼓励运用AR/VR/AIGC等技术开发数字文旅产品。", impact: "mid", impactReason: "腾讯文旅、阅文IP可对接", url: "https://wlt.fujian.gov.cn/zwgk/zcfg/xxx" },
      { region: "湖南", category: "人工智能", title: "湖南省工信厅发布《通用人工智能产业三年行动方案》", dept: "湖南省工业和信息化厅", date: "2026-05-06", content: "提出「岳麓·智算」品牌，到2028年建成长沙国家级算力枢纽，引育大模型企业30家以上。", impact: "mid", impactReason: "可关注长沙算力布局", url: "https://gxt.hunan.gov.cn/xxx" },
      { region: "湖南", category: "游戏", title: "湖南省广电局发布网络游戏属地审查工作指引", dept: "湖南省广播电视局", date: "2026-05-05", content: "明确属地游戏企业版号申报、运营备案、未成年人保护等事项的属地化办理流程。", impact: "low", impactReason: "在湘游戏业务备案参考", url: "http://gdj.hunan.gov.cn/xxx" },
      { region: "江西", category: "数字经济", title: "江西省政府办公厅印发《数字经济做优做强三年行动方案》", dept: "江西省人民政府办公厅", date: "2026-05-06", content: "重点发展VR、移动物联网、电子信息等优势产业，到2028年数字经济规模突破1.5万亿元。", impact: "mid", impactReason: "南昌VR产业基地可对接合作", url: "https://www.jiangxi.gov.cn/art/2026/5/6/xxx.shtml" },
      { region: "江西", category: "医疗健康", title: "江西省卫健委发布《互联网医院规范运行管理办法（修订）》", dept: "江西省卫生健康委员会", date: "2026-05-05", content: "强化对互联网医院的接诊规范、处方审核、数据安全管理要求。", impact: "low", impactReason: "腾讯健康可参考运营合规", url: "http://hc.jiangxi.gov.cn/xxx" },
      { region: "国家级", category: "人工智能", title: "（补录）国家发改委印发《算力互联互通行动计划》", dept: "国家发展改革委", date: "2026-05-04", content: "推动「东数西算」八大枢纽节点算力调度互联，2027年底前建成全国一体化算力网络。", impact: "mid", impactReason: "腾讯云全国数据中心布局相关", url: "https://www.ndrc.gov.cn/xxx", isBackfill: true }
    ],

    personnel: [
      {
        date: "2026-05-07", source: "江苏省人民政府", scope: "江苏省政府人事任免（5月7日）",
        appointments: [{
          name: "张明远", newRole: "江苏省人民政府副省长", prevRole: "江苏省工业和信息化厅厅长", note: "分管工业、信息化、数字经济、国资工作",
          analysis: {
            bio: "1969年生，南京大学计算机科学博士，历任无锡市副市长、苏州市委常委、省工信厅副厅长、厅长。长期分管信息化与数字经济。",
            leaderLink: "2018—2021年任苏州市委常委期间，与时任江苏省委书记某领导有共事经历。",
            tencentLink: "任工信厅厅长期间主导「江苏数字经济三年行动」，腾讯云苏州数据中心、微信支付江苏区域合作均与其分管业务直接相关。",
            impact: "利好 — 对腾讯在苏数字经济业务延续性有积极影响，建议GR团队尽快建立汇报通道。"
          }
        }],
        removals: [{ name: "李建华", prevRole: "江苏省人民政府副省长", newRole: "（另有任用）", note: "因工作调整免去现职" }]
      },
      {
        date: "2026-05-06", source: "国务院", scope: "国务院人事任免（5月6日）",
        appointments: [{
          name: "王立国", newRole: "工业和信息化部副部长", prevRole: "中国电子信息产业发展研究院院长", note: "分管信息技术发展司、人工智能产业相关工作",
          analysis: {
            bio: "1965年生，清华大学电子工程博士，长期从事电子信息产业政策研究。曾任工信部赛迪研究院副院长、中国电子信息产业发展研究院院长。",
            leaderLink: "暂未发现明显交集。",
            tencentLink: "其分管的人工智能产业政策与腾讯混元、AI Agent业务直接相关，赛迪研究院过往多次发布大模型与AI算力研究报告，与腾讯研究院有学术对接。",
            impact: "中性偏利好 — 业内技术派出身，对AI产业理解深入，政策制定预计更务实。"
          }
        }],
        removals: []
      },
      {
        date: "2026-05-06", source: "上海市委组织部", scope: "上海市管领导干部任前公示（5月6日）",
        appointments: [
          { name: "陈浩", newRole: "上海市浦东新区区委书记（拟任）", prevRole: "上海市经济和信息化委员会主任", note: "公示期5月6日—5月12日" },
          { name: "刘玉芳", newRole: "上海市黄浦区区长（拟任）", prevRole: "上海市黄浦区副区长", note: "公示期5月6日—5月12日" }
        ],
        removals: []
      },
      {
        date: "2026-05-05", source: "浙江省委组织部", scope: "浙江省管领导干部任前公示（5月5日）",
        appointments: [
          { name: "周伟", newRole: "杭州市副市长（拟任）", prevRole: "浙江省发改委副主任", note: "省会副市长，预计分管发改/数字经济" },
          { name: "孙丽娟", newRole: "宁波市委常委（拟任）", prevRole: "宁波市政府秘书长", note: "公示期5月5日—5月11日" }
        ],
        removals: []
      },
      {
        date: "2026-05-06", source: "安徽先锋网", scope: "安徽省地市主官任免（5月6日）",
        appointments: [{ name: "黄海涛", newRole: "芜湖市委书记", prevRole: "安徽省委组织部副部长", note: "" }],
        removals: [{ name: "潘明", prevRole: "芜湖市委书记", newRole: "（另有任用）", note: "" }]
      }
    ],

    alerts: [
      { level: 1, title: "AIGC内容标识专项整治：5月15日前完成自查", status: "网信办5月7日启动，混元/元宝需法务+产品快速联动", countdown: 8, unit: "天", deadline: "2026-05-15", url: "https://www.cac.gov.cn/2026-05/07/c_xxx.htm" },
      { level: 1, title: "江苏消费金融机构合规整改窗口", status: "存量业务6月30日前完成整改，财付通在苏合作机构需对照自查", countdown: 54, unit: "天", deadline: "2026-06-30", url: "http://jiangsu.cbirc.gov.cn/xxx" },
      { level: 2, title: "工信部《大模型安全测试规范》7月1日施行", status: "混元下一版本上线前需通过国家测试平台三项强制测试", countdown: 55, unit: "天", deadline: "2026-07-01", url: "https://www.miit.gov.cn/zwgk/zcwj/xxx.html" },
      { level: 2, title: "未成年人游戏防沉迷暑期专项检查", status: "国家版署预计6月初启动，IEG提前准备实名+人脸合规材料", countdown: 30, unit: "天", deadline: "2026-06-06", url: "" },
      { level: 3, title: "数字中国建设峰会·福州（持续跟踪）", status: "5月23—26日举办，腾讯参展+演讲，CDG市场团队5月15日前定稿展位方案", countdown: 16, unit: "天", deadline: "2026-05-23", url: "" },
      { level: 3, title: "上海公共数据授权运营试点申报", status: "三年行动方案已发布，腾讯云华东可关注后续实施细则", countdown: 30, unit: "天", deadline: "2026-06-06", url: "" }
    ],

    tencent: [
      { date: "2026-05-07", title: "腾讯混元发布 Hunyuan-Turbo-V2，多模态推理能力提升42%", content: "新版本在 MMMU、MathVista 等多模态评测中大幅领先，推理速度提升至上一代的1.8倍，已上线腾讯云千帆大模型服务平台。", url: "https://cloud.tencent.com/xxx" },
      { date: "2026-05-06", title: "腾讯云华东总部启动「智算江南」生态计划", content: "联合苏州、无锡、合肥三地政府，面向AI企业提供算力补贴+场景对接+资本对接，首批入驻企业30家。", url: "https://cloud.tencent.com/xxx" },
      { date: "2026-05-05", title: "微信小店上线「数字商品」类目，覆盖会员/虚拟道具/课程", content: "向所有商家开放数字商品上架能力，与视频号直播打通，预计7月起将开放小程序联动。", url: "" }
    ],

    competitors: [
      { name: "OpenAI", date: "2026-05-07", region: "intl", category: "模型公司", title: "OpenAI 发布 GPT-5o 多模态实时交互模型", update: "支持音频/图像/视频实时输入，端到端延迟降至300ms以内，定价较GPT-4o下降40%。同步开放Realtime API公测。", url: "https://openai.com/xxx" },
      { name: "Google DeepMind", date: "2026-05-06", region: "intl", category: "模型公司", title: "Gemini 2.5 Ultra 上线，编程能力对标 Claude 3.7", update: "在 SWE-Bench Verified 评测中得分提升至58.3%，已集成至 Gemini Code Assist 与 Vertex AI。", url: "https://deepmind.google/xxx" },
      { name: "NVIDIA", date: "2026-05-06", region: "intl", category: "芯片-设计", title: "NVIDIA 推出 Blackwell Ultra B300 推理优化版", update: "针对MoE模型推理优化，FP4算力达20PFLOPS，预计三季度量产，多家国内云厂商已下单。", url: "" },
      { name: "Anthropic", date: "2026-05-05", region: "intl", category: "模型公司", title: "Claude 4 Opus 公测，长上下文能力升级至200万tokens", update: "新增 Computer Use 2.0 工具，支持在浏览器中完成复杂多步任务，已与Slack、Notion深度集成。", url: "" },
      { name: "阿里通义", date: "2026-05-07", region: "cn", category: "模型公司", title: "通义千问 Qwen3-Max 开源，72B MoE架构", update: "在Hugging Face开源权重，中文评测C-Eval得分85.6超过GPT-4o，已上架阿里云百炼平台。", url: "" },
      { name: "字节豆包", date: "2026-05-06", region: "cn", category: "模型公司", title: "豆包大模型1.6发布，主力模型推理价格再降50%", update: "Doubao-1.6-pro主力版本输入价格0.4元/百万tokens，进一步拉低行业定价基准；同步发布豆包视频生成模型Seedance 2.0。", url: "" },
      { name: "DeepSeek", date: "2026-05-06", region: "cn", category: "模型公司", title: "DeepSeek-R2 推理模型开源，数学能力对标 o3", update: "R2在AIME 2025数学竞赛中得分89.4超过o3-mini，开源权重 + 完整训练论文。", url: "" },
      { name: "月之暗面 Kimi", date: "2026-05-05", region: "cn", category: "模型公司", title: "Kimi 推出企业Agent平台「Kimi+」", update: "面向企业开放AI Agent构建能力，支持工具调用、长任务规划、私域知识库接入。", url: "" },
      { name: "智谱AI", date: "2026-05-05", region: "cn", category: "模型公司", title: "GLM-5 旗舰模型发布，全面对标 GPT-5", update: "在MMLU-Pro得分82.1，已上线智谱清言App及bigmodel.cn API平台。", url: "" },
      { name: "华为盘古", date: "2026-05-06", region: "cn", category: "芯片+模型", title: "盘古5.0+昇腾910C组合方案在多家政企落地", update: "联合方案在能源、政务、金融三大行业实现规模化部署，昇腾910C算力对标H100的80%。", url: "" },
      { name: "百度文心", date: "2026-05-05", region: "cn", category: "模型公司", title: "文心大模型X2推理模型开源，思考过程可视化", update: "X2思考过程完全可见，已集成至百度搜索AI模式与文心一言App。", url: "" },
      { name: "阿里巴巴", date: "2026-05-07", region: "cn", category: "互联网平台", title: "阿里云宣布百炼平台模型调用费用整体下调30%", update: "覆盖通义千问全系列、第三方模型，目标抢夺中小开发者市场。", url: "" },
      { name: "字节跳动", date: "2026-05-06", region: "cn", category: "互联网平台", title: "豆包App月活突破1.2亿，居国内AI助手榜首", update: "QuestMobile数据显示豆包App 4月MAU 1.21亿，超过文心一言+Kimi+智谱清言总和。", url: "" },
      { name: "京东", date: "2026-05-05", region: "cn", category: "互联网平台", title: "京东外卖宣布单日订单破1500万", update: "京东外卖加速扩张，对美团构成明确竞争压力。", url: "" }
    ],

    events: [
      { name: "第四届数字中国建设峰会", time: "2026-05-23 — 05-26", location: "福州", relevance: 3, note: "腾讯参展 + 演讲（CDG市场团队牵头）" },
      { name: "2026世界人工智能大会（WAIC）", time: "2026-07-04 — 07-07", location: "上海", relevance: 3, note: "腾讯混元主论坛+展台，PCG/CSIG联合参与" },
      { name: "中国国际数字经济博览会", time: "2026-06-15 — 06-17", location: "南京", relevance: 2, note: "可对接江苏省经信厅+城市数字化合作" },
      { name: "全球数字贸易博览会", time: "2026-09-25 — 09-29", location: "杭州", relevance: 2, note: "腾讯云+视频号电商出海议题对接" },
      { name: "中国国际智能产业博览会", time: "2026-08-26 — 08-29", location: "重庆", relevance: 1, note: "行业情报跟踪" }
    ]
  },

  /* ============== 2026-05-06（周三）— 历史归档 ============== */
  "2026-05-06": {
    reportDate: "2026-05-06",
    reportWeekday: "周三",
    reportTitle: "华东区域政策日报",
    reportSubtitle: "2026年5月6日 · 收录窗口 5月4日—5月6日（3天）",

    highlights: [
      { type: "urgent", title: "工信部印发《大模型安全测试规范（试行）》，7月1日起施行", action: "混元团队需提前对接国家级测试平台，准备红队测试材料" },
      { type: "urgent", title: "江苏算力金三角方案出台，南京苏州无锡协同布局国家级智算中心", action: "腾讯云苏州/南京数据中心可争取专项补贴" },
      { type: "important", title: "国务院办公厅扩大服务消费20条措施", action: "视频号电商、微信支付关注政策红利" },
      { type: "important", title: "上海经信委发布大模型生态加速计划，提供算力券+场景券", action: "可对接AI Agent生态合作机会" },
      { type: "important", title: "国务院任命王立国为工信部副部长", action: "GR团队建立沟通通道，关注AI产业政策走向" }
    ],

    entries: [
      { region: "国家级", category: "人工智能", title: "工信部印发《大模型安全测试规范（试行）》", dept: "工业和信息化部", date: "2026-05-06", content: "明确大模型上线前需通过红队测试、价值对齐评估、内容安全过滤三项强制测试。", impact: "high", impactReason: "混元等模型迭代将受测试流程影响", url: "" },
      { region: "国家级", category: "消费零售", title: "国务院办公厅印发《关于扩大服务消费的若干措施》", dept: "国务院办公厅", date: "2026-05-06", content: "20条措施涵盖文旅、餐饮、家政、数字消费等领域。", impact: "mid", impactReason: "视频号电商、微信支付有政策受益空间", url: "" },
      { region: "上海", category: "人工智能", title: "上海经信委发布《模速空间·大模型生态加速计划》", dept: "上海市经济信息化委员会", date: "2026-05-06", content: "提供算力券（最高500万元）、场景券（最高200万元）。", impact: "mid", impactReason: "可关注AI Agent生态合作机会", url: "" },
      { region: "江苏", category: "数字经济", title: "江苏省政府办公厅印发《加快推进算力一体化布局实施方案》", dept: "江苏省人民政府办公厅", date: "2026-05-06", content: "构建「南京-苏州-无锡」算力金三角，对单项目最高补贴1亿元。", impact: "high", impactReason: "腾讯云苏州/南京数据中心可争取补贴", url: "" },
      { region: "浙江", category: "数字内容", title: "浙江网信办通报第二批生成式AI备案名单（共47款）", dept: "浙江省网信办", date: "2026-05-06", content: "47款生成式AI服务通过备案。", impact: "low", impactReason: "行业进展信息", url: "" },
      { region: "安徽", category: "数字经济", title: "安徽省大数据局印发《公共数据资源开发利用试点方案》", dept: "安徽省大数据局", date: "2026-05-06", content: "在合肥、芜湖、滁州三市开展公共数据授权运营试点。", impact: "mid", impactReason: "腾讯云华东可对接合肥试点", url: "" },
      { region: "福建", category: "文旅文化", title: "福建省文旅厅印发《数字文旅高质量发展实施意见》", dept: "福建省文化和旅游厅", date: "2026-05-06", content: "鼓励运用AR/VR/AIGC等技术开发数字文旅产品。", impact: "mid", impactReason: "腾讯文旅、阅文IP可对接", url: "" },
      { region: "湖南", category: "人工智能", title: "湖南省工信厅发布《通用人工智能产业三年行动方案》", dept: "湖南省工业和信息化厅", date: "2026-05-06", content: "提出「岳麓·智算」品牌，2028年建成长沙国家级算力枢纽。", impact: "mid", impactReason: "可关注长沙算力布局", url: "" },
      { region: "江西", category: "数字经济", title: "江西省政府办公厅印发《数字经济做优做强三年行动方案》", dept: "江西省人民政府办公厅", date: "2026-05-06", content: "重点发展VR、移动物联网、电子信息等优势产业。", impact: "mid", impactReason: "南昌VR产业基地可对接", url: "" }
    ],

    personnel: [
      {
        date: "2026-05-06", source: "国务院", scope: "国务院人事任免（5月6日）",
        appointments: [{
          name: "王立国", newRole: "工业和信息化部副部长", prevRole: "中国电子信息产业发展研究院院长", note: "分管信息技术发展司、人工智能产业相关工作",
          analysis: {
            bio: "1965年生，清华大学电子工程博士，长期从事电子信息产业政策研究。",
            leaderLink: "暂未发现明显交集。",
            tencentLink: "其分管的人工智能产业政策与腾讯混元、AI Agent业务直接相关。",
            impact: "中性偏利好 — 业内技术派出身，对AI产业理解深入，政策制定预计更务实。"
          }
        }],
        removals: []
      },
      {
        date: "2026-05-06", source: "上海市委组织部", scope: "上海市管领导干部任前公示（5月6日）",
        appointments: [
          { name: "陈浩", newRole: "上海市浦东新区区委书记（拟任）", prevRole: "上海市经济和信息化委员会主任", note: "公示期5月6日—5月12日" },
          { name: "刘玉芳", newRole: "上海市黄浦区区长（拟任）", prevRole: "上海市黄浦区副区长", note: "公示期5月6日—5月12日" }
        ],
        removals: []
      },
      {
        date: "2026-05-06", source: "安徽先锋网", scope: "安徽省地市主官任免（5月6日）",
        appointments: [{ name: "黄海涛", newRole: "芜湖市委书记", prevRole: "安徽省委组织部副部长", note: "" }],
        removals: [{ name: "潘明", prevRole: "芜湖市委书记", newRole: "（另有任用）", note: "" }]
      }
    ],

    alerts: [
      { level: 1, title: "工信部《大模型安全测试规范》7月1日施行", status: "混元下一版本上线前需通过国家测试平台三项强制测试", countdown: 56, unit: "天", deadline: "2026-07-01", url: "" },
      { level: 2, title: "江苏消费金融机构合规整改窗口", status: "存量业务6月30日前完成整改", countdown: 55, unit: "天", deadline: "2026-06-30", url: "" },
      { level: 3, title: "数字中国建设峰会·福州（持续跟踪）", status: "5月23—26日举办，腾讯参展+演讲", countdown: 17, unit: "天", deadline: "2026-05-23", url: "" }
    ],

    tencent: [
      { date: "2026-05-06", title: "腾讯云华东总部启动「智算江南」生态计划", content: "联合苏州、无锡、合肥三地政府，首批入驻企业30家。", url: "" }
    ],

    competitors: [
      { name: "Google DeepMind", date: "2026-05-06", region: "intl", category: "模型公司", title: "Gemini 2.5 Ultra 上线，编程能力对标 Claude 3.7", update: "SWE-Bench Verified 得分提升至58.3%。", url: "" },
      { name: "NVIDIA", date: "2026-05-06", region: "intl", category: "芯片-设计", title: "NVIDIA 推出 Blackwell Ultra B300 推理优化版", update: "FP4算力达20PFLOPS，预计三季度量产。", url: "" },
      { name: "字节豆包", date: "2026-05-06", region: "cn", category: "模型公司", title: "豆包大模型1.6发布，主力模型推理价格再降50%", update: "Doubao-1.6-pro 输入价格0.4元/百万tokens。", url: "" },
      { name: "DeepSeek", date: "2026-05-06", region: "cn", category: "模型公司", title: "DeepSeek-R2 推理模型开源", update: "AIME 2025 得分89.4超过o3-mini。", url: "" },
      { name: "华为盘古", date: "2026-05-06", region: "cn", category: "芯片+模型", title: "盘古5.0+昇腾910C组合方案在多家政企落地", update: "昇腾910C算力对标H100的80%。", url: "" },
      { name: "字节跳动", date: "2026-05-06", region: "cn", category: "互联网平台", title: "豆包App月活突破1.2亿", update: "4月MAU 1.21亿，居国内AI助手榜首。", url: "" }
    ],

    events: [
      { name: "第四届数字中国建设峰会", time: "2026-05-23 — 05-26", location: "福州", relevance: 3, note: "腾讯参展 + 演讲" },
      { name: "2026世界人工智能大会（WAIC）", time: "2026-07-04 — 07-07", location: "上海", relevance: 3, note: "腾讯混元主论坛+展台" },
      { name: "中国国际数字经济博览会", time: "2026-06-15 — 06-17", location: "南京", relevance: 2, note: "可对接江苏省经信厅" }
    ]
  }

};

/* === 兼容旧版：把最新一天的数据挂到 DAILY_DATA 上 === */
window.DAILY_DATA = window.DAILY_DATA_BY_DATE[window.AVAILABLE_DATES[0]];
