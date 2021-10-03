import React, { useContext } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
//
import HomeStackScreen from "./HomeStack";
import ProfileScreen from "../screens/profile";
import TitleRateScreen from "../screens/TitleRate";
import { Context } from "../Context/AppProvider";

const TabStack = createBottomTabNavigator();

const TabScreen = () => {
  const { logoutProfile } = useContext(Context);

  return (
    <TabStack.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown:false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "whitesmoke",
        tabBarActiveBackgroundColor: "#ffc92b",
        tabBarItemStyle: { borderTopStartRadius: 16, borderTopEndRadius: 16 },
        tabBarStyle: [
          {
            display: "flex",
            backgroundColor: "black",
            borderTopWidth: 0,
          },
          null,
        ],
        tabBarBackground: () => (
          //   <BlurView
          //     tint="light"
          //     intensity={1000}
          //     style={StyleSheet.absoluteFill}
          //   />
          <View style={{ flex: 1, backgroundColor: "black" }} />
        ),
      }}
    >
      <TabStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="account"
              color={"whitesmoke"}
              size={24}
            />
          ),
        }}
      />
      <TabStack.Screen
        name="Search"
        component={HomeStackScreen}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="search-web"
              color={"whitesmoke"}
              size={24}
            />
          ),
        }}
      />
      <TabStack.Screen
        name="Rate"
        component={TitleRateScreen}
        options={{
          tabBarLabel: "Rate",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="popcorn"
              color={"whitesmoke"}
              size={24}
            />
          ),
        }}
      />
      <TabStack.Screen
        name="Logout"
        component={HomeStackScreen}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={async () => {
                //
                await logoutProfile();
              }}
            />
          ),
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="logout"
              color={"whitesmoke"}
              size={24}
            />
          ),
        }}
      />
    </TabStack.Navigator>
  );
};
export default TabScreen;
