import { API_BASE_URL } from '../../config/config';
import React, { useState, useCallback, useContext } from "react";
import { API_MENU_URL } from "../../config/config";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";

const AdminDashboard = ({ navigation }) => {
  const [menus, setMenus] = useState([]);
  const { logout } = useContext(AuthContext);

  const fetchMenus = async () => {
    try {
      const response = await fetch(API_MENU_URL); // ✅ sekarang /api/menu
      const data = await response.json();
      setMenus(data);
    } catch (error) {
      console.error("Gagal mengambil data menu:", error);
    }
  };
  

  const deleteMenu = async (id) => {
    try {
      await fetch(`${API_MENU_URL}/${id}`, {
        method: "DELETE",
      });
      Alert.alert("Berhasil", "Menu berhasil dihapus");
      fetchMenus(); // Refresh list setelah hapus
    } catch (error) {
      console.error("Gagal menghapus menu:", error);
      Alert.alert("Error", "Gagal menghapus menu");
    }
  };
  

  useFocusEffect(
    useCallback(() => {
      fetchMenus();
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.row}>
      <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.itemText}>{item.nama}</Text>
          <Text style={styles.itemPrice}>Rp {item.harga}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => navigation.navigate("EditMenu", { menu: item })}
          style={styles.editBtn}
        >
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Alert.alert("Konfirmasi", "Yakin ingin menghapus menu ini?", [
              { text: "Batal", style: "cancel" },
              {
                text: "Hapus",
                style: "destructive",
                onPress: () => deleteMenu(item._id),
              },
            ])
          }
          style={styles.deleteBtn}
        >
          <Text style={styles.btnText}>Hapus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleLogout = () => {
    Alert.alert("Logout", "Yakin ingin keluar?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Keluar",
        style: "destructive",
        onPress: () => {
          logout();
          navigation.replace("Login");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Admin Dashboard</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: { fontSize: 24, fontWeight: "bold" },
  logoutBtn: {
    backgroundColor: "#FF6347",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  logoutText: { color: "#fff", fontWeight: "bold" },
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: "#ddd",
  },
  textContainer: {
    flex: 1,
  },
  itemText: { fontSize: 18, fontWeight: "bold" },
  itemPrice: { fontSize: 16, color: "#666" },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
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
