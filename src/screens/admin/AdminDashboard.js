import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../../components/Header";

const AdminDashboard = () => {
    return (
        <View style={styles.container}>
            <Header title="Admin Dashboard" />
            <Text>Selamat datang di Dashboard Admin</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});

export default AdminDashboard;
