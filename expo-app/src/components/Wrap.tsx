import type { PropsWithChildren } from "react";
import { View, type ViewStyle } from "react-native";
import { layout } from "../styles/theme";

export default function Wrap({
  children,
  narrow,
  style,
}: PropsWithChildren<{ narrow?: boolean; style?: ViewStyle }>) {
  return (
    <View
      style={[
        {
          width: "100%",
          maxWidth: narrow ? layout.wrapNarrow : layout.wrapMax,
          marginLeft: "auto",
          marginRight: "auto",
          paddingHorizontal: layout.pad,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
