import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Image, Icon } from "react-native-elements";

const MenuIcon = ({ navigation, name, logo, background }) => {
  //
  function toggleHelper() {
    navigation.toggleDrawer();
  }
  //
  return (
    <>
      {logo ? (
        <View
          style={[
            styles.container,
            { backgroundColor: background ? `${background}` : "white" },
          ]}
        >
          <View style={styles.firstView}>
            <Icon
              name="menu"
              color={background ? "white" : "black"}
              onPress={toggleHelper}
            />
          </View>
          <View style={(styles.secondView, {})}>
            <Image
              source={require("../../assets/yoda.jpg")}
              style={styles.logoDesign}
              resizeMode="contain"
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
        </View>
      ) : (
        <View
          style={[styles.container, { color: background ? "white" : "black" }]}
        >
          <View style={styles.firstView}>
            <Icon
              name="menu"
              color={background ? "white" : "black"}
              onPress={toggleHelper}
            />
          </View>
          <View style={[styles.secondView, styles.secondViewB]}>
            <Text style={{ color: background ? "white" : "black" }}>
              {name}
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

export default MenuIcon;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    minWidth: "100%",
    flex: 1,
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
  secondViewB: {
    marginRight: "25%",
  },
  logoDesign: {
    width: 160,
    height: 40,
    marginRight: "30.333%",
  },
});
