# Fellou/Eazo 简历筛选 Skill 使用说明

## 本地地址

`/Users/fellou/Documents/筛选简历/fellou-resume-screening`

## 给别人使用时发什么

把整个 `fellou-resume-screening` 文件夹发给对方，不要只发 `SKILL.md`。里面的 `references/` 是岗位画像、校准记录和筛选标准，缺了会影响判断。

也可以直接发压缩包：`fellou-resume-screening.zip`。

## 在 Codex 上直接使用

### macOS / Linux

1. 解压后，把整个文件夹放到 Codex skills 目录：

```bash
mkdir -p ~/.codex/skills
cp -R fellou-resume-screening ~/.codex/skills/
```

2. 重新打开 Codex 或开一个新对话。

3. 直接这样说：

```text
使用 fellou-resume-screening 筛选今天的前端简历
```

### Windows

1. 解压后，把整个 `fellou-resume-screening` 文件夹放到：

```text
%USERPROFILE%\.codex\skills\
```

2. 重新打开 Codex 或开一个新对话。

3. 直接这样说：

```text
使用 fellou-resume-screening 筛选今天的前端简历
```

## 不安装也能用的方法

如果对方不想放到 skills 目录，也可以把整个文件夹放到当前工作区，然后在 Codex 里说：

```text
请读取 ./fellou-resume-screening/SKILL.md，并按照这个 skill 筛选简历
```

这种方式也能用，但每个新工作区都要重新带上文件夹；放进 `~/.codex/skills` 更适合长期复用。

## 日常使用方式

1. 对方把 `fellou-resume-screening` 文件夹放到自己的工作区，或放到 Codex 的 skills 目录。
2. 在 Codex 里说：“使用 fellou-resume-screening 筛选今天的简历 / 前端简历 / 测试简历。”
3. 如果有新的 JD、招聘人纠偏或面试反馈，继续告诉 Codex，让它把可泛化规则沉淀回这个 skill。

## 当前筛选口径摘要

- 优先岗位：Design Engineer / AI Native 前端最高；测试、业务型全栈 / 重构工程师、移动端其次。
- 每批默认筛 10 位未评过的新候选人。
- 报告正文只展示 70 分及以上；70 分以下只进最小去重台账。
- 研发类加分项：自己创过业、独立商业化产品、个人工作室、0 到 1 产品闭环。
- 创业加分必须有可核验证据：产品上线、用户、收入、客户交付、团队、增长、核心代码归属或失败复盘。
- 不能用年龄、性别、婚育、健康、国籍、学校层级、留学背景等敏感或不公平因素评分。

## 主要文件

- `SKILL.md`：核心工作流和长期使用规则。
- `references/company-jd-profile.md`：岗位画像和评分标准。
- `references/calibration-log.md`：招聘人纠偏、新标准和沉淀记录。
