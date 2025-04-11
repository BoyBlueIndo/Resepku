import React from 'react';
import { View, Text } from 'react-native';

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
    <View>
      <Text>{content}</Text>
    </View>
  );
}

export default InfoScreen;
