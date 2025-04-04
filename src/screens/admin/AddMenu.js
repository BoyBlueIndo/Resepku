import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

const API_URL = "http://192.168.1.5:3000/api/menu"; // Ganti sesuai URL backend kamu

const AddMenu = ({ navigation }) => {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");

  const handleSubmit = async () => {
    if (!nama || !harga) {
      return Alert.alert("Peringatan", "Nama dan Harga harus diisi");
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, harga }),
      });

      if (response.ok) {
        Alert.alert("Sukses", "Menu berhasil ditambahkan");
        navigation.goBack(); // kembali ke halaman sebelumnya
      } else {
        Alert.alert("Gagal", "Gagal menambahkan menu");
      }
    } catch (error) {
      console.error("Gagal tambah menu:", error);
      Alert.alert("Error", "Terjadi kesalahan");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tambah Menu</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Simpan</Text>
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
    backgroundColor: "#90ee90",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: { fontSize: 16, fontWeight: "bold" },
});

export default AddMenu;
