import { registerRootComponent } from "expo";
import React from "react";
import { AuthProvider } from "./src/context/AuthContext";
import AppNavigator from "./src/navigation/AppNavigator";

const App = () => {
    return (
        <AuthProvider>
            <AppNavigator />
        </AuthProvider>
    );
};

// Mendaftarkan komponen utama
registerRootComponent(App);

export default App;
