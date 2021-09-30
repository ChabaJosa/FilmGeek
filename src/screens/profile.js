import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Linking,
  TouchableOpacity,
  Platform,
  Dimensions,
  ActivityIndicator,
  LogBox,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
import { Button } from "react-native-elements";
//
import { Context } from "../Context/AppProvider";
//
const { height, width } = Dimensions.get("screen");
//
const Profile = ({ navigation }) => {
  const { state } = useContext(Context);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
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
  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    //
    console.log(result);
    //
    if (!result.cancelled) {
      setImage(result.uri);
    }
  }
  //
  function removeImage() {
    setImage(null);
  }
  //
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
          return url;
        });
      }
    );
  }
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
        <View style={styles.bottomContainer}>
          <View style={styles.imageContainer}>
            {image != null ? (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            ) : null}
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Button
              title="Select Image"
              buttonStyle={styles.blue}
              onPress={pickImage}
            />
            <Button
              title="Remove Image"
              buttonStyle={styles.red}
              onPress={removeImage}
            />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            {!uploading ? (
              <Button
                title="Upload Image"
                buttonStyle={styles.green}
                onPress={uploadImage}
              />
            ) : (
              <ActivityIndicator color="green"/>
            )}
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL("https://www.imdb.com/");
            }}
          >
            <Text style={styles.policy}>View Data Source</Text>
          </TouchableOpacity>
        </View>
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
    flex: 1,
    marginVertical: 16,
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
  policy: { textAlign: "center", padding: 8, margin: 16 },
  bottomContainer: {
    flex: 5,
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
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "green",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 200,
    minHeight: 225,
  },
  blue: {
    backgroundColor: "blue",
    minWidth: 125,
  },
  red: {
    backgroundColor: "red",
    minWidth: 125,
  },
  green: {
    backgroundColor: "green",
    minWidth: 200,
  },
});
