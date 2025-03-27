import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const Sidebar = ({ navigation }) => {
    return (
        <View style={styles.sidebar}>
            <Button title="Dashboard" onPress={() => navigation.navigate("AdminDashboard")} />
            <Button title="Manage Users" onPress={() => navigation.navigate("ManageUsers")} />
        </View>
    );
};

const styles = StyleSheet.create({
    sidebar: {
        width: 200,
        backgroundColor: "#2c3e50",
        padding: 20,
    },
});

export default Sidebar;
