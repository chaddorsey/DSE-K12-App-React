// backend/server.js
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createUser, authenticateUser, getUserById, updateUser, users } = require('./models/User');

const app = express();
const PORT = 3001;
const JWT_SECRET = 'your_jwt_secret'; // In production, store this securely

// In-memory session storage for match sessions
const sessions = {};

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// -------------------------------
// Authentication Endpoints
// -------------------------------
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

app.post('/api/auth/reset', async (req, res) => {
  const { username, newPassword } = req.body;
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
// User Management Endpoints
// -------------------------------
app.get('/api/users', (req, res) => {
  const publicUsers = users.map(({ id, username, email, onboardingAnswers }) => ({ id, username, email, onboardingAnswers }));
  res.json(publicUsers);
});

app.get('/api/users/:id', (req, res) => {
  const user = getUserById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }
  // Return full profile including onboardingAnswers
  res.json(user);
});

// NEW: Update user profile endpoint
app.put('/api/users/:id', (req, res) => {
  try {
    const updatedUser = updateUser(req.params.id, req.body);
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// -------------------------------
// Match Session Endpoints
// -------------------------------
app.post('/api/match/start', (req, res) => {
  const { initiatorId, opponentId } = req.body;
  const sessionId = Math.random().toString(36).substr(2, 9);
  sessions[sessionId] = {
    sessionId,
    initiator: initiatorId,
    opponent: opponentId,
    status: 'pending', // pending, started, complete
    results: {} // to be filled as { [userId]: { answers: [], score: number } }
  };
  res.cookie('matchSessionId', sessionId, { httpOnly: true });
  res.json({ 
    sessionId, 
    matchUrl: `http://localhost:3000/match/${sessionId}` 
  });
});

app.post('/api/match/:sessionId/join', (req, res) => {
  const { sessionId } = req.params;
  const { userId } = req.body;
  const session = sessions[sessionId];
  if (session) {
    if (session.opponent.toString() === userId.toString()) {
      session.status = 'started';
      res.json({ message: 'Joined successfully', session });
    } else {
      res.status(403).json({ error: 'Not authorized to join this session' });
    }
  } else {
    res.status(404).json({ error: 'Session not found' });
  }
});

app.get('/api/match/:sessionId/status', (req, res) => {
  const { sessionId } = req.params;
  const session = sessions[sessionId];
  if (session) {
    res.json(session);
  } else {
    res.status(404).json({ error: 'Session not found' });
  }
});

app.post('/api/match/:sessionId/result', (req, res) => {
  const { sessionId } = req.params;
  const { userId, answers, score } = req.body;
  const session = sessions[sessionId];
  if (session) {
    session.results[userId] = { answers, score };
    if (session.results[session.initiator] && session.results[session.opponent]) {
      session.status = 'complete';
    }
    res.json({ message: 'Result updated', session });
  } else {
    res.status(404).json({ error: 'Session not found' });
  }
});

app.post('/api/match/:sessionId/cancel', (req, res) => {
  const { sessionId } = req.params;
  if (sessions[sessionId]) {
    delete sessions[sessionId];
    res.json({ message: 'Session canceled' });
  } else {
    res.status(404).json({ error: 'Session not found' });
  }
});

// -------------------------------
// Distractor Generation Endpoint
// -------------------------------
app.get('/api/questions/distractors', (req, res) => {
  const { label, correctAnswer } = req.query;
  if (!label || !correctAnswer) {
    return res.status(400).json({ error: 'Missing label or correctAnswer' });
  }
  const isNumeric = !isNaN(Number(correctAnswer));
  let responses = [];
  users.forEach(user => {
    if (user.onboardingAnswers && user.onboardingAnswers[label] !== undefined) {
      responses.push(user.onboardingAnswers[label]);
    }
  });
  responses = Array.from(new Set(responses));
  responses = responses.filter(r => r.toString() !== correctAnswer.toString());
  
  if (isNumeric) {
    const numResponses = responses.map(r => Number(r)).filter(r => !isNaN(r));
    if (numResponses.length === 0) {
      return res.json({ distractors: [] });
    }
    const min = Math.min(...numResponses);
    const max = Math.max(...numResponses);
    let distractors = [];
    let attempts = 0;
    while (distractors.length < 2 && attempts < 10) {
      const candidate = Math.floor(Math.random() * (max - min + 1)) + min;
      if (candidate.toString() !== correctAnswer.toString() && !distractors.includes(candidate)) {
        distractors.push(candidate);
      }
      attempts++;
    }
    return res.json({ distractors });
  } else {
    let distractors = [];
    while (distractors.length < 2 && responses.length > 0) {
      const candidate = responses[Math.floor(Math.random() * responses.length)];
      if (!distractors.includes(candidate)) {
        distractors.push(candidate);
      }
      if (responses.length < 2) break;
    }
    return res.json({ distractors });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
