import React from "react";
import { View, FlatList, Image, Animated } from "react-native"; 
import { LinearGradient } from "expo-linear-gradient";
//
export default function MovieBackground({
  data,
  scrollX,
  height,
  width,
  ITEM_SIZE,
}) {
  //
  return (
    <View
      style={{
        position: "absolute",
        width: width,
        height: height,
        // backgroundColor: "white",
      }}
    >
      <FlatList
        data={data}
        keyExtractor={(item) => `${item.Title} + ${item.Year}`}
        removeClippedSubviews={false}
        contentContainerStyle={{ width, height }}
        renderItem={({ item, index }) => {
          //
          if (item.Poster === undefined) {
            return null;
          }
          //
          const translateX = scrollX.interpolate({
            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            outputRange: [-width, 0],
            // extrapolate:'clamp'
          });
          //
          return (
            <Animated.View
              removeClippedSubviews={false}
              style={{
                position: "absolute", 
                height: height,
                transform: [{ translateX }],
                overflow: "hidden",
                marginTop: 16,
                borderRadius: 16,
              }}
            >
              <Image
                source={{ uri: item.Poster }}
                style={{
                  width: width,
                  height: height,
                //   position: "absolute",
                }}
              />
            </Animated.View>
          );
        }}
      />
      <LinearGradient
        colors={["transparent", "black"]}
        style={{ width, height, position: "absolute", bottom: 0 }}
      />
    </View>
  );
}
