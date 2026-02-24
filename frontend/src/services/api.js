const API_BASE = "https://healthtracker-l79c.onrender.com";

/* ================= UPLOAD CSV ================= */
export const uploadCSV = async (formData) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Not authenticated. Please login again.");
  }

  const res = await fetch(`${API_BASE}/api/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Upload failed");
  }

  return res.json();
};

/* ================= AUTH ================= */
export const loginUser = async (data) => {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error || "Login failed");
  }

  localStorage.setItem("token", result.token);

  return result;
};

export const signupUser = async (data) => {
  const res = await fetch(`${API_BASE}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return await res.json();
};

/* ================= FETCH USER DATA ================= */
export const fetchData = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found in localStorage");
  }

  const res = await fetch(`${API_BASE}/api/data`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Fetch error:", text);
    throw new Error(text || "Failed to fetch data");
  }

  return res.json();
};

/* ================= AI INSIGHTS ================= */
export const fetchAIInsights = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}/ai-insights`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("AI Insights fetch error:", data);
    throw new Error(data.error || "Failed to fetch AI insights");
  }

  return data;
};
