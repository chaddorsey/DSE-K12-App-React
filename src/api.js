// src/api.js
const API_BASE = 'http://localhost:3001/api';

async function handleResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'API request failed');
  }
  return data;
}

export async function registerUser({ username, password, email }) {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, email }),
  });
  return handleResponse(response);
}

export async function loginUser({ username, password }) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return handleResponse(response);
}

export async function resetPassword({ username, newPassword }) {
  const response = await fetch(`${API_BASE}/auth/reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, newPassword }),
  });
  return handleResponse(response);
}

export async function getUsers() {
  const response = await fetch(`${API_BASE}/users`);
  return handleResponse(response);
}

export async function getUserProfile(id, token) {
  const response = await fetch(`${API_BASE}/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(response);
}

// NEW: Update user profile (e.g., onboardingAnswers)
export async function updateUserProfile(id, data) {
  const response = await fetch(`${API_BASE}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

// Match Session API Functions

export async function startMatchSession({ initiatorId, opponentId }) {
  const response = await fetch(`${API_BASE}/match/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ initiatorId, opponentId }),
  });
  return handleResponse(response);
}

export async function joinMatchSession(sessionId, { userId }) {
  const response = await fetch(`${API_BASE}/match/${sessionId}/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  });
  return handleResponse(response);
}

export async function getMatchStatus(sessionId) {
  const response = await fetch(`${API_BASE}/match/${sessionId}/status`);
  return handleResponse(response);
}

export async function updateMatchResult(sessionId, { userId, answers, score }) {
  const response = await fetch(`${API_BASE}/match/${sessionId}/result`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, answers, score }),
  });
  return handleResponse(response);
}

export async function cancelMatchSession(sessionId) {
  const response = await fetch(`${API_BASE}/match/${sessionId}/cancel`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  return handleResponse(response);
}

// Distractor API Function for numerical and open response questions
export async function getQuestionDistractors(label, correctAnswer) {
  const response = await fetch(
    `${API_BASE}/questions/distractors?label=${encodeURIComponent(label)}&correctAnswer=${encodeURIComponent(correctAnswer)}`
  );
  return handleResponse(response);
}
