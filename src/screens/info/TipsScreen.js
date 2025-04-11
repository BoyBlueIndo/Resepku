import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const TipsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>✅ Beberapa Tips dalam Memasak</Text>
      <Text style={styles.text}>• Persiapkan bahan terlebih dahulu (mise en place)</Text>
      <Text style={styles.text}>• Gunakan pisau yang tajam</Text>
      <Text style={styles.text}>• Cicipi masakan saat memasak</Text>
      <Text style={styles.text}>• Masak dengan api yang sesuai</Text>
      <Text style={styles.text}>• Bersihkan sambil masak</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  text: { fontSize: 16, marginBottom: 10 },
});

export default TipsScreen;
