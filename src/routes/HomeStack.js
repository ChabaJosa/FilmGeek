import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//
import HomeScreen from "../Home";
import MenuIcon from "../components/MenuIcon";

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
            <MenuIcon name={"Home"} navigation={navigation} darkMode={true} />
          ),
        };
      }}
    />
  </HomeStack.Navigator>
);

export default HomeStackScreen;
