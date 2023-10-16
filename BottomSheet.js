import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Button,
  SafeAreaView,
} from "react-native";
import React, { useCallback, useEffect } from "react";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  FlatList,
  Gesture,
  GestureDetector,
  ScrollView,
} from "react-native-gesture-handler";

// Taking Dimemnsions from Window
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const BottomSheet = () => {
  // set default values

  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });
  const MAX_TRANSLATE = -SCREEN_HEIGHT + 350;

  // callback function for simplify function

  const ScrollTo = useCallback((destination) => {
    "worklet";
    translateY.value = withSpring(destination, { damping: 50 });
  });

  // This is for BottomSheet Controls

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((e) => {
      // console.log(e.translationY);
      translateY.value = e.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE);
    })
    .onEnd(() => {
      if (translateY.value > -SCREEN_HEIGHT / 3) {
        ScrollTo(-250);
        // translateY.value = withSpring(-250, { damping: 50 });
      } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
        ScrollTo(MAX_TRANSLATE);
        // translateY.value = withSpring(MAX_TRANSLATE, { damping: 50 });
      }
    });

  const BottomSheetSTyle = useAnimatedStyle(() => {
    // This is for Animation style for borders
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE + 50, MAX_TRANSLATE],
      [25, 5],
      Extrapolate.CLAMP
    );
    return {
      borderRadius,
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(() => {
    ScrollTo(-SCREEN_HEIGHT / 2);
    // translateY.value = withSpring(-SCREEN_HEIGHT / 2, { damping: 50 });
  });
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, BottomSheetSTyle]}>
        <View style={styles.line}></View>
        <SafeAreaView>
          <ScrollView style={styles.content}>
            <Text style={styles.text}>Hello</Text>
            <Text style={styles.text}>Hello</Text>
            <Text style={styles.text}>Hello</Text>
            <Text style={styles.text}>Hello</Text>
            <Text style={styles.text}>Hello</Text>
            <Text style={styles.text}>Hello</Text>
            <Text style={styles.text}>Hello</Text>
            <Text style={styles.text}>Hello</Text>
            <Text style={styles.text}>Hello</Text>
            <Text style={styles.text}>58Hello</Text>
            <Text style={styles.text}>58Hello</Text>
            <Text style={styles.text}>554Hello</Text>
            <Text style={styles.text}>35Hello</Text>
            <Text style={styles.text}>96Hello</Text>
            <Text style={styles.text}>95Hello</Text>
            <Text style={styles.text}>65Hello</Text>
            <Text style={styles.text}>12Hello</Text>
          </ScrollView>
        </SafeAreaView>
      </Animated.View>
    </GestureDetector>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: SCREEN_HEIGHT,
    backgroundColor: "white",
    top: SCREEN_HEIGHT,
    borderRadius: 25,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: "grey",
    alignSelf: "center",
    marginVertical: 15,
    borderRadius: 2,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    height: 250,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    borderColor: "white",
    paddingBottom: 50,
  },
  content: {
    backgroundColor: "orange",
    padding: 25,
    height: 510,
    // lineHeight: 750,
  },
});
