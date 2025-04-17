import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function InfoScreen({ route }) {
  const { type } = route.params;

  let content;
  switch (type) {
    case 'tips':
      content = 'Here are some cooking tips...';
      break;
    case 'diet':
      content = 'Recommended diet meals...';
      break;
    case 'mudah':
      content = 'Easy-to-make recipes...';
      break;
    default:
      content = 'Welcome to the Info Screen';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    fontSize: 18,
    color: '#333',
  },
});

export default InfoScreen;
