import React, { createContext, useState } from "react";
import { Alert } from "react-native";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const handleLogin = async (email, password) => {
        try {
            const response = await fetch("http://10.0.2.2:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data.user);
                return true;
            } else {
                Alert.alert("Login Gagal", data.msg || "Email atau password salah.");
                return false;
            }
        } catch (error) {
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
