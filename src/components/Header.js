import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header = ({ title }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#3498db",
        padding: 15,
        alignItems: "center",
    },
    title: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default Header;
