import type { PropsWithChildren } from "react";
import { View, type ViewStyle } from "react-native";
import { colors } from "../styles/theme";

export default function Section({
  children,
  background = colors.paper,
  style,
  paddingY = 120,
}: PropsWithChildren<{ background?: string; style?: ViewStyle; paddingY?: number }>) {
  return (
    <View style={[{ backgroundColor: background, paddingVertical: paddingY }, style]}>
      {children}
    </View>
  );
}
