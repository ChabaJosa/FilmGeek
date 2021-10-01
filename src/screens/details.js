import React from "react";
import { View, Text, StyleSheet } from "react-native";
//
export default function Details({ route }) {
  //
  const { index, data } = route.params;
  // console.log(index, data);
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.title}>{data.Title}</Text>
      <Text style={[styles.textWhite, {textAlign:"justify"}]}>{data.Plot}</Text>
      <Text style={styles.textWhite}>{data.Actors}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 8,
    borderRadius: 8,
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontFamily: "Helvetica",
    margin: 16,
    color: "#ffc92b",
    fontStyle:'italic'
  },
  textWhite: {
    color: "#ffc92b",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    padding: 8,
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
});
