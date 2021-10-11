import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Context } from "../Context/AppProvider";
import { Image } from "react-native-elements";
import { useIsFocused } from "@react-navigation/native";
//
export default function Details({ route }) {
  //
  const { state, getMovieData } = useContext(Context);
  const { title } = route.params;
  const isFocused = useIsFocused();
  //
  // console.log('Heree', title)
  //
  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed === true) {
      let arr = state.movieData != undefined ? state.movieData : [];
      getMovieData(arr, title);
    }
    return () => (isSubscribed = false);
  }, [isFocused]);
  //
  // let rating = state.movieData[index].Ratings.filter((item) => item.Source.includes("Rotten"));
  // console.log('hereee',rating);
  //
  if (state.movieData != undefined && state.movieData.length > 0) {
    const index = state.movieData.length - 1;
    //
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.containerStyle}>
          <View style={[styles.flexOneRow, { justifyContent: "center" }]}>
            <Image
              source={{ uri: state.movieData[index].Poster }}
              style={styles.avatar}
            />
          </View>
          <View style={[styles.flexOneRow, { justifyContent: "center" }]}>
            <Text style={styles.title}>{state.movieData[index].Title}</Text>
          </View>
          <View style={styles.flexOneCol}>
            <Text style={styles.dataLabel}>Plot:</Text>
            <Text style={[styles.textIconic, { textAlign: "justify" }]}>
              {state.movieData[index].Plot}
            </Text>
          </View>
          <View style={styles.flexOneCol}>
            <Text style={styles.dataLabel}>Genre:</Text>
            <Text style={styles.textIconic}>
              {state.movieData[index].Genre}{" "}
            </Text>
          </View>
          <View style={styles.flexOneCol}>
            <Text style={styles.dataLabel}>Director:</Text>
            <Text style={styles.textIconic}>
              {state.movieData[index].Director}
            </Text>
          </View>
          <View style={styles.flexOneCol}>
            <Text style={styles.dataLabel}>Writer(s):</Text>
            <Text style={styles.textIconic}>
              {state.movieData[index].Writer}
            </Text>
          </View>
          <View style={styles.flexOneCol}>
            <Text style={styles.dataLabel}>Actors:</Text>
            <Text style={styles.textIconic}>
              {state.movieData[index].Actors}
            </Text>
          </View>
          <View style={styles.flexOneCol}>
            <Text style={styles.dataLabel}>Box Office:</Text>
            <Text style={styles.textIconic}>
              {state.movieData[index].BoxOffice}{" "}
            </Text>
          </View>
          <View style={styles.flexOneCol}>
            <Text style={styles.dataLabel}>Released:</Text>
            <Text style={styles.textIconic}>
              {state.movieData[index].Released}{" "}
            </Text>
          </View>
          <View style={styles.flexOneCol}>
            <Text style={styles.dataLabel}>Awards:</Text>
            <Text style={styles.textIconic}>
              {state.movieData[index].Awards}
            </Text>
          </View>
          <View style={styles.flexOneCol}>
            <Text style={styles.dataLabel}>Production House:</Text>
            <Text style={styles.textIconic}>
              {state.movieData[index].Production}{" "}
            </Text>
          </View>
          <View style={styles.flexOneCol}>
            <Text style={styles.dataLabel}>Rated:</Text>
            <Text style={styles.textIconic}>
              {state.movieData[index].Rated}{" "}
            </Text>
          </View>
          <View style={styles.flexOneCol}>
            <Text style={styles.dataLabel}>Runtime:</Text>
            <Text style={styles.textIconic}>
              {state.movieData[index].Runtime}{" "}
            </Text>
          </View>
          <View style={styles.flexOneCol}>
            <Text style={styles.dataLabel}>Language:</Text>
            <Text style={styles.textIconic}>
              {state.movieData[index].Language}{" "}
            </Text>
          </View>
          {state.movieData[index].Ratings[1] !== undefined ? (
            <View style={styles.flexOneCol}>
              <Text style={styles.dataLabel}>
                {`${state.movieData[index].Ratings[1].Source}`} Score:
              </Text>
              <Text style={styles.textIconic}>
                {state.movieData[index].Ratings[1].Value}
              </Text>
            </View>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <View style={[styles.containerStyle, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color="#ffc92b" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 8,
    backgroundColor: "black",
    paddingBottom: 64,
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
