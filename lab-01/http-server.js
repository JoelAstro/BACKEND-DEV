/**
 * Task 3: Plain HTTP server using Node.js built-in 'http' module.
 * Replies "Hello" to every request and listens on port 3000.
 */

const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello');
});

server.listen(PORT, () => {
  console.log(`Plain HTTP server running at http://localhost:${PORT}`);
});
