import { View, Text, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import Section from "./Section";
import Wrap from "./Wrap";
import Eyebrow from "./Eyebrow";
import { colors, fonts } from "../styles/theme";
import { SUPPORTED_LNGS, type Lng } from "../i18n/i18n";

type Item = { name: string; code: string };

export default function Languages() {
  const { t, i18n } = useTranslation("common");
  const items = t("languages.items", { returnObjects: true }) as Item[];
  const current = (i18n.resolvedLanguage ?? i18n.language ?? "en").split("-")[0] as Lng;

  return (
    <Section background={colors.paper} paddingY={80}>
      <Wrap>
        <View style={{ alignItems: "center", marginBottom: 24 }}>
          <Eyebrow>{t("languages.title")}</Eyebrow>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
          {items.map((it, i) => {
            const lng = SUPPORTED_LNGS[i];
            const isActive = current === lng;
            return (
              <Pressable
                key={it.code}
                onPress={() => i18n.changeLanguage(lng)}
                style={{
                  paddingHorizontal: 18,
                  paddingVertical: 12,
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: isActive ? colors.navy : colors.line,
                  backgroundColor: isActive ? colors.paper2 : colors.white,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Text
                  style={{
                    fontFamily: fonts.sans,
                    fontWeight: isActive ? "700" : "600",
                    color: colors.ink,
                  }}
                >
                  {it.name}
                </Text>
                <Text style={{ fontSize: 11, color: colors.ink2, opacity: 0.6 }}>{it.code}</Text>
              </Pressable>
            );
          })}
        </View>
      </Wrap>
    </Section>
  );
}
