import { View, Text, useWindowDimensions } from "react-native";
import { useTranslation } from "react-i18next";
import Section from "./Section";
import Wrap from "./Wrap";
import Eyebrow from "./Eyebrow";
import Display from "./Display";
import { colors, fonts } from "../styles/theme";

type Card = { num: string; title: string; body: string };

export default function Problem() {
  const { t } = useTranslation("problem");
  const cards = t("cards", { returnObjects: true }) as Card[];
  const { width } = useWindowDimensions();
  const cols = width >= 980 ? 3 : width >= 640 ? 2 : 1;

  return (
    <Section background={colors.paper2}>
      <Wrap>
        <View style={{ alignItems: "center", marginBottom: 60 }}>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <Display size={36} style={{ marginTop: 16, textAlign: "center", maxWidth: 760 }}>
            {t("title")}
          </Display>
          <Text
            style={{
              marginTop: 16,
              fontFamily: fonts.sans,
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

        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 24, justifyContent: "center" }}>
          {cards.map((c) => (
            <View
              key={c.num}
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
              <Text style={{ fontFamily: fonts.display, fontSize: 40, color: colors.sand, fontWeight: "700" }}>
                {c.num}
              </Text>
              <Text style={{ fontFamily: fonts.display, fontSize: 22, color: colors.ink, fontWeight: "700", marginTop: 10 }}>
                {c.title}
              </Text>
              <Text style={{ marginTop: 10, fontSize: 15, lineHeight: 23, color: colors.ink2 }}>
                {c.body.replace(/<[^>]+>/g, "")}
              </Text>
            </View>
          ))}
        </View>
      </Wrap>
    </Section>
  );
}
