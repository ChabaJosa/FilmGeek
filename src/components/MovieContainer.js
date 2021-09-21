import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Divider } from "react-native-elements";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const MovieContainer = ({ data, navigation, index }) => {
  //
  // function infoHelper() {
  //   navigation.navigate("movie-details", {
  //     index,
  //   });
  // }
  //s
  return (
    <View style={styles.container}>
      <Text style={styles.boldTitle}>{data.Title}</Text>
      <View style={styles.firstRow}>
        <View style={styles.firstRowTwo}>
          <Text style={styles.yellowText}>{data.Director}</Text>
          <Text style={styles.yellowText}>{data.Released}</Text>
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity
          // onPress={accept}
          >
            <AntDesign
              name="like1"
              size={32}
              color="#ffc92b"
              style={styles.adMargin}
            />
          </TouchableOpacity>
          <TouchableOpacity
          // onPress={decline}
          >
            <AntDesign
              name="dislike1"
              size={32}
              color="red"
              style={styles.adMargin}
            />
          </TouchableOpacity>
          <TouchableOpacity
          // onPress={infoHelper}
          >
            <AntDesign
              name="infocirlceo"
              size={32}
              color="lightslategrey"
              style={styles.adMargin}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Divider style={styles.dividerGrey} />
      <View style={styles.secondRow}>
        <View style={styles.dataRowOdd}>
          <Text style={styles.textRow}>Description</Text>
          <Text style={styles.dataOutput}>{data.Plot.substring(0, 30)}...</Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={styles.textRow}>Rating / Runtime</Text>
          <Text
            style={styles.dataOutput}
          >{`${data.Rated} / ${data.Runtime}`}</Text>
        </View>
        <View style={styles.dataRowOdd}>
          {/* <Text style={styles.textRow}>Director/ Writers / Actors</Text>
          <Text style={styles.dataOutput}>
            {data.Director} / {data.Writer} / {data.actors}
          </Text> */}
          <Text style={styles.textRow}>Cast</Text>
          <Text style={styles.dataOutput}>{data.Actors}</Text>
        </View>
      </View>
    </View>
  );
};

export default MovieContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "transparent",
    borderColor: "lightslategrey",
    borderWidth: 1,
    borderRadius: 8,
    height: 250,
  },
  firstRow: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  firstRowTwo: {
    flex: 1,
    minHeight: 50,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  secondRow: {
    flex: 5,
    marginVertical: 10,
    paddingBottom: 10,
  },
  dataRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 2,
    alignItems: "center",
  },
  dataRowOdd: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 2,
    alignItems: "center",
    backgroundColor: "lightslategrey",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "transparent",
  },
  btnView: {
    flex: 1,
    minHeight: 50,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  textRow: { color: "#ffc92b", fontWeight: "bold" },
  dataOutput: { color: "#ffc92b" },
  dividerGrey: { backgroundColor: "grey" },
  adMargin: { marginHorizontal: 5 },
  boldTitle: { fontWeight: "bold", paddingVertical: 8, color: "#ffc92b" },
  yellowText: { color: "#ffc92b" },
});
