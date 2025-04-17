import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

const DietScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🥗 Rekomendasi Makanan Diet (Sehat & Lezat)</Text>
      <Text style={styles.text}>• Salad Ayam Panggang</Text>
      <Text style={styles.text}>• Oatmeal dengan buah segar</Text>
      <Text style={styles.text}>• Tumis sayuran dan tahu/tempe</Text>
      <Text style={styles.text}>• Sup bening sayur atau ayam</Text>
      <Text style={styles.text}>• Smoothie hijau</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  text: { fontSize: 16, marginBottom: 10 },
});

export default DietScreen;
