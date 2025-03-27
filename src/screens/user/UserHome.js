import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../../components/Header";

const UserHome = () => {
    return (
        <View style={styles.container}>
            <Header title="User Home" />
            <Text>Selamat datang di Home User</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});

export default UserHome;
