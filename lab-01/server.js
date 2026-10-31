const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to log incoming requests and the status code returned
app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> Status: ${res.statusCode}`);
  });
  next();
});

// Route 1: GET / (welcome text)
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Express Server - Lab 1!');
});

// Route 2: GET /about (JSON with name and section)
app.get('/about', (req, res) => {
  res.status(200).json({
    name: process.env.STUDENT_NAME || 'Ramireddy Joel',
    registrationNumber: process.env.STUDENT_REG_NO || 'REG123456',
    section: process.env.STUDENT_SECTION || 'Aurora',
    module: 'Node.js and Express.js fundamentals'
  });
});

// Route 3: GET /time (current date and time using new Date())
app.get('/time', (req, res) => {
  const currentTime = new Date();
  res.status(200).json({
    currentTime: currentTime.toString(),
    iso: currentTime.toISOString(),
    epoch: currentTime.getTime()
  });
});

// 404 Handler for any unknown path
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    statusCode: 404,
    message: `The requested route '${req.originalUrl}' was not found on this server.`
  });
});

// Start Express server
app.listen(PORT, () => {
  console.log(`Express server is listening on http://localhost:${PORT}`);
});
