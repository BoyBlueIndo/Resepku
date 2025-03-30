import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from "react-native";
import { register } from "../api/auth";

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onRegister = async () => {
        console.log("Tombol Register ditekan!");
    
        if (!name || !email || !password) {
            Alert.alert("Error", "Semua kolom harus diisi!");
            return;
        }
    
        try {
            const result = await register(name, email, password);
            console.log("Hasil Register:", result); // Debugging
    
            if (result?.msg) {
                Alert.alert("Sukses", "Registrasi Berhasil! Silakan Login.", [
                    { text: "OK", onPress: () => navigation.navigate("Login") },
                ]);
            } else {
                console.log("Error Response:", result); // Debugging
                Alert.alert("Gagal", result?.error || "Registrasi gagal. Coba lagi.");
            }
        } catch (error) {
            console.error("Error saat registrasi:", error);
            Alert.alert("Error", "Terjadi kesalahan. Coba lagi.");
        }
    };
    

    return (
        <ImageBackground source={require("../../assets/image.png")} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>REGISTER</Text>
                <TextInput style={styles.input} placeholder="NAMA" placeholderTextColor="#333" value={name} onChangeText={setName} />
                <TextInput style={styles.input} placeholder="EMAIL" placeholderTextColor="#333" value={email} onChangeText={setEmail} keyboardType="email-address" />
                <TextInput style={styles.input} placeholder="PASSWORD" placeholderTextColor="#333" secureTextEntry value={password} onChangeText={setPassword} />
                <TouchableOpacity style={styles.button} onPress={onRegister}>
                    <Text style={styles.buttonText}>REGISTER</Text>
                </TouchableOpacity>
                <Text style={styles.linkText}>
                    Already have an account?{" "}
                    <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
                        Login
                    </Text>
                </Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: { flex: 1, resizeMode: "cover", justifyContent: "center" },
    container: { backgroundColor: "#C4E7B6", padding: 20, marginHorizontal: 30, borderRadius: 10, alignItems: "center", elevation: 5 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#000" },
    input: { width: "100%", height: 50, backgroundColor: "#fff", borderRadius: 5, paddingHorizontal: 15, marginBottom: 10, fontSize: 16 },
    button: { backgroundColor: "#F4C2C2", paddingVertical: 12, width: "100%", borderRadius: 5, alignItems: "center", marginBottom: 10 },
    buttonText: { color: "#000", fontSize: 18, fontWeight: "bold" },
    linkText: { fontSize: 14, color: "#333" },
    link: { fontWeight: "bold", color: "#000" },
});

export default RegisterScreen;
