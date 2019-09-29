import "./style.css"

import("./pkg").catch(err => {
  console.error("wasm-pack:", err)
})
