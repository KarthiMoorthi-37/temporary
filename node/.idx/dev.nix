# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-23.11"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20
  ];
  # Sets environment variables in the workspace
  env = {};

  # This command runs when the environment starts. It installs dependencies if
  # they are missing and then starts the application.
  entrypoint = "if [ ! -d 'node_modules' ]; then npm install --ignore-scripts; fi && npm run start -- --port $PORT";

  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      # "vscodevim.vim"
    ];
    workspace = {
      # Runs when a workspace is first created with this `dev.nix` file
      onCreate = {
        # Open editors for the following files by default, if they exist:
        default.openFiles = [ "index.js" "index.html" ];
      };
      # To run something each time the workspace is (re)started, use the `onStart` hook
    };
    # Enable previews and customize configuration
    previews = {
      enable = true;
      previews = {
        web = {
          # The command is now handled by the top-level 'entrypoint'
          manager = "web";
        };
      };
    };
  };
}
