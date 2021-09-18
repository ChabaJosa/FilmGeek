import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//
import Home from "../Home";
import IconMenu from "../components/MenuIcon";

const HomeStack = createStackNavigator();

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
    screenOptions={{
      gestureEnabled: true,
      gestureDirection: "horizontal",
      headerShown: false,
    }}
  >
    <HomeStack.Screen
      name="Home"
      component={Home}
      // options={({ navigation }) => {
      //   return {
      //     headerTitle: () => (
      //       <IconMenu navigation={navigation} name={"Home"} logo={true} />
      //     ),
      //   };
      // }}
    />
  </HomeStack.Navigator>
);

export default HomeStackScreen;
