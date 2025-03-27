import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ManageUsers = () => {
    return (
        <View style={styles.container}>
            <Text>Manage Users Page</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});

export default ManageUsers;
