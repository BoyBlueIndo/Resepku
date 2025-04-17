import React, { createContext, useState, useEffect } from 'react';
import { Alert } from "react-native";
import { API_LOGIN_URL } from "../config/config";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  // Cek status login ketika aplikasi dimulai
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          // Jika token ditemukan, simpan ke state userInfo
          setUserInfo({ token });
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
        console.log(data); // Menampilkan data yang diterima

        if (!data.user || !data.user.role) {
          Alert.alert("Error", "Role pengguna tidak ditemukan.");
          return false;
        }

        const userRole = data.user.role;
        const userData = {
          token: data.token,
          role: userRole,
          _id: data.user._id,
        };

        setUserInfo(userData);
        await AsyncStorage.setItem('userToken', data.token);

        return userRole; // Return role to use in LoginScreen
      } else {
        const data = await response.json();
        Alert.alert("Login Gagal", data.msg || "Email atau password salah.");
        return false;
      }
    } catch (error) {
      Alert.alert("Error", "Gagal menghubungi server.");
      return false;
    }
  }

  const logout = async () => {
    try {
      // Hapus token dari AsyncStorage saat logout
      await AsyncStorage.removeItem('userToken');
      setUserInfo(null); // Menghapus userInfo dari state
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
