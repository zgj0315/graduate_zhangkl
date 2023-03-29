use axum::{routing::get, Json, Router};
use axum_server::tls_rustls::RustlsConfig;
use dev_util::log::log_init;
use lazy_static::lazy_static;
use serde_json::Value;
use std::{fs::File, io::BufReader, net::SocketAddr, path::PathBuf};

lazy_static! {
    static ref FAQ: Value = load_faq();
}
#[tokio::main]
async fn main() {
    log_init();
    let cert = PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .join("data")
        .join("zgj0315-ca.crt");
    log::info!("cert: {:?}", cert);
    let key = PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .join("data")
        .join("zgj0315-ca.key");
    log::info!("key: {:?}", key);
    let config = RustlsConfig::from_pem_file(cert, key).await.unwrap();
    let app = Router::new().route("/", get(handler));
    let addr = SocketAddr::from(([0, 0, 0, 0], 3443));
    log::info!("listening on {}", addr);
    axum_server::bind_rustls(addr, config)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn handler() -> Json<Value> {
    log::info!("in handler");
    let faq = FAQ.clone();
    Json(faq)
}

fn load_faq() -> Value {
    let file = File::open("./data/faq.json").unwrap();
    let reader = BufReader::new(file);
    let faq: Value = serde_json::from_reader(reader).unwrap();
    faq
}

#[cfg(test)]
mod tests {
    use super::*;
    // cargo test tests::test_load_faq
    #[test]
    fn test_load_faq() {
        log_init();
        let faq = load_faq();
        log::info!("{:?}", faq);
    }
}
