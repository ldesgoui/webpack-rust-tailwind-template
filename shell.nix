{ pkgs ? import <nixpkgs> {}
}:

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
