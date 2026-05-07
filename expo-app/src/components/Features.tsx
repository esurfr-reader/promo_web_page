import { View, Text, useWindowDimensions } from "react-native";
import { useTranslation } from "react-i18next";
import Section from "./Section";
import Wrap from "./Wrap";
import Eyebrow from "./Eyebrow";
import Display from "./Display";
import { colors, fonts } from "../styles/theme";

type Item = { title: string; body: string };

const ICON_BG = [colors.sunset, colors.sky1, colors.navy, colors.sunset, colors.sky1, colors.navy];

export default function Features() {
  const { t } = useTranslation("features");
  const items = t("items", { returnObjects: true }) as Item[];
  const { width } = useWindowDimensions();
  const cols = width >= 980 ? 3 : width >= 640 ? 2 : 1;

  return (
    <Section background={colors.paper}>
      <Wrap>
        <View style={{ alignItems: "center", marginBottom: 60 }}>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <Display size={36} style={{ marginTop: 16, textAlign: "center" }}>
            {t("title")}
          </Display>
          <Text
            style={{
              marginTop: 16,
              fontSize: 16,
              lineHeight: 26,
              color: colors.ink2,
              textAlign: "center",
              maxWidth: 720,
            }}
          >
            {t("lede")}
          </Text>
        </View>

        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 24 }}>
          {items.map((it, i) => (
            <View
              key={i}
              style={{
                flexBasis: `${100 / cols - 2}%` as `${number}%`,
                minWidth: 280,
                backgroundColor: colors.white,
                borderRadius: 18,
                padding: 28,
                borderWidth: 1,
                borderColor: colors.line,
              }}
            >
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  backgroundColor: ICON_BG[i % ICON_BG.length],
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: colors.white, fontWeight: "700", fontSize: 18 }}>★</Text>
              </View>
              <Text style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: "700", color: colors.ink, marginTop: 16 }}>
                {it.title}
              </Text>
              <Text style={{ marginTop: 10, fontSize: 14.5, lineHeight: 22, color: colors.ink2 }}>{it.body}</Text>
            </View>
          ))}
        </View>
      </Wrap>
    </Section>
  );
}
