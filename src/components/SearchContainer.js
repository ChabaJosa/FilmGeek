import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
      <View style={{ width: "25%" }}>
        <Image source={{ uri: data.Poster }} style={styles.avatar} />
      </View>
      <View style={{ width: "75%" }}>
        <Text style={{ color: "white", textAlign: "center" }}>
          {data.Title}
          {"  "}({data.Year})
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: "#ffc92b",
    borderWidth: 1,
    height: 100,
    justifyContent: "space-around",
    padding: 8,
    marginVertical: 8,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: "white",
    borderWidth: 0.1,
  },
});
