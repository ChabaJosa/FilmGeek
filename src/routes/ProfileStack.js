import React from "react";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../screens/profile";
import MenuIcon from "../components/MenuIcon";
const ProfileStack = createStackNavigator();
//
const ProfileStackScreen = (props) => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="Profile"
      component={Profile}
      options={({ navigation }) => {
        return {
          headerTitle: () => (
            <MenuIcon name={"Profile"} navigation={navigation} />
          ),
        };
      }}
    />
  </ProfileStack.Navigator>
);

export default ProfileStackScreen;
