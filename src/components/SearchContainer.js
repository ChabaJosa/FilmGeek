import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Image } from "react-native-elements";

export default function SearchContainer({ data, navigation, index }) {
  //
  function navHelper() {
    navigation.navigate("Title-Rate", {
      title: data.Title,
    });
  }
  //
  return (
    <TouchableOpacity style={styles.container} onPress={navHelper}>
      <ImageBackground
        source={{
          uri: data.Poster,
        }}
        resizeMode="cover"
        style={styles.img}
      >
        {/* <Image source={{ uri: data.Poster }} style={styles.avatar} /> */}
        <Text style={styles.txt}>
          {data.Title}
          {"  "}({data.Year})
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    // maxHeight: 250,
  },
  img: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    // borderWidth:1,
    // borderRadius: 8
  },
  txt: {
    color: "#ffc92b",
    textAlign: "center",
    backgroundColor: "black",
    padding: 8,
    fontStyle: "italic",
  },
});
