import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { API_GET_FAVORITES_URL } from "../../config/config";

const FavoriteMenu = ({ navigation }) => {
    const { userInfo } = useContext(AuthContext);
    const userId = userInfo?._id;    

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    fetch(API_GET_FAVORITES_URL(userId))
      .then((res) => res.json())
      .then((data) => setFavorites(data))
      .catch((err) => console.error("Error fetching favorites:", err))
      .finally(() => setLoading(false));
  }, [userId]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("MenuDetail", {
          menuId: item._id,
          nama: item.nama,
          deskripsi: item.deskripsi,
          image: item.image,
          videoUrl: item.videoUrl,
        })
      }
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.nama}</Text>
        {item.harga != null && <Text style={styles.price}>Rp {item.harga}</Text>}
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!favorites.length) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Belum ada menu favorit.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 16, color: "#555" },
  card: {
    flexDirection: "row",
    marginBottom: 12,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    overflow: "hidden",
  },
  image: { width: 80, height: 80 },
  info: { flex: 1, padding: 8, justifyContent: "center" },
  name: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  price: { fontSize: 14, color: "#888" },
});

export default FavoriteMenu;
