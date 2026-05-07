import { View, Text, Image, Pressable, Linking, useWindowDimensions } from "react-native";
import { useTranslation } from "react-i18next";
import Eyebrow from "./Eyebrow";
import Display from "./Display";
import Wrap from "./Wrap";
import { colors, fonts } from "../styles/theme";
import { images } from "../content/images";

export default function Hero() {
  const { t } = useTranslation("hero");
  const { width } = useWindowDimensions();
  const isWide = width >= 980;
  const meta = t("meta", { returnObjects: true }) as {
    languages: string;
    breakTypes: string;
    platforms: string;
  };
  const logoStrip = t("logoStrip", { returnObjects: true }) as {
    label: string;
    items: string[];
  };

  const stripHtml = (s: string) => s.replace(/<[^>]+>/g, "");

  return (
    <View style={{ backgroundColor: colors.paper, paddingTop: 60, paddingBottom: 40 }}>
      <Wrap>
        <View
          style={{
            flexDirection: isWide ? "row" : "column",
            gap: 64,
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1 }}>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <Display size={isWide ? 80 : 56} style={{ marginTop: 22 }}>
              {t("title.line1Prefix")}
              <Text style={{ color: colors.sunset, fontStyle: "italic" }}>
                {t("title.line1Highlight")}
              </Text>
              {t("title.line1Suffix")}
              {"\n"}
              {t("title.line2")}
              {"\n"}
              {t("title.line3")}
            </Display>
            <Text
              style={{
                fontFamily: fonts.sans,
                fontSize: 17,
                lineHeight: 27,
                color: colors.ink2,
                marginTop: 26,
                maxWidth: 560,
              }}
            >
              {t("lede")}
            </Text>

            <View style={{ flexDirection: "row", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
              <Pressable
                onPress={() => Linking.openURL("#download")}
                style={{
                  backgroundColor: colors.sunset,
                  paddingHorizontal: 22,
                  paddingVertical: 14,
                  borderRadius: 999,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Text style={{ color: colors.white, fontWeight: "700", fontSize: 15 }}>
                  {t("primaryCta")}
                </Text>
                <Text style={{ color: colors.white, fontWeight: "700" }}>→</Text>
              </Pressable>
              <Pressable
                onPress={() => Linking.openURL("#how")}
                style={{
                  borderWidth: 1,
                  borderColor: colors.line,
                  paddingHorizontal: 22,
                  paddingVertical: 14,
                  borderRadius: 999,
                }}
              >
                <Text style={{ color: colors.ink, fontWeight: "600", fontSize: 15 }}>
                  {t("secondaryCta")}
                </Text>
              </Pressable>
            </View>

            <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 14, marginTop: 34 }}>
              <Text style={{ fontSize: 13, color: colors.ink2 }}>
                <Text style={{ fontWeight: "700", color: colors.navy }}>5 languages</Text>
                {" · EN · ES · PT · JA · FR"}
              </Text>
              <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: colors.lineStrong }} />
              <Text style={{ fontSize: 13, color: colors.ink2 }}>
                <Text style={{ fontWeight: "700", color: colors.navy }}>8 break types</Text>
                {" mapped"}
              </Text>
              <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: colors.lineStrong }} />
              <Text style={{ fontSize: 13, color: colors.ink2 }}>{stripHtml(meta.platforms)}</Text>
            </View>
          </View>

          <View style={{ width: isWide ? 360 : 280, alignItems: "center" }}>
            <View
              style={{
                width: "100%",
                aspectRatio: 9 / 19,
                backgroundColor: colors.navy,
                borderRadius: 32,
                padding: 8,
                shadowColor: "#000",
                shadowOpacity: 0.18,
                shadowRadius: 30,
                shadowOffset: { width: 0, height: 18 },
              }}
            >
              <View style={{ flex: 1, borderRadius: 26, overflow: "hidden" }}>
                <Image
                  source={{ uri: images.heroPhoneScreenshot }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                  accessibilityLabel={t("phoneAlt")}
                />
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: 36,
            marginTop: 80,
            opacity: 0.7,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: colors.ink2,
              fontWeight: "700",
            }}
          >
            {logoStrip.label}
          </Text>
          {logoStrip.items.map((s) => (
            <Text
              key={s}
              style={{ fontFamily: fonts.display, fontSize: 18, fontWeight: "600", color: colors.navy }}
            >
              {s}
            </Text>
          ))}
        </View>
      </Wrap>
    </View>
  );
}
