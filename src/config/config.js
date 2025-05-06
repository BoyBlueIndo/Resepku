// ✅ URL utama
export const API_BASE_URL = "https://8653-2400-9800-2e0-cc12-6071-a337-c13b-9aff.ngrok-free.app";
export const API_URL = `${API_BASE_URL}/api`;

export const API_LOGIN_URL = `${API_URL}/auth/login`;
export const API_REGISTER_URL = `${API_URL}/auth/register`;
export const API_RESET_PASSWORD_URL = `${API_URL}/auth/reset-password`;

export const API_MENU_URL = `${API_URL}/menu`;

export const API_FAVORITES_URL = `${API_URL}/favorite`; // 🔁 ganti dari "favorites" ke "favorite"
export const API_ADD_FAVORITE_URL = API_FAVORITES_URL;
export const API_REMOVE_FAVORITE_URL = API_FAVORITES_URL;
export const API_GET_FAVORITES_URL = (userId) => `${API_FAVORITES_URL}/user/${userId}`;


// ✅ Debug log
console.log("✅ CONFIG LOADED:");
console.log("❤️ API_FAVORITES_URL =", API_FAVORITES_URL);
console.log("🌐 API_BASE_URL =", API_BASE_URL);
console.log("🍽️ API_MENU_URL =", API_MENU_URL);
console.log("🔐 API_LOGIN_URL =", API_LOGIN_URL);
console.log("📝 API_REGISTER_URL =", API_REGISTER_URL);
console.log("🔁 API_RESET_PASSWORD_URL =", API_RESET_PASSWORD_URL);
