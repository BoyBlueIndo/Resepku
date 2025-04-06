import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { Video } from "expo-video";

// Fungsi untuk mengubah URL YouTube jadi embed
const convertYoutubeUrlToEmbed = (url) => {
  if (!url) return "";
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

const MenuDetail = ({ route }) => {
  const { nama, deskripsi, image, videoUrl } = route.params || {};
  const isYoutubeLink =
    videoUrl?.includes("youtube.com") || videoUrl?.includes("youtu.be");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{nama || "Nama tidak tersedia"}</Text>

      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Text>Gambar tidak tersedia</Text>
      )}

      <Text style={styles.description}>
        {deskripsi || "Deskripsi tidak tersedia"}
      </Text>

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
        source={{ uri: menu.video }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        useNativeControls
        style={{ width: '100%', height: 200 }}


          />
        )
      ) : (
        <Text>Video tidak tersedia</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
    color: "#555",
  },
  videoContainer: {
    height: 200,
    width: "100%",
    marginBottom: 20,
  },
  webview: {
    flex: 1,
  },
  video: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
});

export default MenuDetail;
