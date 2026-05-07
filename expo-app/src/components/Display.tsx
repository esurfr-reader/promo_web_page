import { Text, type TextStyle } from "react-native";
import { colors, fonts } from "../styles/theme";

export default function Display({
  children,
  size = 48,
  style,
  color = colors.ink,
}: {
  children: React.ReactNode;
  size?: number;
  style?: TextStyle;
  color?: string;
}) {
  return (
    <Text
      style={[
        {
          fontFamily: fonts.display,
          fontWeight: "700",
          fontSize: size,
          lineHeight: size * 1.04,
          letterSpacing: -size * 0.02,
          color,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
