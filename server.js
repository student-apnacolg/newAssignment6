// Load HTTP server, files and path handling
const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const PORT = process.env.PORT || 3000;

// function: reads a file and sends it to the client
async function serveFile(res, filePath, statusCode = 200, contentType = 'text/html', req) {
  try {
    const data = await fs.readFile(filePath);
    res.writeHead(statusCode, { 'Content-Type': contentType });
    res.end(data);
    console.log(`${req.method} ${req.url} ${statusCode}`);
  }catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('500 Internal Server Error');
    console.error(`${req.method} ${req.url} 500 — Error: ${error.message}`);
  }
}

const app = http.createServer((req, res) => {
  const url = req.url;
  console.log(`${req.method} ${url}`); // log incoming requests

  // Only GET requests are allowed
  if (req.method !== 'GET') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('405 Method Not Allowed');
    return console.log(`${req.method} ${url} 405`);
  }

  // Serving CSS file
  if (url === "/styles.css") {
    const cssPath = path.join(__dirname, 'public', 'styles.css');
    return serveFile(res, cssPath, 200, 'text/css', req);
  }

  // Mapping routes to HTML files
  let filePath;
  let code = 200;
if (url === '/' || url === '/home') {
    filePath = path.join(__dirname, 'public', 'home.html');
  } else if (url === '/about') {
    filePath = path.join(__dirname, 'public', 'about.html');
  } else if (url === '/contact') {
    filePath = path.join(__dirname, 'public', 'contact.html');
  } else {
    filePath = path.join(__dirname, 'public', '404.html');
    code = 404;
  }
  serveFile(res, filePath, code, 'text/html', req);
});

// Start listening on configured port
app.listen(PORT, () => {
  console.log(`node.js project server started on http://localhost:${PORT}`);
});
