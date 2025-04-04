import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, ImageBackground } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { Ionicons } from '@expo/vector-icons';

const UserHome = ({ navigation }) => {
    const { user, logout } = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        if (!user) {
            navigation.replace("Login");
        }
    }, [user]);

    const foodItems = [
        { id: 1, name: "Nasi Goreng", image: require("../../../assets/nasi_goreng.jpg") },
        { id: 2, name: "Ayam Bakar", image: require("../../../assets/menu1.jpg") },
        { id: 3, name: "Sate Ayam", image: require("../../../assets/menu2.jpg") },
    ];

    const infoItems = [
        {
            id: 1,
            title: "Beberapa tips dalam memasak agar lebih memudahkan",
            image: require("../../../assets/tips.jpg"),
            type: "tips",
        },
        {
            id: 2,
            title: "Rekomendasi makanan diet",
            image: require("../../../assets/diet.jpg"),
            type: "diet",
        },
        {
            id: 3,
            title: "Rekomendasi makanan yang mudah untuk dibuat",
            image: require("../../../assets/mudah.jpg"),
            type: "mudah",
        },
    ];

    useEffect(() => {
        if (searchQuery) {
            const results = foodItems.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
            setFilteredItems(results);
        } else {
            setFilteredItems([]);
        }
    }, [searchQuery]);

    return (
        <ImageBackground source={require("../../../assets/image.png")} style={styles.backgroundImage}>
            <ScrollView style={styles.container}>
                {/* Header */}
                <View style={styles.headerContainer}>
                    <Image source={require("../../../assets/nasi_goreng.jpg")} style={styles.headerImage} />
                    <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                        <Text style={styles.logoutText}>Log out</Text>
                    </TouchableOpacity>
                    <View style={styles.overlay}>
                        <Text style={styles.headerTitle}>Nasi Goreng</Text>
                        <Text style={styles.headerSubtitle}>⏱ 15 Menit</Text>
                    </View>
                </View>
                
                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
                    <TextInput 
                        placeholder="Mau masak apa hari ini?" 
                        style={styles.searchInput} 
                        value={searchQuery} 
                        onChangeText={setSearchQuery} 
                    />
                </View>
                
                {/* Search Results */}
                {filteredItems.length > 0 && (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.searchResults}>
                        {filteredItems.map(item => (
                            <Image key={item.id} source={item.image} style={styles.recommendationImage} />
                        ))}
                    </ScrollView>
                )}

                {/* Categories */}
                <View style={styles.categoryContainer}>
                    {['Sarapan', 'Utama', 'Dessert', 'Snack'].map((category, index) => (
                        <TouchableOpacity key={index} style={styles.categoryButton}>
                            <Text style={styles.categoryText}>{category}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Recommended Menu */}
                <View style={styles.recommendationHeader}>
                    <Text style={styles.sectionTitle}>Menu Rekomendasi</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("MenuList")}>
                        <Text style={styles.moreButton}>Lebih banyak →</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recommendationContainer}>
                    <Image source={require("../../../assets/menu1.jpg")} style={styles.recommendationImage} />
                    <Image source={require("../../../assets/menu2.jpg")} style={styles.recommendationImage} />
                </ScrollView>
                
                {/* Other Information */}
                <Text style={styles.sectionTitle}>Informasi Lain</Text>
                <View style={styles.infoContainer}>
                    {infoItems.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.infoCard}
                            onPress={() => navigation.navigate("Info", { type: item.type })}
                        >
                            <Image source={item.image} style={styles.infoImage} />
                            <Text style={styles.infoText}>{item.title}</Text>
                            <Ionicons name="chevron-forward" size={24} color="black" style={styles.arrowIcon} />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#D9F99D" },
    backgroundImage: { flex: 1, resizeMode: "cover" },
    headerContainer: { position: "relative" },
    headerImage: { width: "100%", height: 200, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
    overlay: { position: "absolute", bottom: 20, left: 20 },
    headerTitle: { fontSize: 22, fontWeight: "bold", color: "#fff" },
    headerSubtitle: { fontSize: 16, color: "#fff" },
    logoutButton: { position: "absolute", top: 10, right: 10, backgroundColor: "#7AC74F", padding: 8, borderRadius: 5 },
    logoutText: { color: "#fff", fontWeight: "bold" },
    searchContainer: { flexDirection: "row", backgroundColor: "#F1F1F1", borderRadius: 10, margin: 15, padding: 10, alignItems: "center" },
    searchIcon: { marginRight: 10 },
    searchInput: { flex: 1 },
    searchResults: { flexDirection: "row", margin: 10 },
    categoryContainer: { flexDirection: "row", justifyContent: "space-around", marginHorizontal: 15, marginVertical: 10 },
    categoryButton: { backgroundColor: "#A7D397", padding: 10, borderRadius: 10 },
    categoryText: { fontWeight: "bold" },
    recommendationHeader: { flexDirection: "row", justifyContent: "space-between", marginHorizontal: 15, marginTop: 10 },
    sectionTitle: { fontSize: 18, fontWeight: "bold", marginHorizontal: 15 },
    moreButton: { fontSize: 16, fontWeight: "bold", color: "#007AFF" },
    recommendationContainer: { flexDirection: "row", marginHorizontal: 15, marginVertical: 10 },
    recommendationImage: { width: 150, height: 100, borderRadius: 10, marginRight: 10 },

    // Updated styles for Informasi Lain
    infoContainer: { paddingHorizontal: 15, marginBottom: 20 },
    infoCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F1F1F1",
        padding: 18,
        borderRadius: 10,
        marginBottom: 10,
    },
    infoImage: {
        width: 150,
        height: 100,
        borderRadius: 5,
        marginRight: 15,
    },
    infoText: {
        flex: 1,
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    arrowIcon: {
        marginLeft: 10,
    },
});

export default UserHome;
