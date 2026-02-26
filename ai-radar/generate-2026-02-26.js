const fs = require("fs");
const { Document, Packer, Paragraph, TextRun, Header, Footer, AlignmentType, HeadingLevel, ShadingType, PageNumber, PageBreak } = require("docx");

function valueBadge(label) {
  const colors = { high: "C0392B", medium: "E67E22", low: "27AE60" };
  const names = { high: "HIGH", medium: "MEDIUM", low: "LOW" };
  return new TextRun({ text: ` [${names[label]}] `, bold: true, color: colors[label], font: "Microsoft YaHei", size: 20 });
}

function videoBlock(v, idx) {
  const items = [];
  items.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 300, after: 100 }, children: [new TextRun({ text: `${idx}. ${v.title}`, font: "Microsoft YaHei" }), valueBadge(v.valueLabel)] }));
  items.push(new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: "\u9891\u9053\uff1a", bold: true, font: "Microsoft YaHei", size: 20, color: "555555" }), new TextRun({ text: v.channel, font: "Microsoft YaHei", size: 20, color: "555555" }), new TextRun({ text: "    ", font: "Microsoft YaHei", size: 20 }), new TextRun({ text: "\u4ef7\u503c\u5224\u65ad\uff1a", bold: true, font: "Microsoft YaHei", size: 20, color: "555555" }), new TextRun({ text: v.valueReason, font: "Microsoft YaHei", size: 20, color: "555555" })] }));
  items.push(new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "\u4e3b\u8981\u5185\u5bb9\uff1a", bold: true, font: "Microsoft YaHei", size: 21 }), new TextRun({ text: v.content, font: "Microsoft YaHei", size: 21 })] }));
  items.push(new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: "\u6838\u5fc3\u4eae\u70b9\uff1a", bold: true, font: "Microsoft YaHei", size: 21 })] }));
  v.highlights.forEach(h => { items.push(new Paragraph({ spacing: { after: 40 }, indent: { left: 360 }, children: [new TextRun({ text: "\u25b8 ", bold: true, color: "2980B9", font: "Microsoft YaHei", size: 21 }), new TextRun({ text: h, font: "Microsoft YaHei", size: 21 })] })); });
  items.push(new Paragraph({ spacing: { before: 80, after: 120 }, children: [new TextRun({ text: "\u6e38\u620f+AI\u63a2\u7d22\uff1a", bold: true, font: "Microsoft YaHei", size: 21, color: "8E44AD" }), new TextRun({ text: v.gameAIInsights, font: "Microsoft YaHei", size: 21, color: "8E44AD" })] }));
  items.push(new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "\u2500".repeat(60), color: "DDDDDD", font: "Microsoft YaHei", size: 16 })] }));
  return items;
}

const data = JSON.parse(fs.readFileSync("C:/Users/Administrator/.cursor/projects/workspace/intel-hub/public/data/ai-radar/2026-02-26.json", "utf8"));
const videos = data.videos;

const children = [];
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [new TextRun({ text: "AI Radar \u60c5\u62a5\u65e5\u62a5", bold: true, size: 48, font: "Microsoft YaHei", color: "2C3E50" })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 }, children: [new TextRun({ text: "2026\u5e742\u670826\u65e5\uff08\u661f\u671f\u56db\uff09", size: 24, font: "Microsoft YaHei", color: "7F8C8D" })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 300 }, children: [new TextRun({ text: "\u6570\u636e\u6765\u6e90\uff1aYouTube \u8ba2\u9605\u9891\u9053  |  AI Radar Skill \u81ea\u52a8\u751f\u6210", size: 20, font: "Microsoft YaHei", color: "95A5A6" })] }));

children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 360, after: 200 }, children: [new TextRun({ text: "\u4eca\u65e5\u8d8b\u52bf\u603b\u7ed3", font: "Microsoft YaHei" })] }));
children.push(new Paragraph({ spacing: { after: 120 }, shading: { fill: "EBF5FB", type: ShadingType.CLEAR }, indent: { left: 200, right: 200 }, children: [new TextRun({ text: "\u8d8b\u52bf\u4e00\uff1a", bold: true, font: "Microsoft YaHei", size: 22, color: "2980B9" }), new TextRun({ text: data.summary.keyTrend1, font: "Microsoft YaHei", size: 22 })] }));
children.push(new Paragraph({ spacing: { after: 200 }, shading: { fill: "F5EEF8", type: ShadingType.CLEAR }, indent: { left: 200, right: 200 }, children: [new TextRun({ text: "\u8d8b\u52bf\u4e8c\uff1a", bold: true, font: "Microsoft YaHei", size: 22, color: "8E44AD" }), new TextRun({ text: data.summary.keyTrend2, font: "Microsoft YaHei", size: 22 })] }));

const highCount = videos.filter(v => v.valueLabel === "high").length;
const medCount = videos.filter(v => v.valueLabel === "medium").length;
children.push(new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "\u672c\u671f\u7edf\u8ba1\uff1a", bold: true, font: "Microsoft YaHei", size: 22 }), new TextRun({ text: `\u5171 ${videos.length} \u6761\u60c5\u62a5 | HIGH: ${highCount} | MEDIUM: ${medCount}`, font: "Microsoft YaHei", size: 22 })] }));

children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 360, after: 200 }, children: [new TextRun({ text: "\u8be6\u7ec6\u60c5\u62a5", font: "Microsoft YaHei" })] }));
videos.forEach((v, i) => { videoBlock(v, i + 1).forEach(p => children.push(p)); });

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Microsoft YaHei", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 32, bold: true, color: "2C3E50", font: "Microsoft YaHei" }, paragraph: { spacing: { before: 360, after: 200 } } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 26, bold: true, color: "34495E", font: "Microsoft YaHei" }, paragraph: { spacing: { before: 240, after: 120 } } }
    ]
  },
  sections: [{
    properties: { page: { margin: { top: 1440, right: 1200, bottom: 1440, left: 1200 } } },
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "AI Radar | 2026.2.26", size: 16, color: "AAAAAA", font: "Microsoft YaHei" })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "AI Radar - YouTube\u9891\u9053\u60c5\u62a5\u76d1\u6d4b | \u7b2c ", size: 16, color: "AAAAAA", font: "Microsoft YaHei" }), new TextRun({ children: [PageNumber.CURRENT], size: 16, color: "AAAAAA", font: "Microsoft YaHei" }), new TextRun({ text: " \u9875", size: 16, color: "AAAAAA", font: "Microsoft YaHei" })] })] }) },
    children
  }]
});

const outputDir = "C:/Users/Administrator/.cursor/projects/workspace/AIRadar";
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(`${outputDir}/2026.2.26 AI News.docx`, buffer);
  console.log("Word document generated: 2026.2.26 AI News.docx");
});
