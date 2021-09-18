import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Context } from "./Context/AppProvider";
import MovieContainer from "./components/MovieContainer";

export default function Home() {
  const { state, getMovieData } = useContext(Context);
  //
  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed === true) {
      getMovieData();
    }
    return () => (isSubscribed = false);
  }, []);
  //
  //   console.log("State from home", state);
  if (state.movieData != undefined) {
    console.log(state.movieData);
    return (
      <View style={styles.containerStyle}>
        {/* <Text style={styles.textWhite}>Hi</Text> */}
        <View style={{ flex: 0.5 }}>
          <MovieContainer data={state.movieData} />
        </View>
      </View>
    );
  } else {
    return (
      <View style={[styles.containerStyle, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: "black",
  },
  title: {
    fontSize: 20,
    fontFamily: "Helvetica",
  },
  textWhite: {
    color: "#ffc92b",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingTop: 5,
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
