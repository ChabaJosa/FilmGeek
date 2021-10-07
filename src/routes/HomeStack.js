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
        backgroundColor: "black",
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
            <MenuIcon
              name={"Home"}
              navigation={navigation}
              darkMode={true}
              leftMargin={"23%"}
            />
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
              leftMargin={"12%"}
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
              leftMargin={"12%"}
            />
          ),
          headerTintColor: "white",
          // headerStyle:{ minWidth: 50} 
          // headerLeft: () => <View />,
          // headerLeftContainerStyle: { color: "white" },
          // headerLeftContainerStyle: { maxWidth: 0 },
        };
      }}
    />
  </HomeStack.Navigator>
);

export default HomeStackScreen;
