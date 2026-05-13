opus:
    @claude --dangerously-skip-permissions "/caveman"

# Build the Expo RN app as one self-contained index.html and place it at the repo root.
# Usage: just package
package:
    @cd expo-app && npm run build
    @cp expo-app/dist/index.bundle.html index.html
    @printf "wrote %s (%s)\n" index.html "$(du -h index.html | cut -f1)"

# Crop full-resolution localised screenshots to match the EN reference dims.
# Drop raw files into assets/i18n/_raw/<lang>/{app_home,plan_shot,review_panel}.png
# then run: just localize-images <lang>   (or `all` for every language)
# Optional gravity arg (default: center). Examples: center, north, south, northwest.
# Usage: just localize-images es
#        just localize-images all north
localize-images lang="all":
    #!/usr/bin/env bash
    set -euo pipefail
    LANGS=({{lang}})
    if [ "{{lang}}" = "all" ]; then LANGS=(es pt ja fr); fi
    # Per-slot vertical crop offset (px from top of raw phone screenshot, height 2856).
    # app_home is 1:1 with raw, so offset is unused.
    # plan_shot keeps beach hero + question (skip just the status bar).
    # review_panel is a tight crop of the rating card only (skip beach hero).
    offset_for() {
      case "$1" in
        app_home)     echo 0 ;;
        plan_shot)    echo 190 ;;
        review_panel) echo 980 ;;
        *)            echo 0 ;;
      esac
    }
    IMAGES=(app_home plan_shot review_panel)
    REF_DIR="assets/i18n/en"
    RAW_ROOT="assets/i18n/_raw"
    if ! command -v magick >/dev/null 2>&1; then
      echo "error: imagemagick 'magick' not on PATH" >&2; exit 1
    fi
    for lang in "${LANGS[@]}"; do
      if [ "$lang" = "en" ]; then continue; fi
      out_dir="assets/i18n/$lang"
      mkdir -p "$out_dir"
      for name in "${IMAGES[@]}"; do
        ref="$REF_DIR/$name.png"
        raw="$RAW_ROOT/$lang/$name.png"
        out="$out_dir/$name.png"
        if [ ! -f "$raw" ]; then
          printf "skip  %-13s  %s  (no raw file)\n" "$lang/$name" "$raw"
          continue
        fi
        dims=$(magick identify -format "%wx%h" "$ref")
        W=${dims%x*}; H=${dims#*x}
        raw_dims=$(magick identify -format "%wx%h" "$raw")
        RW=${raw_dims%x*}; RH=${raw_dims#*x}
        off=$(offset_for "$name")
        if [ "$RW" = "$W" ] && [ "$RH" = "$H" ]; then
          magick "$raw" "$out"
        else
          max_off=$((RH - H))
          if [ "$off" -gt "$max_off" ]; then off=$max_off; fi
          magick "$raw" -crop "${W}x${H}+0+${off}" +repage "$out"
        fi
        printf "wrote %-13s  %s -> %s  (%s, y_offset=%s)\n" \
          "$lang/$name" "$raw" "$out" "${W}x${H}" "$off"
      done
    done
