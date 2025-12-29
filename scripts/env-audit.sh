#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(pwd)"
OUT_DIR="$REPO_ROOT/_audit/env"
mkdir -p "$OUT_DIR"

need_cmd() { command -v "$1" >/dev/null 2>&1 || { echo "Missing command: $1"; exit 1; }; }
need_cmd git

# Prefer rg if available (faster)
HAVE_RG=0
if command -v rg >/dev/null 2>&1; then HAVE_RG=1; fi

scan_env_keys() {
  if [ "$HAVE_RG" -eq 1 ]; then
    rg -n --no-heading --hidden --glob '!.git/**' --glob '!node_modules/**' \
      -e "process\\.env\\.[A-Z0-9_]+" \
      -e "process\\.env\\[\\s*[\"'][A-Z0-9_]+[\"']\\s*\\]" \
      -e "env\\(\\s*[\"'][A-Z0-9_]+[\"']\\s*\\)" \
      -e "NEXT_PUBLIC_[A-Z0-9_]+" \
      "$REPO_ROOT" || true
  else
    git grep -n --cached --no-color -I -E \
      "process\\.env\\.[A-Z0-9_]+|process\\.env\\[[[:space:]]*[\"'][A-Z0-9_]+[\"'][[:space:]]*\\]|env\\([[:space:]]*[\"'][A-Z0-9_]+[\"'][[:space:]]*\\)|NEXT_PUBLIC_[A-Z0-9_]+" \
      -- . || true
    git grep -n --no-color -I -E \
      "process\\.env\\.[A-Z0-9_]+|process\\.env\\[[[:space:]]*[\"'][A-Z0-9_]+[\"'][[:space:]]*\\]|env\\([[:space:]]*[\"'][A-Z0-9_]+[\"'][[:space:]]*\\)|NEXT_PUBLIC_[A-Z0-9_]+" \
      -- . || true
  fi
}

SED_EXTRACT=$(cat <<'SED'
s/.*process\.env\.([A-Z0-9_]+).*/\1/; t end;
s/.*process\.env\[[[:space:]]*["']([A-Z0-9_]+)["'][[:space:]]*\].*/\1/; t end;
s/.*env\([[:space:]]*["']([A-Z0-9_]+)["'][[:space:]]*\).*/\1/; t end;
s/.*\b(NEXT_PUBLIC_[A-Z0-9_]+)\b.*/\1/; t end;
:end
SED
)

extract_key_from_line() {
  sed -E "$SED_EXTRACT"
}

echo "Scanning repo for environment variable usage..."
RAW="$OUT_DIR/raw_matches.txt"
scan_env_keys > "$RAW"

TABLE="$OUT_DIR/env_usage.tsv"
: > "$TABLE"
while IFS= read -r line; do
  file="$(printf "%s" "$line" | cut -d: -f1)"
  lno="$(printf "%s" "$line" | cut -d: -f2)"
  content="$(printf "%s" "$line" | cut -d: -f3-)"
  key="$(printf "%s" "$line" | extract_key_from_line | tr -d '\r\n')"
  if [ -n "${key:-}" ] && [ -n "${file:-}" ] && [ -n "${lno:-}" ]; then
    printf "%s\t%s\t%s\t%s\n" "$key" "$file" "$lno" "$content" >> "$TABLE"
  fi
done < "$RAW"

KEYS="$OUT_DIR/env_keys.txt"
cut -f1 "$TABLE" | sort -u > "$KEYS"

REQ="$OUT_DIR/env_required.csv"
echo "key,scope,likely_required,used_in_files,examples" > "$REQ"

while IFS= read -r key; do
  files="$(awk -F'\t' -v k="$key" '$1==k {print $2}' "$TABLE" | sort -u | tr '\n' ';' | sed 's/;$//')"
  example="$(awk -F'\t' -v k="$key" '$1==k {print $4; exit}' "$TABLE" | tr -d '\r' | sed 's/"/""/g')"

  scope="server"
  if echo "$key" | grep -q '^NEXT_PUBLIC_'; then scope="client"; fi

  likely="no"
  if echo "$files" | grep -Eq '(app/api/|src/app/api/|prisma/|lib/|scripts/|shadow-engine/|brain/|sql/)'; then
    likely="yes"
  fi

  echo "\"$key\",\"$scope\",\"$likely\",\"$files\",\"$example\"" >> "$REQ"
done < "$KEYS"

ENV_LOCAL_KEYS="$OUT_DIR/env_local_keys.txt"
if [ -f "$REPO_ROOT/.env.local" ]; then
  grep -E '^[A-Za-z_][A-Za-z0-9_]*=' "$REPO_ROOT/.env.local" \
    | sed -E 's/^([A-Za-z_][A-Za-z0-9_]*)=.*/\1/' \
    | sort -u > "$ENV_LOCAL_KEYS"
else
  : > "$ENV_LOCAL_KEYS"
fi

MISSING_LOCAL="$OUT_DIR/missing_in_env_local.csv"
echo "key,reason" > "$MISSING_LOCAL"
while IFS= read -r key; do
  if ! grep -qx "$key" "$ENV_LOCAL_KEYS"; then
    echo "\"$key\",\"not set in .env.local\"" >> "$MISSING_LOCAL"
  fi
done < "$KEYS"

GH_SECRETS="$OUT_DIR/github_secrets_names.txt"
GH_MISSING="$OUT_DIR/missing_in_github_secrets.csv"
echo "key,reason" > "$GH_MISSING"
if command -v gh >/dev/null 2>&1; then
  if gh auth status >/dev/null 2>&1; then
    remote="$(git remote get-url origin 2>/dev/null || true)"
    owner_repo="$(printf "%s" "$remote" | sed -E 's#^https://github.com/([^/]+)/([^/.]+)(\.git)?$#\1/\2#')"
    if echo "$owner_repo" | grep -q '/'; then
      gh api -H "Accept: application/vnd.github+json" "repos/$owner_repo/actions/secrets" --jq '.secrets[].name' \
        | sort -u > "$GH_SECRETS" || : > "$GH_SECRETS"
    else
      : > "$GH_SECRETS"
    fi
  else
    : > "$GH_SECRETS"
  fi
else
  : > "$GH_SECRETS"
fi

if [ -s "$GH_SECRETS" ]; then
  while IFS= read -r key; do
    if ! grep -qx "$key" "$GH_SECRETS"; then
      echo "\"$key\",\"not present as a GitHub Actions secret\"" >> "$GH_MISSING"
    fi
  done < "$KEYS"
else
  echo "\"(github)\",\"gh not authenticated in this codespace; cannot list secrets\"" >> "$GH_MISSING"
fi

VERCEL_ENV_NAMES="$OUT_DIR/vercel_env_names.txt"
VERCEL_MISSING="$OUT_DIR/missing_in_vercel_env.csv"
echo "key,reason" > "$VERCEL_MISSING"

if command -v vercel >/dev/null 2>&1; then
  if vercel whoami >/dev/null 2>&1; then
    vercel env ls 2>/dev/null | awk '{print $1}' | grep -E '^[A-Z_][A-Z0-9_]+$' | sort -u > "$VERCEL_ENV_NAMES" || : > "$VERCEL_ENV_NAMES"
  else
    : > "$VERCEL_ENV_NAMES"
  fi
else
  : > "$VERCEL_ENV_NAMES"
fi

if [ -s "$VERCEL_ENV_NAMES" ]; then
  while IFS= read -r key; do
    if ! grep -qx "$key" "$VERCEL_ENV_NAMES"; then
      echo "\"$key\",\"not present in Vercel env vars\"" >> "$VERCEL_MISSING"
    fi
  done < "$KEYS"
else
  echo "\"(vercel)\",\"vercel not authenticated in this codespace; cannot list env vars\"" >> "$VERCEL_MISSING"
fi

echo ""
echo "Done. Files generated:"
echo "  $REQ"
echo "  $MISSING_LOCAL"
echo "  $GH_MISSING"
echo "  $VERCEL_MISSING"
echo ""
echo "Quick view:"
echo "  Required keys count: $(wc -l < "$KEYS" | tr -d ' ')"
echo "  Missing in .env.local: $(tail -n +2 "$MISSING_LOCAL" | wc -l | tr -d ' ')"
echo "  Missing in GitHub Secrets: $(tail -n +2 "$GH_MISSING" | wc -l | tr -d ' ')"
echo "  Missing in Vercel Env: $(tail -n +2 "$VERCEL_MISSING" | wc -l | tr -d ' ')"
