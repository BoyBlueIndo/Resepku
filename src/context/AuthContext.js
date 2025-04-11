import React, { createContext, useState } from "react";
import { Alert } from "react-native";
import { API_LOGIN_URL } from "../config/config"; // pakai yang benar


const AuthContext = createContext();

// ✅ Diperbaiki: API_URL tanpa /login


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const handleLogin = async (email, password) => {
        try {
          console.log("🔄 Mengirim request ke:", API_LOGIN_URL);
            const response = await fetch(API_LOGIN_URL, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
            });

      
          const text = await response.text();
          console.log("🧾 Response mentah dari server:", text);
      
          let data;
          try {
            data = JSON.parse(text);
          } catch (jsonError) {
            console.error("🚨 Gagal parse JSON:", jsonError.message);
            Alert.alert("Error", "Response dari server bukan JSON.");
            return false;
          }
      
          console.log("✅ Response dari server:", data);
      
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
