import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const API_URL = "http://192.168.1.5:3000/api/menu";

const AdminDashboard = ({ navigation }) => {
  const [menus, setMenus] = useState([]);

  const fetchMenus = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setMenus(data);
    } catch (error) {
      console.error("Gagal mengambil data menu:", error);
    }
  };

  const deleteMenu = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      Alert.alert("Berhasil", "Menu berhasil dihapus");
      fetchMenus();
    } catch (error) {
      console.error("Gagal menghapus menu:", error);
      Alert.alert("Error", "Gagal menghapus menu");
    }
  };

  // Gunakan useFocusEffect untuk refresh saat kembali ke halaman ini
  useFocusEffect(
    useCallback(() => {
      fetchMenus();
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>
        {item.nama} - Rp {item.harga}
      </Text>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => navigation.navigate("EditMenu", { menu: item })}
          style={styles.editBtn}
        >
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              "Konfirmasi",
              "Yakin ingin menghapus menu ini?",
              [
                { text: "Batal", style: "cancel" },
                { text: "Hapus", style: "destructive", onPress: () => deleteMenu(item._id) },
              ]
            )
          }
          style={styles.deleteBtn}
        >
          <Text style={styles.btnText}>Hapus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddMenu")}
      >
        <Text style={styles.addButtonText}>+ Tambah Menu</Text>
      </TouchableOpacity>
      <FlatList
        data={menus}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>Belum ada menu.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  addButton: {
    backgroundColor: "#90ee90",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15,
  },
  addButtonText: { fontSize: 16, fontWeight: "bold" },
  itemContainer: {
    padding: 15,
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    marginBottom: 10,
  },
  itemText: { fontSize: 18, marginBottom: 5 },
  actions: { flexDirection: "row", justifyContent: "space-between" },
  editBtn: {
    backgroundColor: "#87ceeb",
    padding: 8,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },
  deleteBtn: {
    backgroundColor: "#f08080",
    padding: 8,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  },
  btnText: {
    fontWeight: "bold",
    color: "#fff",
  },
});

export default AdminDashboard;
