import React, { createContext, useState } from "react";
import { Alert } from "react-native";

const AuthContext = createContext();

const API_URL = "http://10.0.2.2:5000/api/auth/login"; // Pastikan ini benar

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const handleLogin = async (email, password) => {
        try {
            console.log("🔄 Mengirim request ke:", API_URL);
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log("✅ Success:", data);

            if (response.ok) {
                setUser(data);
            } else {
                Alert.alert("Login Gagal", data.msg || "Terjadi kesalahan");
            }
        } catch (error) {
            console.error("❌ Fetch Error:", error);
            Alert.alert("Error", "Gagal menghubungi server");
        }
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };
