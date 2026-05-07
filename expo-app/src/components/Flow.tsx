import { View, Text, useWindowDimensions } from "react-native";
import { useTranslation } from "react-i18next";
import Section from "./Section";
import Wrap from "./Wrap";
import Eyebrow from "./Eyebrow";
import Display from "./Display";
import { colors, fonts } from "../styles/theme";

type Step = { step: string; title: string; body: string };

export default function Flow() {
  const { t } = useTranslation("flow");
  const steps = t("steps", { returnObjects: true }) as Step[];
  const { width } = useWindowDimensions();
  const cols = width >= 980 ? 3 : 1;

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
          {steps.map((s, i) => (
            <View
              key={i}
              style={{
                flexBasis: `${100 / cols - 2}%` as `${number}%`,
                minWidth: 280,
                backgroundColor: colors.white,
                borderRadius: 22,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: colors.line,
              }}
            >
              <View style={{ height: 200, backgroundColor: colors.sky2, position: "relative" }}>
                <Text
                  style={{
                    position: "absolute",
                    top: 14,
                    left: 14,
                    backgroundColor: "rgba(10,31,58,.78)",
                    color: colors.white,
                    fontSize: 11,
                    fontWeight: "600",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 999,
                  }}
                >
                  {s.step}
                </Text>
              </View>
              <View style={{ padding: 24 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 11,
                      backgroundColor: colors.sunset,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: colors.white, fontSize: 12, fontWeight: "700" }}>{i + 1}</Text>
                  </View>
                  <Text style={{ fontSize: 12, fontWeight: "700", color: colors.ink2, textTransform: "uppercase", letterSpacing: 1 }}>
                    {s.step}
                  </Text>
                </View>
                <Text style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: "700", color: colors.ink, marginTop: 8 }}>
                  {s.title}
                </Text>
                <Text style={{ marginTop: 10, fontSize: 14.5, lineHeight: 22, color: colors.ink2 }}>{s.body}</Text>
              </View>
            </View>
          ))}
        </View>
      </Wrap>
    </Section>
  );
}
