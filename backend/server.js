// backend/server.js
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const PORT = 3001;

// In-memory session storage
const sessions = {};

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Endpoint to create a match session
app.post('/api/match/start', (req, res) => {
  const sessionId = Math.random().toString(36).substr(2, 9); // Simple unique ID generator
  sessions[sessionId] = { user1: true, user2: false };
  res.cookie('matchSessionId', sessionId, { httpOnly: true });
  res.json({ 
    sessionId, 
    // Build a shareable URL using your frontend host address:
    matchUrl: `http://localhost:3000/match/${sessionId}` 
  });
});

// Endpoint for User 2 to join a match session
app.post('/api/match/:sessionId/join', (req, res) => {
  const { sessionId } = req.params;
  if (sessions[sessionId]) {
    sessions[sessionId].user2 = true;
    res.json({ message: 'Joined successfully' });
  } else {
    res.status(404).json({ error: 'Session not found' });
  }
});

// Polling endpoint to check session status
app.get('/api/match/:sessionId/status', (req, res) => {
  const { sessionId } = req.params;
  if (sessions[sessionId]) {
    res.json({ joined: sessions[sessionId].user2 });
  } else {
    res.status(404).json({ error: 'Session not found' });
  }
});

// Endpoint to cancel a session (if needed)
app.post('/api/match/:sessionId/cancel', (req, res) => {
  const { sessionId } = req.params;
  if (sessions[sessionId]) {
    delete sessions[sessionId];
    res.json({ message: 'Session canceled' });
  } else {
    res.status(404).json({ error: 'Session not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

