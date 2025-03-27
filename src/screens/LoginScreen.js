import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { AuthContext } from "../context/AuthContext";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { handleLogin } = useContext(AuthContext);

    return (
        <View>
            <Text>Login</Text>
            <TextInput 
                placeholder="Email" 
                value={email} 
                onChangeText={setEmail} 
            />
            <TextInput 
                placeholder="Password" 
                value={password} 
                secureTextEntry 
                onChangeText={setPassword} 
            />
            <Button title="Login" onPress={() => handleLogin(email, password)} />
        </View>
    );
};

export default LoginScreen;
