import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import { Input, Button } from "react-native-elements";
import { Context } from "../Context/AppProvider";
import SearchContainer from "../components/SearchContainer";

export default function Home({ navigation }) {
  const { state, getMovieArr } = useContext(Context);
  const [search, setSearch] = useState("Tenet");
  //
  //  Tab Navigator for Marvel, Star Wars APIs?
  //
  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed === true) {
      getMovieArr("Star Wars");
    }
    return () => (isSubscribed = false);
  }, []);
  //
  function searchHelper() {
    // console.log("hello");
    let searchArr = String(search).split(" ");
    if (searchArr.length > 1) {
      getMovieArr(searchArr.join("+"));
    } else {
      getMovieArr(search);
    }
  }
  //
  if (state.movieArrData != undefined) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.containerStyle}
      >
        {/* <View style={styles.containerStyle}> */}
        <View
          style={{
            flex: 2,
            alignItems: "center",
            justifyContent: "center",
            // borderColor: "green",
            // borderWidth: 1,
          }}
        >
          <Input
            placeholder="Search For..."
            containerStyle={{
              borderColor: "white",
              borderWidth: 1,
              height: 75,
              minHeight: "10%",
              borderRadius: 32,
              backgroundColor: "black",
              // alignItems:'center'
              // padding: 8
            }}
            inputContainerStyle={{
              borderBottomWidth: 0,
              height: "100%",
              borderRadius: 32,
              // borderColor: "red",
              // borderWidth: 1,
            }}
            inputStyle={{
              color: "white",
              paddingLeft: 16,
              // borderColor: "yellow",
              // borderWidth: 1,
            }}
            // labelStyle={{color: "white" }}
            leftIcon={{
              type: "font-awesome",
              name: "search",
              color: "#ffc92b",
            }}
            onChangeText={(value) => {
              setSearch(value);
            }}
          />
        </View>
        <View style={{ flex: 6 }}>
          {state.movieArrData.Search != undefined &&
          state.movieArrData.Search.length >= 1 ? (
            <FlatList
              data={state.movieArrData.Search}
              keyExtractor={(item) => String(`${item.imdbID}+${Math.floor(Math.random()* 100)}`)}
              renderItem={({ item, index }) => (
                <SearchContainer
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
        {/* </View> */}
      </KeyboardAvoidingView>
    );
  } else {
    return (
      <View style={[styles.containerStyle, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: "black",
    paddingVertical: 16,
    paddingHorizontal: 8,
    // borderColor: "white",
    // borderWidth: 1,
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
