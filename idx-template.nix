{ pkgs, language ? "ts", ... }:
{
  packages = [ pkgs.nodejs_20 ];
  bootstrap = ''
    # Create a temporary directory for the Vite project
    TMP_DIR="$WS_NAME-tmp"
    npm create -y vite@latest "$TMP_DIR" -- --template ${if language == "ts" then "qwik-ts" else "qwik"}
    
    # Move contents to the final workspace directory (the current directory)
    mv "$TMP_DIR"/* "$TMP_DIR"/.[!.]* .
    rmdir "$TMP_DIR"

    # Remove the default eslint config from Vite
    rm -f .eslintrc.cjs

    # Create the .idx directory and copy our custom configuration
    mkdir -p .idx
    cp -rf ${./icon.png} .idx/icon.png
    cp -rf ${./dev.nix} .idx/dev.nix
    cp -rf ${./.idx/airules.md} .idx/airules.md
    cp -rf ${./.idx/eslint.config.js} ./eslint.config.js
    cp -rf ${./.idx/update-pkg.js} .idx/update-pkg.js

    # Copy airules to the root for better visibility
    cp -rf .idx/airules.md ./GEMINI.md

    # Run the script to update package.json with new deps and configs
    node .idx/update-pkg.js

    # Install all dependencies
    npm install
  '';
}
