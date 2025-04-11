// src/config/config.js

// ✅ URL utama
export const API_BASE_URL = "https://5e58-2400-9800-f1-bfd7-807a-cf31-d351-f1df.ngrok-free.app";
export const API_URL = `${API_BASE_URL}/api`; // base endpoint

// ✅ Sesuaikan dengan prefix "/auth" dari backend
export const API_LOGIN_URL = `${API_URL}/auth/login`;
export const API_REGISTER_URL = `${API_URL}/auth/register`;
export const API_RESET_PASSWORD_URL = `${API_URL}/auth/reset-password`;

// ✅ URL menu tetap
export const API_MENU_URL = `${API_URL}/menu`;

// ✅ Debug log
console.log("✅ CONFIG LOADED:");
console.log("🌐 API_BASE_URL =", API_BASE_URL);
console.log("🍽️ API_MENU_URL =", API_MENU_URL);
console.log("🔐 API_LOGIN_URL =", API_LOGIN_URL);
console.log("📝 API_REGISTER_URL =", API_REGISTER_URL);
console.log("🔁 API_RESET_PASSWORD_URL =", API_RESET_PASSWORD_URL);
