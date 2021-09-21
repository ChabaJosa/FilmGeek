import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Context } from "../Context/AppProvider";

const { height, width } = Dimensions.get("screen");

export default function SignIn() {
  const { state, getProfileData } = useContext(Context);
  const [email, setEmail] = useState(null);
  const [pwd, setPwd] = useState(null);
  // console.log(state);
  return (
    <View style={styles.containerStyle}>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={require("../../assets/The-Godfather.jpg")}
          style={styles.imageBackground}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.textWhite}>Hello Film Geek !</Text>
      </View>
      <View style={[styles.column]}>
        <Input
          placeholder="  Email"
          labelStyle={{ color: "white" }}
          inputStyle={{ color: "white" }}
          leftIcon={{ type: "font-awesome", name: "user" }}
          onChangeText={(value) => {
            setEmail(value);
          }}
        />
        <Input
          placeholder="  Password"
          secureTextEntry={true}
          inputStyle={{ color: "white" }}
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={(value) => {
            setPwd(value);
          }}
        />
        <View style={styles.row}>
          <TouchableOpacity
            style={{
              backgroundColor: "#ffc92b",
              padding: 24,
              margin: 24,
              borderRadius: 24,
            }}
            onPress={() => {
              getProfileData(email, pwd);
            }}
          >
            <Text>Movies!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: "black",
  },
  title: {
    fontSize: 20,
    fontFamily: "Helvetica",
  },
  textWhite: {
    color: "#ffc92b",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  column: {
    flex: 3,
    paddingHorizontal: 5,
    paddingTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  imageContainer: {
    backgroundColor: "white",
    flex: 0.1,
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "center",
  },
  imageBackground: {
    height: height,
    width: width,
    flex: 1,
    zIndex: 1,
  },
  gradient: {
    zIndex: 2,
    height: height,
    width: width,
    position: "absolute",
  },
});
