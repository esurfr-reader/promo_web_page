import { View, Text, Image, useWindowDimensions } from "react-native";
import { useTranslation } from "react-i18next";
import Section from "./Section";
import Wrap from "./Wrap";
import Eyebrow from "./Eyebrow";
import Display from "./Display";
import { colors, fonts } from "../styles/theme";
import { breakOrder, images } from "../content/images";

export default function Canvas() {
  const { t } = useTranslation("canvas");
  const labels = t("breakLabels", { returnObjects: true }) as string[];
  const { width } = useWindowDimensions();
  const cols = width >= 980 ? 4 : width >= 540 ? 2 : 1;
  const gap = 24;

  return (
    <Section background={colors.navy}>
      <Wrap>
        <View style={{ alignItems: "center", marginBottom: 60 }}>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <Display size={36} style={{ marginTop: 16, textAlign: "center" }} color={colors.white}>
            {t("title")}
          </Display>
          <Text
            style={{
              marginTop: 16,
              fontSize: 16,
              lineHeight: 26,
              color: "rgba(255,255,255,.7)",
              textAlign: "center",
              maxWidth: 720,
            }}
          >
            {t("lede")}
          </Text>
        </View>

        <View style={{ flexDirection: "row", flexWrap: "wrap", gap, justifyContent: "center" }}>
          {breakOrder.map((key, i) => (
            <View
              key={key}
              style={{
                flexBasis: `${100 / cols - 2}%` as `${number}%`,
                minWidth: 240,
                aspectRatio: 1.4,
                borderRadius: 18,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Image
                source={{ uri: images.breaks[key] }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
                accessibilityLabel={labels[i] ?? key}
              />
              <View
                style={{
                  position: "absolute",
                  left: 12,
                  bottom: 12,
                  backgroundColor: "rgba(10,31,58,.85)",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 999,
                }}
              >
                <Text
                  style={{
                    color: colors.white,
                    fontFamily: fonts.sans,
                    fontWeight: "600",
                    fontSize: 13,
                  }}
                >
                  {labels[i] ?? key}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Wrap>
    </Section>
  );
}
