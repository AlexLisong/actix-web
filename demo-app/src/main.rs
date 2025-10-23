use actix_files::Files;
use actix_web::{get, web, App, HttpResponse, HttpServer, Responder};
use serde::Serialize;

#[derive(Serialize)]
struct ApiResponse {
    message: String,
    timestamp: u64,
}

// Homepage route - serves the main HTML page
#[get("/")]
async fn index() -> impl Responder {
    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(include_str!("../static/index.html"))
}

// API endpoint example - returns JSON data
#[get("/api/hello")]
async fn hello() -> impl Responder {
    let response = ApiResponse {
        message: String::from("Hello from Actix-Web!"),
        timestamp: std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_secs(),
    };
    web::Json(response)
}

// About page example
#[get("/about")]
async fn about() -> impl Responder {
    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(r#"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About - Actix-Web Demo</title>
    <link rel="stylesheet" href="/static/css/style.css">
</head>
<body>
    <div class="container">
        <nav class="nav">
            <a href="/">Home</a>
            <a href="/about" class="active">About</a>
        </nav>
        <div class="content">
            <h1>About This Demo</h1>
            <p>This is a modern web application built with Actix-Web, a powerful Rust web framework.</p>
            <h2>Features:</h2>
            <ul>
                <li>Fast and safe with Rust</li>
                <li>Asynchronous request handling</li>
                <li>Static file serving</li>
                <li>JSON API endpoints</li>
                <li>Modern responsive UI</li>
            </ul>
            <a href="/" class="btn">Back to Home</a>
        </div>
    </div>
</body>
</html>
        "#)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("🚀 Starting server at http://localhost:8080");
    println!("📝 Visit http://localhost:8080 to see the homepage");
    println!("🔗 Visit http://localhost:8080/about for the about page");
    println!("🌐 Visit http://localhost:8080/api/hello for the API endpoint");

    HttpServer::new(|| {
        App::new()
            // Register route handlers
            .service(index)
            .service(about)
            .service(hello)
            // Serve static files (CSS, JS, images) from the static directory
            .service(Files::new("/static", "./static").show_files_listing())
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
