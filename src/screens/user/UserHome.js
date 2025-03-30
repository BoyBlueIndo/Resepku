import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { AuthContext } from "../../context/AuthContext";


const UserHome = ({ navigation }) => {
    const { user, logout } = useContext(AuthContext);

    useEffect(() => {
        console.log("👤 Data User:", user);
        if (!user) {
            navigation.replace("Login");
        }
    }, [user]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome, {user?.name || "User"}!</Text>
            <Button title="Logout" onPress={logout} />
        </View>
    );
};


export default UserHome;
