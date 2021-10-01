import React, { useContext, useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Linking,
  TouchableOpacity,
  Platform,
  Dimensions,
  ActivityIndicator,
  LogBox,
} from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
//
import { Context } from "../Context/AppProvider"; 
//
const Profile = ({ navigation }) => {
  const { state, updateProfileData } = useContext(Context);
  const nameInput = useRef(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fireUrl, setFireUrl] = useState(null);
  //
  // Firebase sets some timeers for a long period, which will trigger some warnings.
  LogBox.ignoreLogs([`Setting a timer for a long period`]);
  //
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);
  //
  function removeImage() {
    setImage(null);
  }
  function inputSetterHelper(val) {
    nameInput.current = val;
  }
  function updateProfile() {
    updateProfileData(nameInput.current, fireUrl);
  }
  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    }); 
    //
    if (!result.cancelled) {
      setImage(result.uri);
      setFireUrl(null);
    }
  }
  async function uploadImage() {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed."));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });
    //
    const ref = firebase.storage().ref().child(new Date().toISOString());
    const snapshot = ref.put(blob);
    //
    snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setUploading(true);
      },
      (error) => {
        setUploading(false);
        console.log(error);
        blob.close();
        return;
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploading(false);
          console.log("Download URL : ", url);
          blob.close();
          setFireUrl(url);
          return url;
        });
      }
    );
  }
  //
  if (state.data != undefined) {
    //
    // console.log(state);
    //
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.flexOne}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          // keyboardVerticalOffset={Platform.select({ ios: 128, android: 96 })}
        >
          <View style={styles.accountDetails}>
            <View style={styles.imageContainer}>
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
            <View style={styles.textColumn}>
              <Text style={styles.subtitle}>
                Hi, {state.data.name != null ? state.data.name : "New Guy"}
              </Text>
            </View>
          </View>
          <View style={styles.scrollOuterView}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <View style={styles.titleRow}>
                <Text style={styles.title}>Edit Profile </Text>
              </View>
              <View style={styles.flexin}>
                <Input
                  label={"Full Name"}
                  labelStyle={styles.labelStyle}
                  containerStyle={styles.inputContainer}
                  inputContainerStyle={styles.inputContainerStyle}
                  autoCapitalize="none"
                  color="black"
                  onChangeText={(value) => inputSetterHelper(value)}
                  placeholder={`${
                    state.data.name != null ? state.data.name : ""
                  }`}
                  // disabled={true}
                />
              </View>
              <View style={{ flex: 4 }}>
                <View style={styles.bottomContainer}>
                  <Text style={[styles.labelStyle, styles.profileLabel]}>
                    Profile Picture
                  </Text>
                  <View style={styles.imageContainer}>
                    {image != null ? (
                      <Image
                        source={{ uri: image }}
                        style={{ width: 150, height: 150 }}
                      />
                    ) : null}
                  </View>
                  <View style={styles.betweenRow}>
                    <Button
                      title="Select"
                      buttonStyle={styles.blue}
                      onPress={pickImage}
                    />
                    <Button
                      title="Remove"
                      buttonStyle={styles.red}
                      onPress={removeImage}
                    />
                  </View>
                  <View style={styles.row}>
                    {!uploading ? (
                      <Button
                        title="Upload"
                        buttonStyle={styles.green}
                        onPress={uploadImage}
                      />
                    ) : (
                      <ActivityIndicator color="green" />
                    )}
                  </View>
                </View>
              </View>
              <View style={styles.updateProfile}>
                <Button
                  title="Update Profile"
                  buttonStyle={styles.green}
                  onPress={updateProfile}
                />
              </View>
            </ScrollView>
            <View>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL("https://www.imdb.com/");
                }}
              >
                <Text style={styles.policy}>View Movie Data Source</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
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
    paddingHorizontal: 32,
  },
  accountDetails: {
    flex: 2,
    marginVertical: 16,
    // flexDirection: "row",
  },
  textColumn: {
    justifyContent: "flex-start",
    alignSelf: "center",
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 8,
    textAlign: "center",
    // minWidth: width * 0.75,
  },
  scrollOuterView: {
    flex: 4,
  },
  scrollContainer: {
    flex: 1,
    borderColor: "lightslategrey",
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 750,
    // flexWrap: "wrap",
    paddingVertical: 8,
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
  titleRow: {
    flexDirection: "row",
  },
  title: {
    flex: 1,
    flexDirection: "row",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
  },
  inputContainer: {
    borderWidth: 0.75,
    marginTop: 8,
    marginBottom: 24,
    borderRadius: 5,
    borderColor: "black",
    height: 70,
    color: "black",
  },
  inputContainerStyle: {
    margin: 0,
    padding: 0,
    borderColor: "transparent",
    color: "black",
  },
  labelStyle: {
    fontSize: 14,
    paddingTop: 8,
    fontWeight: "normal",
    color: "lightslategrey",
  },
  profileLabel: {
    marginTop: -24,
    marginLeft: -4,
  },
  flexOne: {
    flex: 1,
  },
  flexin: {
    flex: 1,
    flexDirection: "row",
  },
  policy: { textAlign: "center", padding: 8, margin: 16 },
  bottomContainer: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: "white",
    borderColor: "lightslategrey",
    borderWidth: 1,
    borderRadius: 8,
    minWidth: "100%",
    padding: 16,
  },
  imageContainer: {
    padding: 8,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
    minHeight: 125,
    // borderRadius: 8,
    // borderWidth: 1,
    // borderColor: "green",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "white",
    borderWidth: 0.1,
  },
  blue: {
    backgroundColor: "blue",
    minWidth: 100,
  },
  red: {
    backgroundColor: "red",
    minWidth: 100,
  },
  green: {
    backgroundColor: "green",
    minWidth: 100,
  },
  row: { flexDirection: "row", justifyContent: "center" },
  betweenRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  updateProfile: { flex: 1, justifyContent: "center", alignContent: "center" },
});
