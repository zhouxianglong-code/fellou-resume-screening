# Fellou/Eazo 三合一工具包

| 功能 | 目录 | 使用前配置 |
| --- | --- | --- |
| Gmail 简历筛选 | `fellou-resume-screening/` | 连接自己的 Gmail |
| BOSS 招聘复核 | `boss-resume-screening/` | 登录 BOSS，手动加载 Chrome 扩展 |
| 小红书市场调研 | `xhs-business-validator/` | 在本地配置 TikHub Token |

BOSS 现有版本支持已加载摘要的关键词核对、去重和人工标记，不包含全站自动筛选。小红书功能用于商业创意和市场需求验证，不是招聘简历筛选。

## 各项目功能说明

- [邮箱简历筛选：功能、评分、去重和文件说明](fellou-resume-screening/README.md)
- [BOSS 招聘复核：按钮、源码和使用边界](boss-resume-screening/README.md)
- [小红书市场调研：搜索、分析、评分和配置](xhs-business-validator/README.md)

根目录 `install.sh` 负责安装三个 Skill，并覆盖更新包内同名文件、保留目标目录额外文件。它不负责账号授权、Chrome 扩展安装或自动更新；更新需执行 `git pull` 后再运行安装脚本。

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

`install.sh` 会把三个 Skill 安装到 `${CODEX_HOME:-$HOME/.codex}/skills/`，再次运行会更新文件并保留额外的本地文件。账号授权和 API 凭证需要每位使用者自行配置。

## BOSS 使用

在 Chrome 打开 `chrome://extensions/`，开启开发者模式，加载仓库里的 `boss-resume-screening/assets/recruiter-dist/`。刷新 BOSS 招聘沟通页面后打开“候选人复核”。详细操作和边界见 [BOSS 说明](boss-resume-screening/assets/recruiter/README.md)。源码、测试和无需 npm 依赖的构建脚本均随包提供，保留原项目 MIT 许可证。

在 Codex 中说：`使用 boss-resume-screening，帮我核对当前 BOSS 候选人的岗位技能证据。`

## 小红书使用

在自己的工作目录中创建 `.env`，按照 `xhs-business-validator/.env.example` 填入自己的 `TIKHUB_TOKEN`。不要将真实密钥提交到 GitHub。

在 Codex 中说：`使用 xhs-business-validator，快速验证我这个商业想法的小红书市场需求。`

小红书 Skill 需要外部 TikHub 数据服务；本仓库不包含账号、Token 或服务额度。报告保存在使用者工作目录的 `reports/`，不参与公开发布。

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
