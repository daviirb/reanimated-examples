import { SplitButton } from "@/components/split-button";
import { Palette } from "@/constants";
import { useState } from "react";
import { View } from "react-native";

export default function Index() {
  const [splitted, setSplitted] = useState(false)

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Palette.background
      }}
    >
      <SplitButton
        splitted={splitted}
        mainAction={{
          label: "stop",
          onPress: () => {
            setSplitted(true)
          },
          backgroundColor: Palette.card
        }}
        leftAction={{
          label: "resume",
          onPress: () => {
            setSplitted(false)
          },
          backgroundColor: Palette.card
        }}
        rightAction={{
          label: "finish",
          onPress: () => {
            setSplitted(false)
          },
          backgroundColor: Palette.highlight
        }}
      />
    </View>
  );
}
