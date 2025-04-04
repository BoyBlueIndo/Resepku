import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { handleLogin } = useContext(AuthContext);

    const onLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Email dan Password harus diisi!");
            return;
        }
    
        try {
            const role = await handleLogin(email, password);

            if (role === "admin") {
                console.log("🔀 Navigasi ke AdminDashboard...");
                navigation.replace("AdminDashboard");
            } else if (role === "user") {
                console.log("🔀 Navigasi ke UserHome...");
                navigation.replace("UserHome");
            } else {
                Alert.alert("Error", "Role tidak dikenali.");
            }
            
        } catch (error) {
            console.error("Error saat login:", error);
            Alert.alert("Error", "Terjadi kesalahan saat login.");
        }
    };
    

    return (
        <ImageBackground source={require("../../assets/image.png")} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>LOGIN</Text>
                <TextInput
                    style={styles.input}
                    placeholder="EMAIL"
                    placeholderTextColor="#333"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="PASSWORD"
                    placeholderTextColor="#333"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity style={styles.button} onPress={onLogin}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
                <Text style={styles.linkText}>
                    Don’t have an account?{" "}
                    <Text style={styles.link} onPress={() => navigation.navigate("Register")}>
                        Register
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

export default LoginScreen;
