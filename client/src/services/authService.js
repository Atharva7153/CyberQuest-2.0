const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050';

const TOKEN_STORAGE_KEY = 'nexus_team_jwt';
const TEAM_ID_STORAGE_KEY = 'nexus_team_id';

export const getStoredToken = () => localStorage.getItem(TOKEN_STORAGE_KEY);
export const getStoredTeamId = () => localStorage.getItem(TEAM_ID_STORAGE_KEY);

export const storeTeamSession = (token, teamId) => {
  if (token) localStorage.setItem(TOKEN_STORAGE_KEY, token);
  if (teamId) localStorage.setItem(TEAM_ID_STORAGE_KEY, teamId);
};

export const clearTeamSession = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(TEAM_ID_STORAGE_KEY);
};

export const loginTeamRequest = async (teamId, password) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ teamId, password }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || 'Authentication failed. Check TEAM ID and PASSWORD.');
  }

  return data;
};

export const fetchAuthenticatedTeam = async (token) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || 'Session expired.');
  }

  return data;
};

export const postTeamActionHttp = async (token, actionType, payload = {}) => {
  const response = await fetch(`${API_BASE_URL}/api/team/action`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ actionType, payload }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || 'Action rejected by NEXUS Core.');
  }

  return data;
};

export const fetchChallengeMarket = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.category && filters.category !== 'ALL') params.set('category', filters.category);
  if (filters.difficulty && filters.difficulty !== 'ALL') params.set('difficulty', filters.difficulty);
  if (filters.risk && filters.risk !== 'ALL') params.set('risk', filters.risk);

  const qs = params.toString() ? `?${params.toString()}` : '';
  const response = await fetch(`${API_BASE_URL}/api/challenges${qs}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || 'Unable to load Challenge Market.');
  }

  return data;
};

export const acquireChallengeHttp = async (token, challengeId, isReattempt = false) => {
  const response = await fetch(`${API_BASE_URL}/api/challenges/${encodeURIComponent(challengeId)}/acquire`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ challengeId, isReattempt }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || 'Challenge acquisition rejected by NEXUS Core.');
  }

  return data;
};

