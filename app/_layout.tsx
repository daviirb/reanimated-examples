import * as Font from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        FiraCode: require("../assets/fonts/FiraCode-VariableFont_wght.ttf"),
      });

      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    // TODO: implement loading state
    return null;
  }

  return <>
    <StatusBar style="light" translucent={false} />

    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  </>;
}
