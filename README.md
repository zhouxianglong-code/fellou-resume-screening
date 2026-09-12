# Fellou/Eazo Resume Screening Skill

这是一个可迁移的 Codex 简历筛选 Skill。它把 Fellou/Eazo 的岗位画像、评分规则、去重习惯和“林明型”候选人偏好沉淀成一个可安装目录，方便下次 Codex 更新、换电脑或给别人使用。

## 一键安装

```bash
git clone https://github.com/zhouxianglong-code/fellou-resume-screening.git
cd fellou-resume-screening
bash install.sh
```

安装后重新打开 Codex 或新建任务，然后说：

```text
使用 fellou-resume-screening，从 Gmail 筛选今天的前端和全栈简历，各 10 个，避免重复，70 分以下不要展示，优先找像林明这样的候选人。
```

## 更新到最新版本

```bash
git pull
bash install.sh
```

`install.sh` 会把 `fellou-resume-screening/` 同步到 `${CODEX_HOME:-$HOME/.codex}/skills/fellou-resume-screening`。

## 别人使用前要做什么

- 在 Codex/ChatGPT 里连接自己的 Gmail。Gmail 授权不会随仓库迁移。
- 用自己的邮箱搜索和读取简历，不要把候选人隐私数据提交到公开仓库。
- 如果需要本地去重台账，可以在工作区里新建 `筛选结果/.去重台账/`，不要把真实候选人数据公开。

## 仓库里可以公开的内容

- `fellou-resume-screening/SKILL.md`：Codex 的筛选工作流。
- `fellou-resume-screening/references/`：岗位画像、校准记录、正向候选人模式。
- `fellou-resume-screening/agents/openai.yaml`：Codex UI 显示信息。
- `install.sh`：安装或升级脚本。

## 不建议公开的内容

- 简历原文、附件、候选人电话、邮箱、微信、作品私链。
- 真实去重台账和历史筛选报告，除非仓库是私有且已获得授权。
- Gmail 导出的邮件正文和附件。
