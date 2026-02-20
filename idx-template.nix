{ pkgs, language ? "ts", ... }:
{
  packages = [ pkgs.nodejs_21 ]; # Use the latest available Node.js version
  bootstrap = ''
    # Create the workspace directory and cd into it
    mkdir "$WS_NAME"
    cd "$WS_NAME"

    # Use a temporary directory for scaffolding
    TMP_DIR="vite-tmp"
    npm create -y vite@latest "$TMP_DIR" -- --template ${if language == "ts" then "qwik-ts" else "qwik"}
    
    # Move the scaffolded contents into the current directory ($WS_NAME)
    mv "$TMP_DIR"/* "$TMP_DIR"/.[!.]* .
    rmdir "$TMP_DIR"

    # Continue with the rest of the setup inside $WS_NAME
    rm -f .eslintrc.cjs

    mkdir -p .idx
    cp -rf ${./icon.png} .idx/icon.png
    cp -rf ${./dev.nix} .idx/dev.nix
    cp -rf ${./.idx/airules.md} .idx/airules.md
    cp -rf ${./.idx/eslint.config.js} ./eslint.config.js
    cp -rf ${./.idx/update-pkg.cjs} .idx/update-pkg.cjs

    cp -rf .idx/airules.md ./GEMINI.md

    # Run the script to update package.json
    node .idx/update-pkg.cjs

    # Install all dependencies
    npm install

    # Change directory back to the parent
    cd ..

    # Move the completed workspace to the final output directory
    mv "$WS_NAME" "$out"
  '';
}
