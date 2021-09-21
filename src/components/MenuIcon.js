import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Image, Icon } from "react-native-elements";

const { height, width } = Dimensions.get("screen");

const MenuIcon = ({ navigation, name, darkMode, rightMargin }) => {
  //
  function toggleHelper() {
    navigation.toggleDrawer();
  }
  //
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? "black" : "white" },
      ]}
    >
      <View style={styles.firstView}>
        <Icon
          name="menu"
          color={darkMode ? "white" : "black"}
          onPress={toggleHelper}
        />
      </View>
      <View style={[styles.secondView, { marginRight: rightMargin }]}>
        <Text style={{ color: darkMode ? "white" : "black" }}>{name}</Text>
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
    alignItems: "flex-start",
  },
  secondView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
