import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";

const foodItems = [
    { id: 1, name: "Nasi Goreng", image: require("../../../assets/nasi_goreng.jpg") },
    { id: 2, name: "Ayam Bakar", image: require("../../../assets/menu1.jpg") },
    { id: 3, name: "Sate Ayam", image: require("../../../assets/menu2.jpg") },
    // Tambahkan item lainnya jika ada
];

const MenuList = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Daftar Menu</Text>
            <FlatList
                data={foodItems}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card}>
                        <Image source={item.image} style={styles.image} />
                        <Text style={styles.title}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#fff" },
    header: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
    card: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        backgroundColor: "#F0F0F0",
        borderRadius: 10,
        overflow: "hidden"
    },
    image: {
        width: 100,
        height: 80,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    title: {
        marginLeft: 16,
        fontSize: 18,
        fontWeight: "500",
        flexShrink: 1,
    }
});

export default MenuList;
