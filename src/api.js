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

