import { View, Text, useWindowDimensions } from "react-native";
import { useTranslation } from "react-i18next";
import Section from "./Section";
import Wrap from "./Wrap";
import Eyebrow from "./Eyebrow";
import Display from "./Display";
import { colors, fonts } from "../styles/theme";

type Author = { initials: string; name: string; role: string };
type Stat = { value: string; label: string };

export default function Method() {
  const { t } = useTranslation("method");
  const author = t("author", { returnObjects: true }) as Author;
  const stats = t("stats", { returnObjects: true }) as Stat[];
  const { width } = useWindowDimensions();
  const isWide = width >= 980;

  return (
    <Section background={colors.navy}>
      <Wrap>
        <View style={{ flexDirection: isWide ? "row" : "column", gap: 60, alignItems: "flex-start" }}>
          <View style={{ flex: 1 }}>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <Display size={42} color={colors.white} style={{ marginTop: 16 }}>
              {t("title")}
            </Display>
            <Text
              style={{
                marginTop: 24,
                fontFamily: fonts.display,
                fontSize: 22,
                fontStyle: "italic",
                color: colors.sand,
                lineHeight: 32,
              }}
            >
              "{t("quote")}"
            </Text>
            <View style={{ flexDirection: "row", gap: 12, alignItems: "center", marginTop: 28 }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: colors.sunset,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: colors.white, fontWeight: "700" }}>{author.initials}</Text>
              </View>
              <View>
                <Text style={{ color: colors.white, fontWeight: "700" }}>{author.name}</Text>
                <Text style={{ color: "rgba(255,255,255,.65)", fontSize: 13 }}>{author.role}</Text>
              </View>
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", gap: 16 }}>
            {stats.map((s) => (
              <View
                key={s.label}
                style={{
                  flexBasis: "47%",
                  backgroundColor: "rgba(255,255,255,.06)",
                  borderRadius: 18,
                  padding: 22,
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,.12)",
                }}
              >
                <Text style={{ fontFamily: fonts.display, fontSize: 38, fontWeight: "700", color: colors.sand }}>
                  {s.value}
                </Text>
                <Text style={{ marginTop: 6, fontSize: 13.5, color: "rgba(255,255,255,.75)", lineHeight: 20 }}>
                  {s.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </Wrap>
    </Section>
  );
}
