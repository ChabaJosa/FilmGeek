import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Image, Icon } from "react-native-elements";

const { height, width } = Dimensions.get("screen");

const MenuIcon = ({ navigation, name, darkMode, leftMargin }) => {
  //
  function toggleHelper() {
    navigation.navigate("Profile");
  }
  //
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? "black" : "white" },
      ]}
    >
      <View style={[styles.firstView, { marginLeft: leftMargin }]}>
        <Text style={{ color: darkMode ? "white" : "black" }}>{name}</Text>
      </View>
      <View style={[styles.secondView]}>
        <Icon
          name="person"
          color={darkMode ? "white" : "black"}
          onPress={toggleHelper}
        />
      </View>
    </View>
  );
};

export default MenuIcon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    minWidth: "100%",
    // width: width,
  },
  firstView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    // borderColor: "yellow",
    // borderWidth: 1,
  },
  secondView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    // color: "green",
    // borderWidth: 1,
  },
});
