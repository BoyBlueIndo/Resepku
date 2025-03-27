import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { register } from "../api/auth";

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onRegister = async () => {
        const result = await register(name, email, password);
        if (result?.msg) {
            alert("Registrasi Berhasil! Silakan Login.");
            navigation.navigate("Login");
        }
    };

    return (
        <View style={styles.container}>
            <Text>Register</Text>
            <TextInput placeholder="Name" value={name} onChangeText={setName} />
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} />
            <Button title="Register" onPress={onRegister} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});

export default RegisterScreen;
