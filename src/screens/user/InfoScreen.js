// screens/User/InfoScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InfoScreen = ({ route }) => {
  const { type } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informasi: {type}</Text>
      {/* tampilkan konten sesuai 'type' */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
});

export default InfoScreen;

