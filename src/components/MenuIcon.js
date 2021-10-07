import React, { useContext } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Image, Icon } from "react-native-elements";
import { Context } from "../Context/AppProvider";

const MenuIcon = ({ navigation, name, darkMode, leftMargin }) => {
  //
  const { state } = useContext(Context);
  //
  // function goBack() {
  //   navigation.goBack();
  // }
  //
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? "black" : "white" },
      ]}
    >
      {/* {name !== "Home" ? (
        <View
          style={[styles.innerView, { flex: 0.25, alignItems: "flex-start" }]}
        >
          <Icon
            name="chevron-left"
            color={darkMode ? "white" : "black"}
            onPress={goBack}
          />
        </View>
      ) : null} */}
      <View style={[styles.innerView, { marginLeft: leftMargin }]}>
        <Text
          style={{
            borderBottomWidth: 1,
            borderColor: "#ffc92b",
            minWidth: 75,
            minHeight:'50%',
            textAlign: "center",
            textAlignVertical:"top",
            color: darkMode ? "white" : "black",
          }}
        >
          {name}
        </Text>
      </View>
      <View
        style={
          name !== "Home"
            ? styles.innerView
            : [styles.innerView, { paddingRight: 8 }]
        }
      >
        {/* <Icon
          name="person"
          color={darkMode ? "white" : "black"}
          onPress={toggleHelper}
        /> */}
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
    // borderWidth: 1,
    // borderColor: "white",
    // width: width,
  },
  innerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    // borderColor: "yellow",
    // borderWidth: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 32,
    borderColor: "white",
    borderWidth: 0.1,
  },
});
