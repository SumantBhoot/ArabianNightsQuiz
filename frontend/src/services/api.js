const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, opts = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(opts.headers || {})
    },
    ...opts
  });

  if (!res.ok) {
    let raw = await res.text();
    let parsed;
    try { parsed = JSON.parse(raw); } catch { parsed = {}; }

    // Handle legacy numeric-subject tokens from before identity was coerced to string
    if (res.status === 422 && (parsed.msg || raw).includes("Subject must be a string")) {
      // Clear invalid token so user can re-auth
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      throw new Error("Session token is outdated. Please log in again.");
    }

    throw new Error(parsed.error || parsed.msg || raw || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const api = {
  login: (payload) => request("/auth/login", { method: "POST", body: JSON.stringify(payload) }),
  register: (payload) => request("/auth/register", { method: "POST", body: JSON.stringify(payload) }),
  getQuestions: (params) => request(`/questions${params ? "?" + new URLSearchParams(params) : ""}`),
  getStories: () => request("/questions/stories"),
  checkAnswer: (payload) => request("/questions/check", { method: "POST", body: JSON.stringify(payload) }),
  submitScore: (payload, token) => request("/leaderboard/submit", { 
    method: "POST", 
    body: JSON.stringify(payload),
    headers: { "Authorization": `Bearer ${token}` }
  }),
  getLeaderboard: (params) => request(`/leaderboard${params ? "?" + new URLSearchParams(params) : ""}`),
};
