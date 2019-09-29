use wasm_bindgen::prelude::*;

#[wasm_bindgen(start)]
pub fn start() {
    console_error_panic_hook::set_once();
    console_log::init_with_level(log::Level::Debug).unwrap_throw();

    log::info!("Hello from Rust");

    let window = web_sys::window().unwrap_throw();
    let document = window.document().unwrap_throw();
    let body = document.body().unwrap_throw();

    body.insert_adjacent_html(
        "afterbegin",
        r#"
            <main class="container mx-auto p-8 bg-blue-200">
                <h1 class="text-center text-3xl sm:text-5xl text-gray-900">
                    Hello from Rust
                </h1>
            </main>
        "#,
    )
    .unwrap_throw();
}
