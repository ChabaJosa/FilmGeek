import React, { useContext } from "react";
import { StyleSheet, Text, View, BackHandler } from "react-native";
import { Image } from "react-native-elements";
import {
  DrawerItem,
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
//
import HomeStackScreen from "./HomeStack";
import ProfileStackScreen from "./ProfileStack";
import { Context } from "../Context/AppProvider";
//
const DrawerStack = createDrawerNavigator();
//
const DrawerContent = (props) => {
  const { logoutProfile, state } = useContext(Context);
  let name = [];
  if (state.data.name != undefined) {
    name = state.data.name.split(" ");
  }
  //
  function goHome() {
    props.navigation.navigate("Home", { screen: "Home" });
  }
  //
  function goNotifications() {
    props.navigation.navigate("Notification");
  }
  //
  function goProfile() {
    props.navigation.navigate("DrawerProfile");
  }
  //
  async function logoutHelper() {
    try {
      await logoutProfile();
    } catch (err) {}
  }
  //
  let DateString = new Date();
  //
  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={false}
      contentContainerStyle={styles.flexOne}
    >
      <View style={styles.flexOne}>
        <View style={styles.flexContainer}>
          <Image
            source={require("../../assets/tony.png")}
            style={styles.avatar}
          />
          <Text style={styles.nameText}>
            Hi{" "}
            {state.data.name != undefined
              ? name[0].substr(0, 1) + name[0].substr(1, 10).toLowerCase()
              : "Tony"}
          </Text>
          <Text style={styles.dateText}>
            {`${String(DateString).substring(3, 15)}`}
          </Text>
        </View>
        <View>
          <DrawerItem
            label="Home"
            labelStyle={styles.drawerLabel}
            onPress={goHome}
            icon={() => <AntDesign name="home" color="white" size={16} />}
          />
          <DrawerItem
            label="Profile"
            labelStyle={styles.drawerLabel}
            onPress={goProfile}
            icon={() => <AntDesign name="phone" color="white" size={16} />}
          />
        </View>
      </View>

      <View>
        <DrawerItem
          label="Logout"
          labelStyle={styles.white}
          icon={() => <AntDesign name="logout" color="white" size={16} />}
          onPress={logoutHelper}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerScreen = () => {
  return (
    <LinearGradient style={styles.flexOne} colors={["#bbc6c7", "#00169e"]}>
      <DrawerStack.Navigator
        drawerType="slide"
        overlayColor="transparent"
        drawerStyle={styles.drawerStyles}
        contentContainerStyle={styles.flexOne}
        screenOptions={{
          activeBackgroundColor: "transparent",
          activeTintColor: "white",
          inactiveTintColor: "white",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          headerShown: false,
        }}
        sceneContainerStyle={{ backgroundColor: "transparent" }}
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <DrawerStack.Screen name="Main" component={HomeStackScreen} />
        <DrawerStack.Screen name="DrawerProfile" component={ProfileStackScreen} />
      </DrawerStack.Navigator>
    </LinearGradient>
  );
};

export default DrawerScreen;

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: "#FFF",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
  },
  drawerStyles: { flex: 1, width: "50%", backgroundColor: "transparent" },
  drawerItem: { alignItems: "flex-start", marginVertical: 0 },
  drawerLabel: { color: "white", marginLeft: -16 },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 16,
    borderColor: "white",
    borderWidth: 0.1,
  },
  flexOne: {
    flex: 1,
    backgroundColor: "black",
  },
  flexContainer: { flex: 0.4, margin: 20, justifyContent: "flex-end" },
  nameText: { color: "white", fontSize: 25 },
  dateText: { color: "white", fontSize: 9 },
  white: { color: "white" },
});
