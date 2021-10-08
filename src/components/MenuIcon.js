import React, { useContext } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Image, Icon } from "react-native-elements";
import { Context } from "../Context/AppProvider";

const MenuIcon = ({ navigation, name, darkMode }) => {
  //
  const { state } = useContext(Context);
  //
  function navHelper() {
    navigation.goBack();
  }
  //
  return (
    <View style={styles.container}>
      {name === "Home" ? (
        <>
          <View style={[styles.innerView, { maxWidth: 50, borderWidth: 0 }]}>
            {state.data.pic !== null ? (
              <>
                <Image
                  source={{
                    uri: state.data.pic,
                  }}
                  style={styles.avatar}
                />
              </>
            ) : (
              <>
                <Image
                  source={require("../../assets/tony.png")}
                  style={styles.avatar}
                />
              </>
            )}
          </View>
          <View style={styles.innerView}>
            <Text style={styles.topLabel}>Welcome</Text>
            <Text
              style={[
                styles.name,
                {
                  color: darkMode ? "white" : "black",
                },
              ]}
            >
              {state.data.name != undefined ? state.data.name : "New Guy"}
            </Text>
          </View>
        </>
      ) : (
        <>
          <View style={[styles.innerView, { maxWidth: 50, borderWidth: 0 }]}>
            <Icon
              name="chevron-left"
              size={32}
              color={darkMode ? "white" : "black"}
              onPress={navHelper}
            />
          </View>

          <View style={[styles.innerView]}>
            <Text
              style={[
                styles.name,
                {
                  color: darkMode ? "white" : "black",
                },
              ]}
            >
              {name}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default MenuIcon;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "black",
    minWidth: "100%",
    // borderWidth: 1,
    // borderColor: "white",
  },
  innerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    minHeight: "100%",
    borderWidth: 1,
    borderBottomColor: "#ffc92b",
    // borderColor: "red",
    // borderWidth: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 32,
    borderColor: "white",
    borderWidth: 0.1,
  },
  topLabel: {
    fontSize: 18,
    color: "#ffc92b",
    marginHorizontal: 8,
    textAlign: "center",
    textAlignVertical: "center",
  },

  name: {
    fontSize: 24,
    marginHorizontal: 8,
    textAlign: "center",
    textAlignVertical: "center",
    // borderWidth: 1,
    // borderColor: "white",
    // minHeight: 25,
  },
});
