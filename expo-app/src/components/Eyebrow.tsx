import { View, Text } from "react-native";
import { colors } from "../styles/theme";

export default function Eyebrow({ children }: { children: string }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      <View style={{ width: 22, height: 2, backgroundColor: colors.sunset }} />
      <Text
        style={{
          fontSize: 12,
          fontWeight: "700",
          letterSpacing: 2,
          textTransform: "uppercase",
          color: colors.sunsetDeep,
        }}
      >
        {children}
      </Text>
    </View>
  );
}
