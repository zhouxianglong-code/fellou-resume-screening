---
name: boss-resume-screening
description: 安装和使用 BOSS 招聘复核扩展，读取当前已加载候选人摘要、核对技能关键词证据、摘要去重并导出人工复核记录。用于 BOSS 招聘端简历初筛辅助，不承诺遍历全站或自动决策。
---

# BOSS 招聘复核

扩展源码在 `assets/recruiter/`，可直接加载的构建在 `assets/recruiter-dist/`。先读 `assets/recruiter/README.md`，了解选择器覆盖、页面内存存储和已知限制。

## 安装和使用

1. 在 Chrome 的 `chrome://extensions/` 开启开发者模式，加载本 Skill 下的 `assets/recruiter-dist/`。
2. 用户登录自己的 BOSS 招聘账号并打开招聘沟通页面，刷新后打开“候选人复核”。
3. 根据本次岗位要求填写技能或经历关键词，每行一个要求，同义词以 `|` 分隔。
4. 读取已加载列表，核对要求，展示命中原句和待核实项。无法识别时使用手动粘贴摘要，不编造简历详情。
5. 由用户复核标记并导出 CSV；刷新前提醒导出，扩展没有持久化数据库。

关键词命中不代表能力成立，特别检查否定句、期望职位和经历归属。扩展去重仅针对当前摘要；跨次筛选需要用户提供历史记录。未取得历史记录时说明无法保证全量去重。

本扩展不含 AI 自动评分、自动翻页、详情抓取或自动打招呼。只根据岗位相关证据辅助人工复核，不按年龄、性别、婚育等属性筛选。若用户要求评分，应先获取完整材料及评分标准，明确它是额外的人工复核建议而非扩展内置结果。

## 维护

需要 Node.js，无 npm 依赖。在 `assets/` 目录运行：

```bash
node recruiter/build.mjs
node --test recruiter/core.test.mjs
node --check recruiter-dist/recruiter.js
```

浏览器登录态、CSV 和真实候选人信息留在用户本地。保留 `assets/LICENSE` 中原项目署名。
