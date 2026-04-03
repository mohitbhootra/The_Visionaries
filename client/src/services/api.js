import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const ANONYMOUS_SESSION_TOKEN_KEY = 'anonymousSessionToken';
const ANONYMOUS_SESSION_ALIAS_KEY = 'anonymousSessionAlias';
const VOLUNTEER_TOKEN_KEY = 'volunteerToken';

const getToken = () =>
  localStorage.getItem(VOLUNTEER_TOKEN_KEY) ||
  localStorage.getItem(ANONYMOUS_SESSION_TOKEN_KEY) ||
  localStorage.getItem('sessionToken');

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
  localStorage.setItem(ANONYMOUS_SESSION_TOKEN_KEY, res.data.token);
  localStorage.setItem('sessionToken', res.data.token);
  localStorage.setItem('sessionId', res.data.sessionId);
  localStorage.setItem('alias', res.data.alias);
  localStorage.setItem(ANONYMOUS_SESSION_ALIAS_KEY, res.data.alias);
  localStorage.setItem('sessionTags', JSON.stringify(tags));
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
  localStorage.setItem(VOLUNTEER_TOKEN_KEY, res.data.token);
  return res.data;
};

export const clearAnonymousSession = () => {
  localStorage.removeItem(ANONYMOUS_SESSION_TOKEN_KEY);
  localStorage.removeItem('sessionToken');
  localStorage.removeItem('sessionId');
  localStorage.removeItem('alias');
  localStorage.removeItem(ANONYMOUS_SESSION_ALIAS_KEY);
  localStorage.removeItem('sessionTags');
};

export const getAnonymousSessionAlias = () =>
  localStorage.getItem(ANONYMOUS_SESSION_ALIAS_KEY) ||
  localStorage.getItem('alias') ||
  localStorage.getItem('safespace_alias') ||
  '';

export const getAnonymousSessionTags = () => {
  try {
    return JSON.parse(localStorage.getItem('sessionTags') || '[]');
  } catch {
    return [];
  }
};

export const requestMatch = async (tags) => {
  const res = await api.post('/volunteer/match', { tags });
  return res.data;
};

export const toggleAvailability = async (isAvailable) => {
  const res = await api.patch('/volunteer/availability', { isAvailable });
  return res.data;
};
