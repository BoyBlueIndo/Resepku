import React, { createContext, useState } from "react";
import { Alert } from "react-native";

const AuthContext = createContext();

const API_URL = "http://192.168.1.5:3000/api/auth";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const handleLogin = async (email, password) => {
        try {
            console.log("🔄 Mengirim request ke:", `${API_URL}/login`);
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
            console.log("✅ Response dari server:", data);
            console.log("👉 role dari respons:", data?.user?.role);
    
            if (response.ok) {
                const userRole = data?.user?.role;
    
                if (!userRole) {
                    Alert.alert("Error", "Role tidak ditemukan dalam response.");
                    return false;
                }
    
                const userData = {
                    token: data.token,
                    role: userRole,
                    userId: data.user?._id,
                };
    
                setUser(userData);
    
                return userRole === "admin" ? "admin" : "user";
            } else {
                Alert.alert("Login Gagal", data.msg || "Email atau password salah.");
                return false;
            }
        } catch (error) {
            console.error("❌ Fetch Error:", error);
            Alert.alert("Error", "Gagal menghubungi server.");
            return false;
        }
    };
    
    
    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };
