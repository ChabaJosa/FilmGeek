import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
//
import HomeScreen from "../screens/Home";
import MenuIcon from "../components/MenuIcon";
import Details from "../screens/details";
import TitleRate from "../screens/TitleRate";

const HomeStack = createStackNavigator();

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
    screenOptions={{
      gestureEnabled: true,
      gestureDirection: "horizontal",
      headerStyle: {
        height: 100,
        // borderColor: "green",
        // borderWidth: 0.5, 
        backgroundColor: "black",
        shadowColor: "transparent",
        shadowRadius: 0,
        shadowOffset: {
          height: 0,
        },
      },
      // headerShown: false,
    }}
  >
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={({ navigation }) => {
        return {
          headerTitle: () => (
            <MenuIcon name={"Home"} navigation={navigation} darkMode={true} />
          ),
        };
      }}
    />
    <HomeStack.Screen
      name="Movie-Details"
      component={Details}
      options={({ navigation }) => {
        return {
          headerTitle: () => (
            <MenuIcon
              name={"Movie Details"}
              navigation={navigation}
              darkMode={true}
            />
          ),
          headerTintColor: "white",
        };
      }}
    />
    <HomeStack.Screen
      name="Title-Rate"
      component={TitleRate}
      options={({ navigation }) => {
        return {
          headerTitle: () => (
            <MenuIcon
              name={"Title Rate"}
              navigation={navigation}
              darkMode={true}
            />
          ),
          headerTintColor: "white",
          headerLeft: () => null,
          // headerStyle:{ borderColor: 'transparent'},
          // headerLeftContainerStyle: { color: "white" },
          // headerLeftContainerStyle: { maxWidth: 0 },
        };
      }}
    />
  </HomeStack.Navigator>
);

export default HomeStackScreen;
