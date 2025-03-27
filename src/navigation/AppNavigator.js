import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import UserHome from "../screens/user/UserHome";
import AdminDashboard from "../screens/admin/AdminDashboard";
import ManageUsers from "../screens/admin/ManageUsers";

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="UserHome" component={UserHome} />
                <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
                <Stack.Screen name="ManageUsers" component={ManageUsers} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
