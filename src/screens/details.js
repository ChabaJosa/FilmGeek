import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Image } from "react-native-elements";
//
export default function Details({ route }) {
  //
  const { index, data } = route.params;
  //
  // let rating = data.Ratings.filter((item) => item.Source.includes("Rotten"));
  // console.log('hereee',rating);
  //
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.containerStyle}>
        <View style={[styles.flexOneRow, { justifyContent: "center" }]}>
          <Image source={{ uri: data.Poster }} style={styles.avatar} />
        </View>
        <View style={[styles.flexOneRow, { justifyContent: "center" }]}>
          <Text style={styles.title}>{data.Title}</Text>
        </View>
        <View style={styles.flexOneCol}>
          <Text style={styles.dataLabel}>Plot:</Text>
          <Text style={[styles.textIconic, { textAlign: "justify" }]}>
            {data.Plot}
          </Text>
        </View>
        <View style={styles.flexOneCol}>
          <Text style={styles.dataLabel}>Genre:</Text>
          <Text style={styles.textIconic}>{data.Genre} </Text>
        </View>
        <View style={styles.flexOneCol}>
          <Text style={styles.dataLabel}>Director:</Text>
          <Text style={styles.textIconic}>{data.Director}</Text>
        </View>
        <View style={styles.flexOneCol}>
          <Text style={styles.dataLabel}>Writer(s):</Text>
          <Text style={styles.textIconic}>{data.Writer}</Text>
        </View>
        <View style={styles.flexOneCol}>
          <Text style={styles.dataLabel}>Actors:</Text>
          <Text style={styles.textIconic}>{data.Actors}</Text>
        </View>
        <View style={styles.flexOneCol}>
          <Text style={styles.dataLabel}>Box Office:</Text>
          <Text style={styles.textIconic}>{data.BoxOffice} </Text>
        </View>
        <View style={styles.flexOneCol}>
          <Text style={styles.dataLabel}>Released:</Text>
          <Text style={styles.textIconic}>{data.Released} </Text>
        </View>
        <View style={styles.flexOneCol}>
          <Text style={styles.dataLabel}>Awards:</Text>
          <Text style={styles.textIconic}>{data.Awards}</Text>
        </View>
        <View style={styles.flexOneCol}>
          <Text style={styles.dataLabel}>Production House:</Text>
          <Text style={styles.textIconic}>{data.Production} </Text>
        </View>
        <View style={styles.flexOneCol}>
          <Text style={styles.dataLabel}>Rated:</Text>
          <Text style={styles.textIconic}>{data.Rated} </Text>
        </View>
        <View style={styles.flexOneCol}>
          <Text style={styles.dataLabel}>Runtime:</Text>
          <Text style={styles.textIconic}>{data.Runtime} </Text>
        </View>
        <View style={styles.flexOneCol}>
          <Text style={styles.dataLabel}>Language:</Text>
          <Text style={styles.textIconic}>{data.Language} </Text>
        </View>
        {data.Ratings[1] !== undefined ? (
          <View style={styles.flexOneCol}>
            <Text style={styles.dataLabel}>
              {`${data.Ratings[1].Source}`} Score:
            </Text>
            <Text style={styles.textIconic}>{data.Ratings[1].Value}</Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 8,
    backgroundColor: "black",
  },
  containerStyle: {
    // flex: 1,
    minHeight: 900,
    backgroundColor: "black",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 8,
    borderWidth: 2,
    borderColor: "#ffc92b",
    borderRadius: 8,
    padding: 16,
  },
  flexOneRow: { flex: 1, flexDirection: "row", minWidth: "100%" },
  flexOneCol: { flex: 1, alignItems: "flex-start", minWidth: "100%" },
  title: {
    fontSize: 20,
    margin: 16,
    color: "#ffc92b",
    fontStyle: "italic",
  },
  textIconic: {
    color: "#ffc92b",
  },
  dataLabel: {
    color: "white",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: "#ffc92b",
    borderWidth: 0.5,
    backgroundColor: "transparent",
    // padding: 32
  },
});
