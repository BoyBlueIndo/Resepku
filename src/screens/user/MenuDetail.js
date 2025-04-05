import React from "react";
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";

const MenuDetail = ({ route }) => {
  const { nama, deskripsi, image, videoUrl } = route.params;

  const extractYoutubeId = (url) => {
    const match = url.match(/(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  const videoId = extractYoutubeId(videoUrl);
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{nama}</Text>

      <Image source={{ uri: image }} style={styles.image} />

      <Text style={styles.subTitle}>Deskripsi</Text>
      <Text style={styles.text}>{deskripsi}</Text>

      <Text style={styles.subTitle}>Video</Text>
      {videoId ? (
        <WebView
          style={styles.video}
          javaScriptEnabled={true}
          source={{ uri: embedUrl }}
        />
      ) : (
        <Text>Tidak ada video tersedia.</Text>
      )}

      <TouchableOpacity
        onPress={() => Linking.openURL(videoUrl)}
        style={styles.linkBtn}
      >
        <Text style={styles.linkText}>Buka di YouTube</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  subTitle: { fontSize: 18, fontWeight: "bold", marginTop: 16, marginBottom: 8 },
  text: { fontSize: 16, color: "#333" },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
  },
  video: {
    height: 200,
    marginTop: 10,
  },
  linkBtn: {
    marginTop: 12,
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  linkText: {
    color: "#007AFF",
    fontWeight: "bold",
  },
});

export default MenuDetail;
