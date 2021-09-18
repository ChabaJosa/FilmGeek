import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../screens/SignIn";
// import Register from "../screens/register";

const AuthStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator
    screenOptions={{
      gestureEnabled: true,
      gestureDirection: "horizontal",
      headerShown: false,
    }}
  >
    <AuthStack.Screen name="SignIn" component={SignIn} />
    {/* <AuthStack.Screen
      name="Register"
      component={Register}
      options={{
        headerTitle: (props) => <Register {...props} />,
      }}
    />  */}
  </AuthStack.Navigator>
);

export default AuthStackScreen;
