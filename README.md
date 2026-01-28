# Intel Hub 数据仓库

此仓库存储 Intel Hub 网站的数据，网站会从此仓库实时获取最新内容。

## 目录结构

```
├── daily-news/          # 游戏日报数据
│   ├── index.json       # 日期索引
│   └── 2026-01-xx.json  # 每日数据文件
├── ai-radar/            # AI Radar 数据
│   ├── index.json       # 日期索引
│   └── 2026-01-xx.json  # 每日数据文件
├── game-radar/          # 【新增】每日新游数据
│   ├── index.json       # 日期索引
│   └── 2026-01-xx.json  # 每日数据文件
├── links.json           # 【新增】链接导航配置
└── README.md
```

## 数据说明

### daily-news - 游戏日报
每日游戏行业情报，按形态对齐/机制对齐/技术对齐三维分类。

### ai-radar - AI Radar
YouTube AI 视频资讯监测与分析。

### game-radar - 每日新游
多平台游戏产品追踪，数据来源：
- Steam（PC游戏）
- itch.io（独立游戏）
- Google Play（移动游戏）
- CrazyGames（网页游戏）
- Poki（网页游戏）
- YouTube 游戏博主
- Bilibili 游戏UP主

### links.json - 链接导航
游戏产品情报源导航配置，包含：
- PC游戏平台（Steam、itch.io、AppMagic）
- 移动游戏平台（APKCombo、Google Play、TapTap）
- 网页游戏平台（CrazyGames、Poki）
- YouTube 游戏博主（4个频道）
- Bilibili 游戏UP主（5个UP主）

## 更新方式

### 手动更新
```bash
git add .
git commit -m "更新 YYYY-MM-DD 数据"
git push
```

### 通过 Skill 自动生成
```bash
# 运行 game-product-scout 采集脚本
cd C:\Users\Administrator\.cursor\skills\game-product-scout\scripts
python daily_scout.py

# 数据会自动生成到 intel-hub/github/ 目录
```

## 数据访问

网站通过 jsDelivr CDN 加速访问（推荐）：

```
https://cdn.jsdelivr.net/gh/zhixiangsong1900-cpu/intel-hub-data/daily-news/index.json
https://cdn.jsdelivr.net/gh/zhixiangsong1900-cpu/intel-hub-data/game-radar/index.json
https://cdn.jsdelivr.net/gh/zhixiangsong1900-cpu/intel-hub-data/links.json
```

或使用 GitHub Raw URL：

```
https://raw.githubusercontent.com/zhixiangsong1900-cpu/intel-hub-data/main/daily-news/index.json
```

## 注意事项

- CDN 有约 5-10 分钟的缓存延迟
- 如需立即生效，可在 URL 后添加版本号：`?v=1`
