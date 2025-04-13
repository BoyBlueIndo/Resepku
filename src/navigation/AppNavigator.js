import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import UserHome from "../screens/user/UserHome";
import AdminDashboard from "../screens/admin/AdminDashboard";
import ManageUsers from "../screens/admin/ManageUsers";
import MenuList from "../screens/user/MenuList";
import AddMenu from "../screens/admin/AddMenu";
import EditMenu from "../screens/admin/EditMenu";
import MenuDetail from "../screens/user/MenuDetail";
import TipsScreen from '../screens/info/TipsScreen';
import DietScreen from '../screens/info/DietScreen';
import MudahScreen from '../screens/info/MudahScreen';
import InfoScreen from '../screens/user/InfoScreen';
import FavoriteMenu from "../screens/user/FavoriteMenu"; // Sesuaikan path sesuai lokasi file FavoriteMenu.js


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="UserHome" component={UserHome} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="ManageUsers" component={ManageUsers} />
        <Stack.Screen name="MenuList" component={MenuList} />
        <Stack.Screen name="AddMenu" component={AddMenu} options={{ title: "Tambah Menu" }} />
        <Stack.Screen name="EditMenu" component={EditMenu} options={{ title: "Edit Menu" }} />
        <Stack.Screen name="MenuDetail" component={MenuDetail} />       
        <Stack.Screen name="Tips" component={TipsScreen} />
        <Stack.Screen name="Diet" component={DietScreen} />
        <Stack.Screen name="Mudah" component={MudahScreen} />
        <Stack.Screen name="Info" component={InfoScreen} />
        <Stack.Screen name="FavoriteMenu" component={FavoriteMenu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
