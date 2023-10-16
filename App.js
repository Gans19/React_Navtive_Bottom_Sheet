import React, { useCallback, useMemo, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ImageBackground,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "./BottomSheet";
import { StatusBar } from "expo-status-bar";

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar style="light" />
        <View style={{ flex: 1, top: 0 }}>
          <ImageBackground
            source={require("./assets/dp.jpg")}
            resizeMode="contain"
            style={{ width: 500, height: 750 }}
          ></ImageBackground>
        </View>
        <BottomSheet />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 24,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
