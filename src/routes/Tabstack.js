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
  //
  return (
    <TabStack.Navigator
      initialRouteName={"Search"}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        // tabBarActiveTintColor: "black",
        // tabBarInactiveTintColor: "white",
        tabBarActiveBackgroundColor: "#ffc92b",
        tabBarItemStyle: {
          borderRadius: 16,
          // borderTopEndRadius: 16,
          paddingVertical: 4,
        },
        tabBarStyle: [
          {
            // display: "flex",
            // backgroundColor: "green",
            position: 'absolute',
            margin: 8,
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
          <View
            style={{
              flex: 1,
              backgroundColor: "black",
              borderColor: "#ffc92b",
              borderWidth: 1,
              borderRadius: 16,
            }}
          />
        ),
      }}
    >
      <TabStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          // tabBarLabel: "Profile",
          tabBarLabel:() => {return null},
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="account"
              color={"white"}
              size={24}
            />
          ),
        }}
      />
      <TabStack.Screen
        name="Search"
        component={HomeStackScreen}
        options={{
          // tabBarLabel: "Search", 
          tabBarLabel:() => {return null},
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="search-web"
              color={"white"}
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
          tabBarLabel:() => {return null},
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="logout"
              color={"white"}
              size={24}
            />
          ),
        }}
      />
    </TabStack.Navigator>
  );
};
export default TabScreen;
