// src/config/config.js

// ✅ URL utama
export const API_BASE_URL = "https://6c62-2001-448a-2071-482a-8d13-c117-eec6-3ceb.ngrok-free.app";
export const API_URL = `${API_BASE_URL}/api`; // base endpoint

// ✅ Sesuaikan dengan prefix "/auth" dari backend
export const API_LOGIN_URL = `${API_URL}/auth/login`;
export const API_REGISTER_URL = `${API_URL}/auth/register`;
export const API_RESET_PASSWORD_URL = `${API_URL}/auth/reset-password`;

// ✅ URL menu tetap
export const API_MENU_URL = `${API_URL}/menu`;

// ✅ URL favorit
export const API_FAVORITES_URL = `${API_URL}/favorites`;           // base favorites
export const API_ADD_FAVORITE_URL = API_FAVORITES_URL;             // POST   { userId, menuId }
export const API_REMOVE_FAVORITE_URL = API_FAVORITES_URL;          // DELETE { userId, menuId }
export const API_GET_FAVORITES_URL = (userId) =>                   // GET    list favorit user
  `${API_FAVORITES_URL}/user/${userId}`;


// ✅ Debug log
console.log("✅ CONFIG LOADED:");
console.log("❤️ API_FAVORITES_URL =", API_FAVORITES_URL);
console.log("🌐 API_BASE_URL =", API_BASE_URL);
console.log("🍽️ API_MENU_URL =", API_MENU_URL);
console.log("🔐 API_LOGIN_URL =", API_LOGIN_URL);
console.log("📝 API_REGISTER_URL =", API_REGISTER_URL);
console.log("🔁 API_RESET_PASSWORD_URL =", API_RESET_PASSWORD_URL);
