import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// Helper: get token from localStorage
const getToken = () => localStorage.getItem('sessionToken');

// Axios instance with default headers
const api = axios.create({ baseURL: BASE_URL });

// Auto-attach token to every request
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Session ──────────────────────────────────────────
export const startSession = async (tags = []) => {
  const res = await api.post('/session/start', { tags });
  // Save token to localStorage
  localStorage.setItem('sessionToken', res.data.token);
  localStorage.setItem('sessionId', res.data.sessionId);
  localStorage.setItem('alias', res.data.alias);
  return res.data;
};

export const getSessionStatus = async (sessionId) => {
  const res = await api.get(`/session/status/${sessionId}`);
  return res.data;
};

// ── Chat ─────────────────────────────────────────────
export const sendMessage = async (text) => {
  const sessionId = localStorage.getItem('sessionId');
  const res = await api.post('/chat/message', { text, sessionId });
  return res.data;
};

export const getChatHistory = async () => {
  const sessionId = localStorage.getItem('sessionId');
  const res = await api.get(`/chat/history/${sessionId}`);
  return res.data;
};

// ── Emergency ────────────────────────────────────────
export const getEmergencyContacts = async () => {
  const res = await api.get('/chat/emergency');
  return res.data;
};

// ── Volunteer ────────────────────────────────────────
export const volunteerLogin = async (username, password) => {
  const res = await api.post('/volunteer/login', { username, password });
  localStorage.setItem('sessionToken', res.data.token);
  return res.data;
};

export const requestMatch = async (tags) => {
  const res = await api.post('/volunteer/match', { tags });
  return res.data;
};

export const toggleAvailability = async (isAvailable) => {
  const res = await api.patch('/volunteer/availability', { isAvailable });
  return res.data;
};
