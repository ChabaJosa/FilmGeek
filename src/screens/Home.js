import React, { useEffect, useState, useContext, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Dimensions,
  Animated,
  Platform,
} from "react-native";
import { Input, Icon } from "react-native-elements";
import { Context } from "../Context/AppProvider";
import SearchContainer from "../components/SearchContainer";
import MovieBackground from "../components/MovieBackground";

const { height, width } = Dimensions.get("screen");

export default function Home({ navigation }) {
  const { state, getMovieArr } = useContext(Context);
  const [search, setSearch] = useState("Tenet");
  //
  const scrollX = useRef(new Animated.Value(0)).current;
  //
  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed === true) {
      getMovieArr("Halloween");
    }
    return () => (isSubscribed = false);
  }, []);
  //
  function searchHelper() {
    let searchArr = String(search).split(" ");
    if (searchArr.length > 1) {
      getMovieArr(searchArr.join("+"));
    } else {
      getMovieArr(search);
    }
  }
  //
  const ITEM_SIZE = width * 0.72;
  const SPACER_SIZE = (width - ITEM_SIZE) / 2;
  //
  if (state.movieArrData != undefined) {
    //
    let dataWithSpacer = [
      { Title: "left_spacer" },
      ...state.movieArrData.Search,
      { Title: "right_spacer" },
    ];
    //
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.containerStyle}
      >
        <MovieBackground
          data={dataWithSpacer}
          scrollX={scrollX}
          height={height} // BACKDROP_HEIGHT
          width={width} // BACKDROP_WIDTH
          ITEM_SIZE={ITEM_SIZE}
        />
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 8,
            marginHorizontal: 8,
            zIndex: 1,
            // borderColor: "green",
            // borderWidth: 1,
          }}
        >
          <Input
            placeholder="Search For..."
            containerStyle={styles.contStyle}
            inputContainerStyle={styles.inputContStyle}
            inputStyle={styles.inpStyle}
            // labelStyle={{color: "white" }}
            rightIcon={
              <Icon
                size={24}
                name="search"
                color="#ffc92b"
                onPress={searchHelper}
              />
            }
            onChangeText={(value) => {
              setSearch(value);
            }}
          />
        </View>
        <View style={styles.flatlistContainer}>
          {state.movieArrData.Search != undefined &&
          state.movieArrData.Search.length >= 1 &&
          dataWithSpacer !== undefined ? (
            <>
              <Animated.FlatList
                data={dataWithSpacer}
                horizontal
                contentContainerStyle={{
                  alignItems: "center",
                }}
                keyExtractor={(item) =>
                  String(`${item.imdbID}+${Math.floor(Math.random() * 100)}`)
                }
                renderToHardwareTextureAndroid
                snapToInterval={ITEM_SIZE} // Stops At Every Item like Carousel
                decelerationRate={0} // Slows Down Scroll Like Carousel
                bounce={false} // No bounce effect at beginning or end
                scrollEventThrottle={16} // Use 1 here to make sure no events are ever missed
                onScroll={Animated.event(
                  // Actual Animation Stuff
                  [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                  { useNativeDriver: true }
                )}
                renderItem={({ item, index }) => {
                  //
                  if (item.Poster === undefined) {
                    return <View style={{ width: SPACER_SIZE }} />;
                  }
                  //
                  const inputRange = [
                    (index - 2) * ITEM_SIZE,
                    (index - 1) * ITEM_SIZE,
                    index * ITEM_SIZE,
                  ];
                  //
                  const translateY = scrollX.interpolate({
                    inputRange,
                    outputRange: [100, 50, 100],
                    extrapolate: "clamp",
                  });
                  //
                  return (
                    <View
                      style={{
                        width: ITEM_SIZE,
                        marginBottom: 32,
                        // borderColor: "green",
                        // borderWidth: 1,
                      }}
                    >
                      <Animated.View
                        style={{
                          // borderColor: "white",
                          // borderWidth: 0.5,
                          ...Platform.select({
                            ios: {
                              shadowColor: "#000",
                              shadowOffset: {
                                width: 0,
                                height: 10,
                              },
                              shadowOpacity: 0.12,
                              shadowRadius: 60,
                            },
                            android: {
                              elevation: 2,
                            },
                          }),
                          borderRadius: 16,
                          marginHorizontal: 8,
                          marginBottom: 24,
                          backgroundColor: "transparent",
                          transform: [{ translateY }],
                        }}
                      >
                        <SearchContainer
                          data={item}
                          navigation={navigation}
                          index={index}
                        />
                      </Animated.View>
                    </View>
                  );
                }}
              />
            </>
          ) : (
            <View style={[styles.containerStyle, { alignItems: "center" }]}>
              <Text style={styles.textWhite}>Nothing here yet!</Text>
            </View>
          )}
        </View>
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
    ...Platform.select({
      ios: {
        paddingBottom: 0,
      },
      android: {},
    }),
  },
  flatlistContainer: {
    flex: 8,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 64,
    // ...Platform.select({
    //   ios: {
    //     marginBottom: 64,
    //   },
    //   android: {
    //     marginBottom: 64,
    //   },
    // }),
  },
  textWhite: {
    color: "#ffc92b",
  },
  container: {
    borderColor: "#ffc92b",
    borderWidth: 1,
    height: "100%",
    // width: "100%",
    justifyContent: "space-around",
    padding: 8,
    margin: 8,
    alignItems: "center",
    borderRadius: 16,
  },
  avatar: {
    width: 60,
    height: 120,
    borderRadius: 8,
    borderColor: "white",
    borderWidth: 0.1,
  },
  btnContainer: {
    flex: 1,
    ...Platform.select({
      ios: {
        marginBottom: 64,
      },
      android: {
        marginBottom: 8,
      },
    }),
  },
  contStyle: {
    borderColor: "white",
    borderWidth: 1,
    height: "100%",
    minHeight: 40,
    // borderTopWidth: 0,
    // borderBottomEndRadius: 32,
    // borderBottomStartRadius: 32,
    borderRadius: 16,
    backgroundColor: "transparent",
  },
  inputContStyle: {
    height: "100%",
    borderRadius: 16,
    // borderColor: "red",
    // borderWidth: 1,
  },
  inpStyle: {
    color: "white",
    paddingLeft: 16,
  },
});
