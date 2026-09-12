#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_NAME="fellou-resume-screening"
SRC_DIR="$ROOT_DIR/$SKILL_NAME"
DEST_ROOT="${CODEX_HOME:-$HOME/.codex}/skills"
DEST_DIR="$DEST_ROOT/$SKILL_NAME"

if [ ! -f "$SRC_DIR/SKILL.md" ]; then
  echo "Cannot find $SRC_DIR/SKILL.md"
  exit 1
fi

mkdir -p "$DEST_ROOT"

if command -v rsync >/dev/null 2>&1; then
  rsync -a --delete \
    --exclude ".DS_Store" \
    --exclude "__pycache__" \
    "$SRC_DIR/" "$DEST_DIR/"
else
  rm -rf "$DEST_DIR"
  cp -R "$SRC_DIR" "$DEST_DIR"
fi

echo "Installed $SKILL_NAME to $DEST_DIR"
echo "Restart Codex or open a new task, then invoke: 使用 $SKILL_NAME 筛选简历"
