use axum::{response::Html, routing::get, Router};
use dev_util::log::log_init;
use std::net::SocketAddr;

#[tokio::main]
async fn main() {
    log_init();
    let app = Router::new().route("/", get(handler));
    let addr = SocketAddr::from(([0, 0, 0, 0], 3000));
    log::info!("listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn handler() -> Html<&'static str> {
    log::info!("in handler");
    Html("<h1>Hello, World!</h1>")
}
