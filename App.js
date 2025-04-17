import React from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';  // Import NavigationContainer
import { AuthProvider } from './src/context/AuthContext'; // Import AuthProvider
import AppNavigator from './src/navigation/AppNavigator';  // Import your main AppNavigator

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />  {/* Your root navigator */}
      </NavigationContainer>
    </AuthProvider>
  );
};

// Mendaftarkan komponen utama
registerRootComponent(App);

export default App;
