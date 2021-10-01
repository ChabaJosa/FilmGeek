import React, { useContext, useRef, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from 'firebase/app';
import 'firebase/firestore';
//
import Keys from "./src/constants/keys";
import * as RootNavigation from "./src/routes/RootNavigationRef";
import DrawerScreen from "./src/routes/DrawerStack";
import AuthStackScreen from "./src/routes/AuthStack";
import { Provider, Context } from "./src/Context/AppProvider";

const RootStack = createStackNavigator();

// Defines Authorization Hierarchy
const RootStackScreen = () => {
  const { state } = useContext(Context);
  //
  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed === true) {
      if (firebase.apps.length === 0) {
        firebase.initializeApp(Keys.FirebaseConfig);
        // const db = firebase.getFirestore();
        // console.log(db)
      }
      //
      // Else It's Already Initialized
      //
    }
    return () => (isSubscribed = false);
  }, []);
  //
  return (
    <RootStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
        headerShown: false,
      }}
    >
      {state.status ? (
        <RootStack.Screen name="App" component={DrawerScreen} />
      ) : (
        <RootStack.Screen
          name="Sign In and View Movies"
          component={AuthStackScreen}
        />
      )}
    </RootStack.Navigator>
  );
};

export default () => {
  return (
    <Provider>
      <NavigationContainer ref={RootNavigation.navigationRef}>
        <RootStackScreen />
      </NavigationContainer>
    </Provider>
  );
};
