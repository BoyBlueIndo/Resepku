import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { WebView } from "react-native-webview";
import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../context/AuthContext"; // Import AuthContext
import {
  API_ADD_FAVORITE_URL,
  API_REMOVE_FAVORITE_URL,
  API_GET_FAVORITES_URL,
} from "../../config/config";

const convertYoutubeUrlToEmbed = (url) => {
  if (!url) return "";
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

const MenuDetail = ({ route }) => {
  const { user } = useContext(AuthContext); // Mengakses user dari AuthContext
  const userId = user?._id;  // Menggunakan userId dari state user

  const {
    menuId,
    nama = "Nama tidak tersedia",
    deskripsi = "Deskripsi tidak tersedia",
    image,
    videoUrl,
  } = route.params || {};

  const isYoutubeLink = videoUrl?.includes("youtube.com") || videoUrl?.includes("youtu.be");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!userId || !menuId) return;
    fetch(API_GET_FAVORITES_URL(userId))
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((m) => m._id === menuId);
        setIsFavorite(!!found);
      })
      .catch((err) => console.error("Fetch favorites error:", err));
  }, [userId, menuId]);

  const toggleFavorite = () => {
    if (!userId || !menuId) return Alert.alert("Error", "User atau menu tidak valid");
    const method = isFavorite ? "DELETE" : "POST";
    const url = isFavorite ? API_REMOVE_FAVORITE_URL : API_ADD_FAVORITE_URL;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, menuId }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Request gagal");
        return res.json();
      })
      .then(() => setIsFavorite(!isFavorite))
      .catch((err) => {
        console.error("Toggle favorite error:", err);
        Alert.alert("Error", "Gagal mengupdate favorit");
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{nama}</Text>
        <TouchableOpacity onPress={toggleFavorite} style={styles.iconButton}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={28}
            color="red"
          />
        </TouchableOpacity>
      </View>

      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Text style={styles.placeholder}>Gambar tidak tersedia</Text>
      )}

      <Text style={styles.description}>{deskripsi}</Text>

      {videoUrl ? (
        isYoutubeLink ? (
          <View style={styles.videoContainer}>
            <WebView
              source={{ uri: convertYoutubeUrlToEmbed(videoUrl) }}
              style={styles.webview}
              javaScriptEnabled
              domStorageEnabled
              allowsFullscreenVideo
            />
          </View>
        ) : (
          <Video
            source={{ uri: videoUrl }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay={false}
            useNativeControls
            style={styles.video}
          />
        )
      ) : (
        <Text style={styles.placeholder}>Video tidak tersedia</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#FFF" },
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 },
  title: { fontSize: 22, fontWeight: "bold", color: "#222", flex: 1 },
  iconButton: { marginLeft: 10 },
  image: { width: "100%", height: 200, borderRadius: 10, marginBottom: 10 },
  description: { fontSize: 16, marginBottom: 15, color: "#555" },
  placeholder: { fontSize: 14, fontStyle: "italic", color: "#999", marginBottom: 10 },
  videoContainer: { height: 200, width: "100%", borderRadius: 10, overflow: "hidden", marginBottom: 20 },
  webview: { flex: 1 },
  video: { width: "100%", height: 200, borderRadius: 10 },
});

export default MenuDetail;
