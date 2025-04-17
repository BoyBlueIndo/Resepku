import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { API_MENU_URL } from "../../config/config";
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const MenuList = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMenuList = async () => {
      try {
        const response = await fetch(API_MENU_URL);
        const data = await response.json();

        if (response.ok) {
          setMenus(data.menus || []); // Pastikan tetap array jika undefined
        } else {
          alert("Failed to load menu");
        }
      } catch (error) {
        alert("Error while loading the menu");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuList();
  }, []);

  const handleMenuPress = (menuId) => {
    navigation.navigate('MenuDetail', { menuId });
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Menu List</Text>

      {Array.isArray(menus) && menus.length === 0 ? (
        <Text style={styles.noDataText}>No menu available.</Text>
      ) : (
        <FlatList
          data={menus || []}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuPress(item._id)}
            >
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.menuImage}
              />
              <View style={styles.menuDetails}>
                <Text style={styles.menuName}>{item.name}</Text>
                <Text style={styles.menuPrice}>Rp {item.price}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
  },
  menuItem: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    elevation: 3,
  },
  menuImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  menuDetails: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  menuName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuPrice: {
    fontSize: 16,
    color: '#888',
  },
});

export default MenuList;
