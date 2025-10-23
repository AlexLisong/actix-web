# Modern Actix-Web Demo Application

A beautiful, modern web application built with Actix-Web to demonstrate key concepts and features of the framework.

## Features

- **Modern UI**: Beautiful, responsive design with animations and smooth transitions
- **Dark Theme**: Eye-friendly dark mode with gradient accents
- **Static File Serving**: CSS, JavaScript, and other static assets
- **API Endpoints**: JSON API with example routes
- **Interactive Elements**: JavaScript interactivity with API calls
- **Educational Code**: Well-commented code to help you learn

## Project Structure

```
demo-app/
├── src/
│   └── main.rs           # Main application with routes and server setup
├── static/
│   ├── index.html        # Homepage HTML
│   ├── css/
│   │   └── style.css     # Modern CSS styling
│   └── js/
│       └── script.js     # Interactive JavaScript
├── Cargo.toml            # Dependencies
└── README.md             # This file
```

## Running the Application

1. Make sure you're in the demo-app directory:
   ```bash
   cd demo-app
   ```

2. Build and run the application:
   ```bash
   cargo run
   ```

3. Open your browser and navigate to:
   - Homepage: http://localhost:8080
   - About page: http://localhost:8080/about
   - API endpoint: http://localhost:8080/api/hello

## Learning Points

### 1. Route Handlers (main.rs)

The application demonstrates three types of routes:

```rust
// Simple HTML page
#[get("/")]
async fn index() -> impl Responder {
    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(include_str!("../static/index.html"))
}

// JSON API endpoint
#[get("/api/hello")]
async fn hello() -> impl Responder {
    web::Json(response)
}
```

**Key concepts:**
- `#[get("/")]` macro for routing
- `async fn` for asynchronous handling
- `impl Responder` trait for responses
- Different content types (HTML, JSON)

### 2. Static File Serving (main.rs)

```rust
.service(Files::new("/static", "./static").show_files_listing())
```

**Key concepts:**
- `Files::new()` creates a static file service
- First parameter: URL path prefix
- Second parameter: filesystem directory to serve
- `show_files_listing()`: optional directory browsing

### 3. Server Configuration (main.rs)

```rust
HttpServer::new(|| {
    App::new()
        .service(index)
        .service(about)
        .service(hello)
        .service(Files::new("/static", "./static"))
})
.bind(("127.0.0.1", 8080))?
.run()
.await
```

**Key concepts:**
- `HttpServer::new()` creates the server
- `App::new()` creates the application instance
- `.service()` registers route handlers
- `.bind()` sets the address and port
- `.run().await` starts the server

### 4. HTML Structure (index.html)

The HTML demonstrates:
- Semantic HTML5 elements
- Responsive navigation
- Section-based layout
- Integration with CSS and JavaScript

### 5. Modern CSS (style.css)

Features include:
- CSS custom properties (variables)
- Flexbox and Grid layouts
- Animations and transitions
- Responsive design with media queries
- Gradient backgrounds
- Modern blur effects

### 6. JavaScript Interactivity (script.js)

Features include:
- Async/await for API calls
- Fetch API for HTTP requests
- DOM manipulation
- Event listeners
- Local storage for counters
- Intersection Observer for animations
- Keyboard shortcuts

## Keyboard Shortcuts

- **Ctrl+K** (or Cmd+K on Mac): Test the API endpoint

## Customization Ideas

Here are some ways you can extend this demo to learn more:

1. **Add More Routes**: Create new pages and API endpoints
2. **Database Integration**: Add SQLite or PostgreSQL with actix-web
3. **Form Handling**: Add POST endpoints for form submissions
4. **WebSocket**: Add real-time features with WebSocket
5. **Middleware**: Add logging, authentication, or CORS
6. **Template Engine**: Replace static HTML with Tera or Askama templates
7. **Error Handling**: Add custom error pages
8. **File Uploads**: Add multipart form data handling

## Understanding the Code

### How Routing Works

When a request comes in:
1. Actix-Web matches the URL path to registered routes
2. The corresponding handler function is called
3. The handler returns a response (HTML, JSON, etc.)
4. Actix-Web sends the response to the client

### How Static Files Work

When requesting `/static/css/style.css`:
1. Actix-Web checks if the path matches a registered service
2. The `Files` service checks `./static/css/style.css`
3. If found, it serves the file with the correct MIME type
4. Headers like Content-Type are set automatically

### How JSON APIs Work

When calling `/api/hello`:
1. The handler function creates a struct
2. `web::Json()` serializes it using serde
3. The response has `Content-Type: application/json`
4. JavaScript can parse the response with `response.json()`

## Next Steps

To learn more about Actix-Web:

1. Read the official documentation: https://actix.rs
2. Explore the examples in the parent directory
3. Try adding new features to this demo
4. Build your own project!

## Dependencies

- **actix-web**: The web framework
- **actix-files**: Static file serving
- **serde**: Serialization/deserialization

All dependencies are defined in `Cargo.toml`.
