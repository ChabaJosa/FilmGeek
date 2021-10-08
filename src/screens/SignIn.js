import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
//
import { Input, Button } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Context } from "../Context/AppProvider";

const { height, width } = Dimensions.get("screen");

export default function SignIn() {
  const { state, getProfileData, createProfile } = useContext(Context);
  const [email, setEmail] = useState(null);
  const [pwd, setPwd] = useState(null);
  //
  // useEffect(() => {
  //   getProfileData("chabagjg@gmail.com", "Test123456789");
  // }, []);
  //
  async function handleSignUp() {
    if (email != null && pwd != null) {
      let trimUser = email.toString().trim();
      let trimPwd = pwd.toString().trim();
      //
      await createProfile(trimUser, trimPwd);
    } else {
      alert("Hey put something on Email or Password!");
    }
  }
  //
  async function handleLogIn() {
    if (email != null && pwd != null) {
      let trimUser = email.toString().trim();
      let trimPwd = pwd.toString().trim();
      //
      await getProfileData(trimUser, trimPwd);
    } else {
      alert("Hey put something on Email or Password!");
    }
  }
  //
  // console.log("State from SignIn", state);
  return (
    <View style={styles.containerStyle}>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={require("../../assets/The-Godfather.jpg")}
          style={styles.imageBackground}
        />
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.inputContainer}>
          <Input
            placeholder="  Email"
            labelStyle={{ color: "white" }}
            inputStyle={{ color: "white" }}
            autoCapitalize="none"
            leftIcon={{ type: "font-awesome", name: "user", color: "white" }}
            containerStyle={{ minWidth: "100%", padding: 16 }}
            onChangeText={(value) => {
              setEmail(value);
            }}
          />
          <Input
            placeholder="  Password"
            secureTextEntry={true}
            inputStyle={{ color: "white" }}
            leftIcon={{ type: "font-awesome", name: "lock", color: "white" }}
            containerStyle={{ minWidth: "100%", padding: 16 }}
            onChangeText={(value) => {
              setPwd(value);
            }}
          />
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.btns}
            onPress={
              // getProfileData(email, pwd);
              handleLogIn
            }
          >
            <Text style={styles.btnText}>Log In</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.btns} onPress={handleSignUp}>
            <Text style={styles.btnText}>Register</Text>
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
    fontSize: 18,
    fontFamily: "Helvetica",
  },
  textWhite: {
    color: "#ffc92b",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingTop: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    flex: 3,
    paddingHorizontal: 8,
    paddingTop: 8,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inputContainer: {
    minWidth: "100%",
    justifyContent: "center",
    flex: 3,
    // borderColor: "white",
    // borderWidth: 1,
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
  btns: {
    backgroundColor: "#ffc92b",
    padding: 24,
    borderRadius: 24,
    minWidth: "100%",
    alignItems: "center",
  },
  btnText: {
    fontSize: 16,
  },
});
