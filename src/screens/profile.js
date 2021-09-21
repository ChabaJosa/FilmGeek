import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Linking,
  TouchableOpacity,
  Platform,
  Dimensions,
  ActivityIndicator,
} from "react-native";
//
import { Context } from "../Context/AppProvider";
//
const { height, width } = Dimensions.get("screen");
//
const Profile = ({ navigation }) => {
  const { state } = useContext(Context);
  //
  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed === true) {
      //
    }
    return () => (isSubscribed = false);
  }, []);
  //
  if (state.data != undefined) {
    //
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.accountDetails}>
          <View style={styles.textColumn}>
            <Text style={styles.subtitle}>Hi, {state.data.name}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL("https://www.imdb.com/");
          }}
        >
          <Text style={styles.policy}>View Data Source</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  } else {
    return <ActivityIndicator />;
  }
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    backgroundColor: "#fff",
    ...Platform.select({
      ios: {
        paddingHorizontal: 32,
      },
      android: {
        paddingHorizontal: 16,
      },
    }),
  },
  accountDetails: {
    flex: 10,
  },
  textColumn: {
    justifyContent: "flex-start",
    alignSelf: "center",
  },
  subtitle: {
    fontSize: 32,
    fontWeight: "bold",
    padding: 8,
    textAlign: "center",
    minWidth: width * 0.75,
  },
  underSub: {
    color: "lightslategray",
    textAlign: "center",
    fontSize: 18,
    padding: 8,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    backgroundColor: "#00946F",
    borderRadius: 8,
  },
  switchToggle: {
    margin: 4,
  },
  optionText: {
    margin: 8,
    // padding:8,
    color: "#fff",
  },
  itemText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "gray",
  },
  lightGrey: { color: "lightslategray" },

  iconContainer: {
    justifyContent: "flex-start",
    alignSelf: "center",
  },
  itemTitle: { color: "gray", marginBottom: 5 },
  policy: { textAlign: "center", padding: 8, margin: 16 },
  textDisclaimer: {
    padding: 8,
    marginVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    textAlign: "justify",
    borderColor: "lightgray",
  },
  overlayContainer: {
    height: height / 3,
    minHeight: 200,
    width: width / 1.25,
    justifyContent: "center",
    alignItems: "center",
  },
  inputCont: {
    borderWidth: 1,
    marginTop: 5,
    borderRadius: 5,
    borderColor: "lightgrey",
  },
  leftIcon: {
    marginHorizontal: 5,
  },
  btnStyle: {
    marginTop: 15,
    backgroundColor: "#005796",
    maxWidth: "50%",
    minWidth: 100,
    alignSelf: "center",
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    paddingHorizontal: 8,
  },
  transparent: {
    backgroundColor: "transparent",
  },
});
