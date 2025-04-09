import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";


const API_URL = `${API_BASE_URL}/menu`;

const MenuList = ({ navigation }) => {
  const [menus, setMenus] = useState([]);
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [minHarga, setMinHarga] = useState("");
  const [maxHarga, setMaxHarga] = useState("");
  const [selectedKategori, setSelectedKategori] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchMenus = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setMenus(data);
      setFilteredMenus(data);
    } catch (error) {
      console.error("Gagal mengambil menu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  useEffect(() => {
    const filtered = menus.filter((menu) => {
      const namaCocok = menu.nama.toLowerCase().includes(searchQuery.toLowerCase());
      const harga = parseInt(menu.harga);
      const min = parseInt(minHarga);
      const max = parseInt(maxHarga);
      const hargaCocok = (!minHarga || harga >= min) && (!maxHarga || harga <= max);
      const kategoriCocok = selectedKategori === "" || menu.kategori === selectedKategori;

      return namaCocok && hargaCocok && kategoriCocok;
    });
    setFilteredMenus(filtered);
  }, [searchQuery, minHarga, maxHarga, selectedKategori, menus]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("MenuDetail", item)}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.nama}</Text>
        <Text style={styles.harga}>Rp {item.harga}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00aa00" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daftar Menu</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Cari menu..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.filterRow}>
        <TextInput
          style={styles.filterInput}
          placeholder="Harga Min"
          keyboardType="numeric"
          value={minHarga}
          onChangeText={setMinHarga}
        />
        <TextInput
          style={styles.filterInput}
          placeholder="Harga Max"
          keyboardType="numeric"
          value={maxHarga}
          onChangeText={setMaxHarga}
        />
      </View>

      {/* Filter Kategori */}
      <View style={styles.kategoriRow}>
        {["", "Sarapan", "Utama", "Dessert", "Snack"].map((kategori) => (
          <TouchableOpacity
            key={kategori}
            style={[
              styles.kategoriButton,
              selectedKategori === kategori && styles.kategoriButtonSelected,
            ]}
            onPress={() => setSelectedKategori(kategori)}
          >
            <Text
              style={[
                styles.kategoriText,
                selectedKategori === kategori && styles.kategoriTextSelected,
              ]}
            >
              {kategori === "" ? "Semua" : kategori}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredMenus}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>Tidak ada menu ditemukan.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  filterInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  kategoriRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  kategoriButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#E0E0E0",
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  kategoriButtonSelected: {
    backgroundColor: "#00aa00",
  },
  kategoriText: {
    color: "#000",
    fontWeight: "500",
  },
  kategoriTextSelected: {
    color: "#fff",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    overflow: "hidden",
    paddingRight: 10,
  },
  image: {
    width: 120,
    height: 110,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  title: {
    marginLeft: 16,
    fontSize: 18,
    fontWeight: "500",
  },
  harga: {
    marginLeft: 16,
    fontSize: 14,
    color: "green",
    marginTop: 4,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MenuList;
