import React, { useContext, useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ImageBackground,
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
  async function uploadImage() {}
  async function updateProfile() {
    if (image != null) {
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
          updateProfileData(nameInput.current, null);
          console.log(error);
          blob.close();
          setFireUrl(null);
          setUploading(false);
          return null;
        },
        () => {
          snapshot.snapshot.ref.getDownloadURL().then((url) => {
            updateProfileData(nameInput.current, url);
            console.log("Download URL : ", url);
            blob.close();
            setFireUrl(url);
            setUploading(false);
            return url;
          });
        }
      );
      //
    } else {
      updateProfileData(nameInput.current, fireUrl);
    }
  }
  //
  if (state.data != undefined) {
    // console.log(state);
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
                  <ImageBackground
                    source={{
                      uri: state.data.pic,
                    }}
                    style={styles.avatar}
                    imageStyle={{
                      borderRadius: 50,
                      borderColor: "white",
                      borderWidth: 0.1,
                    }}
                  >
                    <Icon
                      raised
                      name="plus"
                      type="font-awesome"
                      color="#ffc92b"
                      containerStyle={{
                        marginRight: -24,
                        marginBottom: -8,
                        zIndex: 2,
                      }}
                      onPress={pickImage}
                    />
                  </ImageBackground>
                </>
              ) : (
                <>
                  <ImageBackground
                    source={require("../../assets/tony.png")}
                    style={styles.avatar}
                    imageStyle={{
                      borderRadius: 50,
                      borderColor: "white",
                      borderWidth: 0.1,
                    }}
                  >
                    <Icon
                      raised
                      name="plus"
                      type="font-awesome"
                      color="#ffc92b"
                      containerStyle={{
                        marginRight: -24,
                        marginBottom: -8,
                        zIndex: 2,
                      }}
                      onPress={pickImage}
                    />
                  </ImageBackground>
                </>
              )}
            </View>
            <View style={styles.textColumn}>
              <Text style={styles.subtitle}>
                {state.data.name != null ? state.data.name : "Hi New Guy"}
              </Text>
            </View>
          </View>
          <View style={styles.flexF}>
            <View style={styles.scrollContainer}>
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
              {/* <View style={styles.bottomContainer}>
                <Text style={[styles.labelStyle, styles.profileLabel]}>
                  Profile Picture
                </Text>
                <Button
                  title="Select Image"
                  buttonStyle={styles.grey}
                  onPress={pickImage}
                  icon={{
                    name: "camera",
                    size: 24,
                    color: "white",
                  }}
                />
              </View> */}
              <View style={styles.updateProfile}>
                {!uploading ? (
                  <Button
                    title="Update Profile"
                    buttonStyle={styles.green}
                    onPress={updateProfile}
                  />
                ) : (
                  <ActivityIndicator color="green" />
                )}
              </View>

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
    backgroundColor: "black",
    paddingHorizontal: 32,
    ...Platform.select({
      ios: {
        paddingBottom: 0
      },
      android: { 
        paddingBottom: 64
      },
    }),
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
    color: "white",
    // minWidth: width * 0.75,
  },
  flexF: {
    flex: 4,
    backgroundColor:"transparent", // white
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    paddingBottom:16,
    ...Platform.select({
      ios: {
        marginBottom: 64,
      },
      android: {
        marginBottom: 0,
      },
    }),
  },
  scrollContainer: {
    flex: 1,
    justifyContent: "space-around", 
    backgroundColor: "#ffc92b", 
    // borderTopStartRadius: 8,
    // borderTopEndRadius: 8, 
    borderRadius:8,
    paddingVertical: 8, 
    ...Platform.select({
      ios: {
        paddingHorizontal: 16,
        marginHorizontal: 16,
      },
      android: {
        paddingHorizontal: 16,
      },
    }),
  },
  titleRow: {
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  title: {
    flex: 1,
    flexDirection: "row",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
    backgroundColor: "transparent",
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
    color: "black",
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
    backgroundColor: "transparent",
  },
  policy: { textAlign: "center", padding: 8 },
  bottomContainer: {
    // flex: 1,
    justifyContent: "space-around",
    backgroundColor: "white",
    borderColor: "lightslategrey",
    borderWidth: 1,
    borderRadius: 8,
    minWidth: "100%",
    padding: 16,
    minHeight: 100,
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
    justifyContent: "flex-end",
    alignItems: "flex-end",
    // borderRadius: 50,
    // borderColor: "white",
    // borderWidth: 0.1,
  },
  grey: {
    backgroundColor: "black",
    minWidth: 100,
  },
  red: {
    backgroundColor: "red",
    minWidth: 100,
  },
  green: {
    backgroundColor: "black",
    minWidth: 100,
  },
  row: { flexDirection: "row", justifyContent: "center" },
  updateProfile: { flex: 1, justifyContent: "center", alignContent: "center" },
});
