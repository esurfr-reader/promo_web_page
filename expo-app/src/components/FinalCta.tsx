import { View, Text, Pressable, Linking } from "react-native";
import { useTranslation } from "react-i18next";
import Section from "./Section";
import Wrap from "./Wrap";
import { colors, fonts } from "../styles/theme";

export default function FinalCta() {
  const { t } = useTranslation("cta");

  const stripHtml = (s: string) => s.replace(/<[^>]+>/g, "").replace(/<br\s*\/?>/gi, "\n");

  return (
    <Section background={colors.navy}>
      <Wrap narrow>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontFamily: fonts.display,
              fontWeight: "700",
              fontSize: 48,
              lineHeight: 54,
              letterSpacing: -1,
              color: colors.white,
              textAlign: "center",
            }}
          >
            {stripHtml(t("title"))}
          </Text>
          <Text
            style={{
              marginTop: 20,
              fontSize: 17,
              lineHeight: 27,
              color: "rgba(255,255,255,.75)",
              textAlign: "center",
              maxWidth: 640,
            }}
          >
            {t("lede")}
          </Text>

          <View style={{ flexDirection: "row", gap: 14, marginTop: 32, flexWrap: "wrap", justifyContent: "center" }}>
            <Pressable
              onPress={() => Linking.openURL("#")}
              style={{
                backgroundColor: colors.white,
                paddingHorizontal: 22,
                paddingVertical: 14,
                borderRadius: 14,
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
              }}
            >
              <Text style={{ color: colors.navy, fontWeight: "700", fontSize: 22 }}></Text>
              <View>
                <Text style={{ color: colors.navy, fontSize: 11, fontWeight: "500" }}>
                  {t("stores.appStoreSmall")}
                </Text>
                <Text style={{ color: colors.navy, fontSize: 17, fontWeight: "700" }}>
                  {t("stores.appStoreBig")}
                </Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => Linking.openURL("#")}
              style={{
                backgroundColor: colors.white,
                paddingHorizontal: 22,
                paddingVertical: 14,
                borderRadius: 14,
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
              }}
            >
              <Text style={{ color: colors.navy, fontWeight: "700", fontSize: 22 }}>▶</Text>
              <View>
                <Text style={{ color: colors.navy, fontSize: 11, fontWeight: "500" }}>
                  {t("stores.playStoreSmall")}
                </Text>
                <Text style={{ color: colors.navy, fontSize: 17, fontWeight: "700" }}>
                  {t("stores.playStoreBig")}
                </Text>
              </View>
            </Pressable>
          </View>

          <Text style={{ marginTop: 38, fontSize: 13.5, color: "rgba(255,255,255,.55)", textAlign: "center" }}>
            {t("footnote")}
          </Text>
        </View>
      </Wrap>
    </Section>
  );
}
