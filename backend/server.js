// backend/server.js
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createUser, authenticateUser, getUserById, users } = require('./models/User');

const app = express();
const PORT = 3001;
const JWT_SECRET = 'your_jwt_secret'; // In production, store this securely (e.g. in environment variables)

// In-memory session storage for match sessions (for demonstration)
const sessions = {};

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// -------------------------------
// Authentication Endpoints
// -------------------------------

// Registration endpoint (if needed)
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = await createUser({ username, password, email });
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await authenticateUser({ username, password });
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ user, token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// Reset password endpoint
app.post('/api/auth/reset', async (req, res) => {
  const { username, newPassword } = req.body;
  // Find user by username
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(404).json({ error: 'Username not found.' });
  }
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    res.json({ message: 'Password successfully updated.' });
  } catch (err) {
    res.status(500).json({ error: 'Error updating password.' });
  }
});

// -------------------------------
// User Management Endpoint
// -------------------------------

// Get list of users (public info only)
app.get('/api/users', (req, res) => {
  const publicUsers = users.map(({ id, username, email }) => ({ id, username, email }));
  res.json(publicUsers);
});

// -------------------------------
// Match Session Endpoints
// -------------------------------

// Create a new match session
app.post('/api/match/start', (req, res) => {
  // Generate a simple unique session ID (for demonstration)
  const sessionId = Math.random().toString(36).substr(2, 9);
  sessions[sessionId] = { user1: true, user2: false, results: {} };
  // Set a cookie with the session ID (httpOnly)
  res.cookie('matchSessionId', sessionId, { httpOnly: true });
  res.json({ 
    sessionId, 
    matchUrl: `http://localhost:3000/match/${sessionId}`  // Shareable URL for the match session
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

