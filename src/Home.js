import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Input, Button } from "react-native-elements";
import { Context } from "./Context/AppProvider";
import MovieContainer from "./components/MovieContainer";

export default function Home({ navigation }) {
  const { state, getMovieData } = useContext(Context);
  const [search, setSearch] = useState("Tenet");
  //
  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed === true) {
      getMovieData([], "Tenet");
    }
    return () => (isSubscribed = false);
  }, []);
  //
  function searchHelper() {
    let searchArr = String(search).split(" ");
    if (searchArr.length > 1) {
      searchArr.join("+");
    } else {
      getMovieData(state.movieData, search);
    }
  }
  //
  // console.log("State from home", state);
  if (state.movieData != undefined) {
    // console.log(navigation);
    return (
      <View style={styles.containerStyle}>
        {/* <Text style={styles.textWhite}>Hi</Text> */}
        <View style={{ flex: 1 }}>
          <Input
            placeholder="Movie"
            inputContainerStyle={{ margin: 16 }}
            inputStyle={{ color: "white" }}
            labelStyle={{ padding: 8 }}
            leftIcon={{ type: "font-awesome", name: "search" }}
            onChangeText={(value) => {
              setSearch(value);
            }}
          />
        </View>
        <View style={{ flex: 6 }}>
           {state.movieData != undefined && state.movieData.length >= 1 ? (
            <FlatList
              data={state.movieData}
              keyExtractor={(item) => String(item.Title)}
              renderItem={({ item, index }) => (
                <MovieContainer
                  data={item}
                  navigation={navigation}
                  index={index}
                />
              )}
            />
          ) : (
            <View style={[styles.containerStyle, { alignItems: "center" }]}>
              <Text style={styles.textWhite}>Nothing here yet!</Text>
            </View>
          )}
        </View>
        <View style={{ flex: 1 }}>
          <Button
            title="Find Movie"
            titleStyle={{ color: "black" }}
            buttonStyle={{
              width: "50%",
              alignSelf: "center",
              backgroundColor: "#ffc92b",
              color: "black",
              marginTop: 8,
            }}
            onPress={searchHelper}
          />
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
    // justifyContent:'center'
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
