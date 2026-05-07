import { View, Text, useWindowDimensions } from "react-native";
import { useTranslation } from "react-i18next";
import Section from "./Section";
import Wrap from "./Wrap";
import Eyebrow from "./Eyebrow";
import Display from "./Display";
import { colors, fonts } from "../styles/theme";

export default function Review() {
  const { t } = useTranslation("review");
  const bullets = t("bullets", { returnObjects: true }) as string[];
  const { width } = useWindowDimensions();
  const isWide = width >= 980;

  return (
    <Section background={colors.paper2}>
      <Wrap>
        <View style={{ flexDirection: isWide ? "row" : "column", gap: 60, alignItems: "flex-start" }}>
          <View style={{ flex: 1 }}>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <Display size={42} style={{ marginTop: 16 }}>
              {t("title")}
            </Display>
            <Text style={{ marginTop: 18, fontSize: 16, lineHeight: 26, color: colors.ink2 }}>
              {t("lede")}
            </Text>

            <View style={{ marginTop: 26, gap: 8 }}>
              {bullets.map((b) => (
                <View key={b} style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                  <Text style={{ color: colors.sunset, fontWeight: "700", fontSize: 18 }}>✓</Text>
                  <Text style={{ fontSize: 15, color: colors.ink2 }}>{b}</Text>
                </View>
              ))}
            </View>
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: colors.white,
              borderRadius: 22,
              padding: 28,
              borderWidth: 1,
              borderColor: colors.line,
            }}
          >
            <Text style={{ fontFamily: fonts.display, fontSize: 18, fontWeight: "700", color: colors.ink }}>
              Whale Beach — Right-hand point
            </Text>
            <Text style={{ marginTop: 6, fontSize: 12.5, color: colors.ink2 }}>
              3 May 2026 · 1.2m clean · 6:40am session
            </Text>

            {["Paddle out", "Wave selection", "Take-off timing", "Bottom turn", "Surf execution"].map((c, i) => (
              <View
                key={c}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: 10,
                  borderBottomWidth: i < 4 ? 1 : 0,
                  borderBottomColor: colors.line,
                }}
              >
                <Text style={{ fontSize: 14.5, color: colors.ink }}>{c}</Text>
                <Text style={{ color: colors.sunset, letterSpacing: 2 }}>★★★★☆</Text>
              </View>
            ))}

            <View
              style={{
                marginTop: 14,
                padding: 14,
                backgroundColor: colors.paper,
                borderRadius: 14,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 11, fontWeight: "700", letterSpacing: 1.5, textTransform: "uppercase", color: colors.ink2 }}>
                Skill Rating
              </Text>
              <Text style={{ fontFamily: fonts.display, fontSize: 24, fontWeight: "700", color: colors.ink }}>
                4.0 <Text style={{ color: colors.sunset, fontSize: 14 }}>★</Text>
              </Text>
            </View>
          </View>
        </View>
      </Wrap>
    </Section>
  );
}
