let
  mozilla = import (builtins.fetchTarball https://github.com/mozilla/nixpkgs-mozilla/archive/master.tar.gz);
  nixpkgs = import <nixpkgs> { overlays = [ mozilla ]; };
in

  with nixpkgs;

  pkgs.mkShell {
    buildInputs = with pkgs; [
      (
        rustChannelOfTargets "stable" null [
          "x86_64-unknown-linux-gnu"
          "wasm32-unknown-unknown"
        ]
      )

      wasm-pack

      yarn
      nodejs
    ];
  }
