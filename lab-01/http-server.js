const http = require('http');

const PORT = process.env.PORT || 3000;

// Task 3: Plain server with http.createServer that replies "Hello" and listens on port 3000
const server = http.createServer((req, res) => {
  console.log(`[HTTP Server] Incoming request: ${req.method} ${req.url} - Status: 200`);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello');
});

server.listen(PORT, () => {
  console.log(`Vanilla Node.js HTTP server running at http://localhost:${PORT}/`);
});
