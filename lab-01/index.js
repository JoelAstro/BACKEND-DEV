/**
 * Tasks 4–7: Express server with proper routes.
 *
 * Routes:
 *   GET /        → Welcome message (200)
 *   GET /about   → JSON with name and section (200)
 *   GET /time    → Current date and time (200)
 *   *            → 404 Not Found for any unknown path
 */

const express = require('express');

const app = express();
const PORT = 3000;

// ── Task 5a: GET / – Welcome route ──────────────────────────────────────────
app.get('/', (req, res) => {
  console.log(`[${new Date().toISOString()}] GET / → 200`);
  res.status(200).send('Welcome to the Backend Development Fundamentals Lab 1!');
});

// ── Task 5b: GET /about – JSON with name and section ────────────────────────
app.get('/about', (req, res) => {
  console.log(`[${new Date().toISOString()}] GET /about → 200`);
  res.status(200).json({
    name: 'Joel Ramireddy',
    section: 'Year II – Term II',
  });
});

// ── Task 5c: GET /time – Current date and time ──────────────────────────────
app.get('/time', (req, res) => {
  console.log(`[${new Date().toISOString()}] GET /time → 200`);
  res.status(200).json({
    currentTime: new Date().toString(),
  });
});

// ── Task 6: 404 handler for any unknown path ─────────────────────────────────
app.use((req, res) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} → 404`);
  res.status(404).json({
    error: 'Not Found',
    message: `The route ${req.method} ${req.path} does not exist on this server.`,
  });
});

// ── Task 4: Start the Express server ────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
  console.log('Available routes:');
  console.log('  GET /       → Welcome message');
  console.log('  GET /about  → JSON { name, section }');
  console.log('  GET /time   → JSON { currentTime }');
  console.log('  *           → 404 Not Found');
});
