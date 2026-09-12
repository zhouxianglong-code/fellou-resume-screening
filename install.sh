#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEST_ROOT="${CODEX_HOME:-$HOME/.codex}/skills"
mkdir -p "$DEST_ROOT"
for SKILL_NAME in fellou-resume-screening boss-resume-screening xhs-business-validator; do
  SRC_DIR="$ROOT_DIR/$SKILL_NAME"
  DEST_DIR="$DEST_ROOT/$SKILL_NAME"
  test -f "$SRC_DIR/SKILL.md" || { echo "Missing $SRC_DIR/SKILL.md"; exit 1; }
  mkdir -p "$DEST_DIR"
  cp -R "$SRC_DIR/." "$DEST_DIR/"
  echo "Installed $SKILL_NAME to $DEST_DIR"
done
echo "Restart Codex. Connect Gmail, load the BOSS extension, and configure TikHub separately."
