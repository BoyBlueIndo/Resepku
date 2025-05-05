import React, { createContext, useState, useEffect } from 'react';
import { Alert } from "react-native";
import { API_LOGIN_URL } from "../config/config";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  // Cek status login saat app dibuka
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const storedUserInfo = await AsyncStorage.getItem('userInfo');
        console.log("Stored user info in AuthContext:", storedUserInfo); // Debug log
        if (storedUserInfo) {
          setUserInfo(JSON.parse(storedUserInfo));
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch(API_LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        if (!data.user || !data.user.role) {
          Alert.alert("Error", "Role pengguna tidak ditemukan.");
          return false;
        }

        const userData = {
          token: data.token,
          role: data.user.role,
          _id: data.user._id,
        };

        setUserInfo(userData);
        await AsyncStorage.setItem('userInfo', JSON.stringify(userData)); // Simpan lengkap

        return data.user.role; // Return role untuk digunakan di LoginScreen
      } else {
        const data = await response.json();
        Alert.alert("Login Gagal", data.msg || "Email atau password salah.");
        return false;
      }
    } catch (error) {
      Alert.alert("Error", "Gagal menghubungi server.");
      return false;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userInfo'); // Hapus semua info user
      setUserInfo(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ userInfo, handleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
