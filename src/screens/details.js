import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  Platform,
} from "react-native";
import { Context } from "../Context/AppProvider";
import { Image } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { useIsFocused } from "@react-navigation/native";
import * as Speech from "expo-speech";
import { Audio } from "expo-av";
//
const { height, width } = Dimensions.get("screen");
//
export default function Details({ route }) {
  //
  const { state, getMovieData } = useContext(Context);
  const { title } = route.params;
  const isFocused = useIsFocused();
  //
  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed === true) {
      let arr = state.movieData != undefined ? state.movieData : [];
      getMovieData(arr, title);
      // listVoices();
    }
    return () => (isSubscribed = false);
  }, [isFocused]);
  //
  // useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log("Unloading Sound");
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [sound]);
  //
  // async function playSound() {
  //   console.log("Loading Sound");
  //   const { sound } = await Audio.Sound.createAsync(
  //     require("./assets/Hello.mp3")
  //   );
  //   setSound(sound);
  //   console.log("Playing Sound");
  //   await sound.playAsync();
  // }
  //
  async function listVoices() {
    let voices = await Speech.getAvailableVoicesAsync();
    console.log("voicesss", voices);
  }
  //
  const speak = (val) => {
    const thingToSay = val;
    Platform.OS === "ios"
      ? Speech.speak(thingToSay, {
          voice: "com.apple.ttsbundle.Daniel-compact",
          pitch: 0.9,
          // rate: 1.0,
          onStart: () => {},
        })
      : Speech.speak(thingToSay, {
          pitch: 0.9,
          // rate: 1.0,
          onStart: () => {},
        });
    //
    // For both Pitch and Rate Normal is 1.0
    //
  };
  //
  // let rating = state.movieData[index].Ratings.filter((item) => item.Source.includes("Rotten"));
  // console.log('hereee',rating);
  //
  if (state.movieData != undefined && state.movieData.length > 0) {
    const index = state.movieData.length - 1;
    //
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={{ uri: state.movieData[index].Poster }}
          imageStyle={{ borderRadius: 16 }}
          resizeMode="cover"
          style={{ width, height }}
        >
          <LinearGradient
            colors={["transparent", "black"]}
            start={{ x: 0.9, y: 0.5 }}
            end={{ x: 0.1, y: 0.5 }}
            style={{ width, height, position: "absolute", bottom: 0 }}
          />
          <ScrollView contentContainerStyle={styles.containerStyle}>
            <View style={[styles.flexOneRow, { justifyContent: "center" }]}>
              <Image
                source={{ uri: state.movieData[index].Poster }}
                style={styles.avatar}
                onPress={() => speak(state.movieData[index].Plot)}
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
        </ImageBackground>
      </SafeAreaView>
    );
  } else {
    return (
      <View
        style={[
          styles.containerStyle,
          { justifyContent: "center", backgroundColor: "black" },
        ]}
      >
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
  },
  containerStyle: {
    // flex: 1,
    // zIndex: 1,
    // backgroundColor: "black",
    minHeight: 900,
    justifyContent: "space-around",
    alignItems: "center",
    margin: 8,
    borderWidth: 2,
    borderColor: "#ffc92b",
    borderRadius: 8,
    padding: 16,
    paddingBottom: 64,
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
