// src/api/client.js
// Single gateway for all calls to the easefin-ai backend (FastAPI).
// Nothing in the frontend talks to a database or an LLM directly —
// everything goes through these functions.

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function request(path, { method = 'GET', body, headers = {} } = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let detail;
    try {
      detail = (await res.json()).detail;
    } catch {
      detail = res.statusText;
    }
    const err = new Error(detail || `Request failed: ${res.status}`);
    err.status = res.status;
    throw err;
  }

  // 204 No Content
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  // ---- AI assistant -------------------------------------------------
  // Send a chat message. Backend reads the profile, runs the assistant,
  // logs the conversation, and returns { reply, recommendations?, escalation? }
  chat({ userId, message, language }) {
    return request('/chat', {
      method: 'POST',
      body: { user_id: userId, message, language },
    });
  },

  // ---- Matching (usable outside chat too) ---------------------------
  match({ userId }) {
    return request('/match', { method: 'POST', body: { user_id: userId } });
  },

  // ---- Profiles ------------------------------------------------------
  getProfile(userId) {
    return request(`/profiles/${userId}`);
  },
  saveProfile(profile) {
    return request('/profiles', { method: 'POST', body: profile });
  },

  // ---- Leads (contact form, demo requests, subscriptions) ------------
  submitLead(lead) {
    return request('/leads', { method: 'POST', body: lead });
  },

  // ---- Escalation: "contact the bank directly" ------------------------
  requestBankContact({ userId, bankId }) {
    return request('/escalations', {
      method: 'POST',
      body: { user_id: userId, bank_id: bankId },
    });
  },

  // ---- Reference data (replaces Base44 entities; endpoints TBD) ------
  getGoldRates() {
    return request('/gold-rates');
  },
  getRemittanceCountries() {
    return request('/remittance-countries');
  },
};

export default api;
