// services/authService.js

const API_URL = "http://127.0.0.1:8000/api"; // 🔁 عدله بالرابط الحقيقي بتاعك

export const register = async (userData) => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  if (!res.ok) throw data;

  // حفظ التوكن بعد التسجيل (اختياري حسب API بتاعك)
  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user || {}));
  }

  return data;
};

export const login = async (credentials) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();

  if (!res.ok) throw data;

  // ✅ تخزين التوكن وبيانات المستخدم
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user || {}));

  return data;
};

// ✅ تجديد التوكن لو API بتدعمها
export const refreshToken = async () => {
  const refresh = localStorage.getItem("refreshToken");
  if (!refresh) throw new Error("No refresh token found.");

  const res = await fetch(`${API_URL}/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refresh }),
  });

  const data = await res.json();

  if (!res.ok) throw data;

  localStorage.setItem("token", data.token);
  return data;
};

// ✅ تسجيل الخروج
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("refreshToken");
};
