import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
//
import HomeScreen from "../Home";
import MenuIcon from "../components/MenuIcon";
import Details from "../screens/details";

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
              rightMargin={"15%"}
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
              rightMargin={"-15%"}
            />
          ),
          headerLeft: () => <View />,
          headerLeftContainerStyle: { maxWidth: 0 },
        };
      }}
    />
  </HomeStack.Navigator>
);

export default HomeStackScreen;
