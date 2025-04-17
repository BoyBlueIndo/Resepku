import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

const MudahScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🍳 Rekomendasi Makanan yang Mudah Dibuat</Text>
      <Text style={styles.text}>• Telur orak-arik atau omelet</Text>
      <Text style={styles.text}>• Indomie + topping sehat</Text>
      <Text style={styles.text}>• Nasi goreng sederhana</Text>
      <Text style={styles.text}>• Roti lapis (sandwich)</Text>
      <Text style={styles.text}>• Pisang bakar / pisang keju</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  text: { fontSize: 16, marginBottom: 10 },
});

export default MudahScreen;
