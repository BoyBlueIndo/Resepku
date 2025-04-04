import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const API_URL = "http://192.168.1.5:3000/api/menu"; // Ganti sesuai backend kamu

const EditMenu = ({ route, navigation }) => {
  const { menu } = route.params;
  const [nama, setNama] = useState(menu.nama);
  const [harga, setHarga] = useState(String(menu.harga));

  const handleUpdate = async () => {
    if (!nama || !harga) {
      return Alert.alert("Peringatan", "Nama dan Harga harus diisi");
    }

    try {
      const response = await fetch(`${API_URL}/${menu._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nama, harga }),
      });

      if (response.ok) {
        Alert.alert("Sukses", "Menu berhasil diperbarui");
        navigation.goBack();
      } else {
        Alert.alert("Gagal", "Gagal memperbarui menu");
      }
    } catch (error) {
      console.error("Gagal edit menu:", error);
      Alert.alert("Error", "Terjadi kesalahan saat memperbarui");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Menu</Text>
      <TextInput
        placeholder="Nama Menu"
        value={nama}
        onChangeText={setNama}
        style={styles.input}
      />
      <TextInput
        placeholder="Harga"
        value={harga}
        onChangeText={setHarga}
        keyboardType="numeric"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Simpan Perubahan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#87ceeb",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: { fontSize: 16, fontWeight: "bold", color: "#fff" },
});

export default EditMenu;
