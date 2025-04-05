import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const API_URL = "http://192.168.1.9:3000/api/menu";


const AddMenu = ({ navigation }) => {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // Minta permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission diperlukan', 'Akses ke galeri diperlukan untuk memilih gambar.');
      return;
    }
  
    // Buka galeri
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.IMAGE,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
  
    if (!result.canceled && result.assets?.length > 0) {
      setImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  };
  

  const handleSubmit = async () => {
    if (!nama || !harga || !deskripsi || !videoUrl || !image) {
      Alert.alert("Error", "Semua data harus diisi!");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nama, harga, deskripsi, videoUrl, image }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Sukses", "Menu berhasil ditambahkan");
        navigation.goBack();
      } else {
        Alert.alert("Gagal", data.msg || "Gagal menambahkan menu");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      Alert.alert("Error", "Terjadi kesalahan saat menambahkan menu");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tambah Menu</Text>

      <TextInput
        style={styles.input}
        placeholder="Nama Menu"
        value={nama}
        onChangeText={setNama}
      />
      <TextInput
        style={styles.input}
        placeholder="Harga"
        value={harga}
        onChangeText={setHarga}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Deskripsi"
        value={deskripsi}
        onChangeText={setDeskripsi}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Link Video YouTube"
        value={videoUrl}
        onChangeText={setVideoUrl}
      />

      <TouchableOpacity style={styles.pickBtn} onPress={pickImage}>
        <Text>Pilih Gambar</Text>
      </TouchableOpacity>

      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 150, marginTop: 10 }}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Tambah</Text>
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
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  pickBtn: {
    backgroundColor: "#dcdcdc",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#90ee90",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { fontSize: 16, fontWeight: "bold" },
});

export default AddMenu;
