opus:
    @claude --dangerously-skip-permissions "/caveman"

# Build the Expo RN app as one self-contained index.html and place it at the repo root.
# Usage: just package
package:
    @cd expo-app && npm run build
    @cp expo-app/dist/index.bundle.html index.html
    @printf "wrote %s (%s)\n" index.html "$(du -h index.html | cut -f1)"
