# Node.js project : A simple web server

A simple HTTP server built with Node.js that serves static HTML and CSS files from a `public` folder. Only GET requests are supported and custom routes are served with appropriate status codes and content types.

---

## Overview

This server handles:
**Static files**: Serves HTML pages for `/`, `/home`, `/about`, `/contact`, and a custom `404.html` for other URLs.
**CSS support**: Handles `/styles.css` with proper `text/css` header.
**Request logging**: Logs incoming requests with HTTP method and path.
**Error handling**: Returns `500` on file-read errors and `405` for non-GET methods.

## structure

├ public/
│ ├── logs
│ ├── 404.html
│ ├── about.html
│ ├── contact.html
│ ├── home.html
│ └── styles.css
├── .gitignore
├── README.md
└── server.js # Your server code
