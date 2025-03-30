import API_URL from '../config/config';
import { Alert } from "react-native";

if (!API_URL) {
    console.error("❌ ERROR: API_URL tidak ditemukan! Periksa config.js");
}

const parseResponse = async (response) => {
    try {
        const text = await response.text();
        return JSON.parse(text);
    } catch {
        return { error: "Server mengembalikan respons tidak valid." };
    }
};

export const login = async (email, password) => {
    if (!email || !password) {
        Alert.alert("Error", "Email dan password harus diisi!");
        return null;
    }

    try {
        console.log("📤 Mengirim data login:", { email, password });

        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await parseResponse(response);
        console.log(`✅ [LOGIN] Status: ${response.status}, Headers:`, response.headers);
        console.log("📩 Response Body:", data);

        if (!response.ok) {
            throw new Error(data?.error || "Login gagal. Periksa kembali email dan password.");
        }

        return data;
    } catch (error) {
        console.error("❌ Error saat login:", error);
        Alert.alert("Error", error.message);
        return null;
    }
};

export const register = async (name, email, password) => {
    if (!name || !email || !password) {
        Alert.alert("Error", "Semua kolom harus diisi!");
        return null;
    }

    try {
        console.log("📤 Mengirim data registrasi:", { name, email, password });

        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await parseResponse(response);
        console.log(`✅ [REGISTER] Status: ${response.status}, Headers:`, response.headers);
        console.log("📩 Response Body:", data);

        if (!response.ok) {
            throw new Error(data?.error || "Registrasi gagal. Coba lagi.");
        }

        return data;
    } catch (error) {
        console.error("❌ Error saat register:", error);
        Alert.alert("Error", error.message);
        return null;
    }
};
