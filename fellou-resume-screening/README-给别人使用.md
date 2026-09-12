# Fellou/Eazo 简历筛选 Skill 使用说明

这份说明给要接手使用的人看。推荐对方拿到整个 GitHub 仓库，而不是只拿 `SKILL.md`。

## 一键安装

```bash
git clone https://github.com/zhouxianglong-code/fellou-resume-screening.git
cd fellou-resume-screening
bash install.sh
```

安装完成后，重新打开 Codex 或新建一个任务，然后说：

```text
使用 fellou-resume-screening，从 Gmail 筛选今天的前端和全栈简历，各 10 个，避免重复，70 分以下不要展示，优先找像林明这样的候选人。
```

## 更新 Skill

以后筛选标准更新后，对方只需要：

```bash
git pull
bash install.sh
```

这样会把最新的 `fellou-resume-screening/` 同步到本机 Codex skills 目录。

## 必须注意

- Gmail 账号不会随项目迁移。每个使用者都要在自己的 Codex/ChatGPT 里连接自己的 Gmail。
- 简历、邮件正文、附件、候选人联系方式、真实去重台账和历史筛选报告都属于隐私数据，不要提交到公开 GitHub。
- 公开仓库里只放 Skill、岗位画像、校准规则、安装脚本和使用说明。

## 不安装也能临时使用

如果不想安装到 Codex skills 目录，可以把整个仓库放到当前工作区，然后在 Codex 里说：

```text
请读取 ./fellou-resume-screening/SKILL.md，并按照这个 skill 筛选简历
```

长期使用还是建议执行 `bash install.sh`。

## 当前筛选口径摘要

- 优先岗位：Design Engineer / AI Native 前端最高；测试、业务型全栈 / 重构工程师、移动端其次。
- 默认每批尽量筛 10 位未评过的新候选人。
- 报告正文只展示 70 分及以上；70 分以下只进最小去重台账。
- 前端/全栈/研发方向优先寻找“林明型”候选人：AI Coding、Agent 系统、代码理解平台、编辑器/画布/设计工具、评测或交付闭环。
- 研发类加分项：自己创过业、独立商业化产品、个人工作室、0 到 1 产品闭环。
- 创业加分必须有可核验证据：产品上线、用户、收入、客户交付、团队、增长、核心代码归属或失败复盘。
- 不能用年龄、性别、婚育、健康、国籍、学校层级、留学背景等敏感或不公平因素评分。

## 主要文件

- `SKILL.md`：核心工作流和长期使用规则。
- `references/company-jd-profile.md`：岗位画像和评分标准。
- `references/positive-resume-patterns.md`：林明型等正向候选人模式。
- `references/calibration-log.md`：招聘人纠偏、新标准和沉淀记录。
- `agents/openai.yaml`：Codex UI 显示信息。
