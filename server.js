// Load HTTP server, files and path handling
const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const PORT = process.env.PORT || 3000;

// function: reads a file and sends it to the client
async function serveFile(res, filePath, statusCode = 200, contentType = 'text/html') {
  try {
    const data = await fs.readFile(filePath); // read file contents
    res.writeHead(statusCode, { 'Content-Type': contentType });
    return res.end(data);
  } catch (error) {
    console.log("error serving file:", error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    return res.end('500 Internal Server Error');
  }
}

const app = http.createServer((req, res) => {
  const url = req.url;
  console.log(`${req.method} ${url}`); // log incoming requests

  // Only GET requests are allowed
  if (req.method !== 'GET') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    return res.end('405 Method Not Allowed');
  }

  // Serving CSS file
  if (url === "/styles.css") {
    const cssPath = path.join(__dirname, 'public', 'styles.css');
    serveFile(res, cssPath, 200, 'text/css');
    return;
  }

  // Mapping routes to HTML files
  let filePath;
  if (url === '/' || url === '/home') {
    filePath = path.join(__dirname, 'public', 'home.html');
    serveFile(res, filePath, 200);
  } else if (url === '/about') {
    filePath = path.join(__dirname, 'public', 'about.html');
    serveFile(res, filePath, 200);
  } else if (url === '/contact') {
    filePath = path.join(__dirname, 'public', 'contact.html');
    serveFile(res, filePath, 200);
  } else {
    // Route not recognized → serve custom 404 page
    filePath = path.join(__dirname, 'public', '404.html');
    serveFile(res, filePath, 404);
  }
});

// Start listening on configured port
app.listen(PORT, () => {
  console.log(`node.js project server started on http://localhost:${PORT}`);
});
