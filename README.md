# Intel Hub 数据仓库

此仓库存储 Intel Hub 网站的日报数据，网站会从此仓库实时获取最新内容。

## 目录结构

github/
├── ai-radar/           # AI Radar 数据
│   ├── index.json
│   └── 2026-01-xx.json
├── daily-news/         # 游戏日报数据
│   ├── index.json
│   └── 2026-01-xx.json
├── game-radar/         # 【新增】每日新游数据
│   ├── index.json
│   └── 2026-01-28.json  ← 刚采集的
├── links.json          # 【新增】链接导航数据
└── README.md
```

## 更新方式

1. 本地运行日报生成脚本
2. 将生成的 JSON 文件复制到对应目录
3. 执行 `git add . && git commit -m "日报 YYYY-MM-DD" && git push`

## 数据访问

网站通过以下 URL 格式访问数据：

```
https://raw.githubusercontent.com/用户名/intel-hub-data/main/daily-news/index.json
https://raw.githubusercontent.com/用户名/intel-hub-data/main/daily-news/2026-01-26.json
```

或使用 jsDelivr CDN 加速（推荐）：

```
https://cdn.jsdelivr.net/gh/用户名/intel-hub-data/daily-news/index.json
```

