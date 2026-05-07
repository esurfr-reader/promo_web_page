import { View, Text, Image, Pressable, Linking } from "react-native";
import { useTranslation } from "react-i18next";
import Wrap from "./Wrap";
import { colors, fonts } from "../styles/theme";
import { useLocalizedImages } from "../content/images";

export default function Footer() {
  const { t } = useTranslation("common");
  const images = useLocalizedImages();

  return (
    <View style={{ backgroundColor: colors.navy, borderTopColor: "rgba(255,255,255,.08)", borderTopWidth: 1, paddingVertical: 26 }}>
      <Wrap>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Image source={{ uri: images.brandLogo }} style={{ width: 28, height: 28 }} resizeMode="contain" />
            <Text style={{ fontFamily: fonts.display, color: colors.white, fontWeight: "700", fontSize: 16 }}>
              {t("brand")}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <Text style={{ color: "rgba(255,255,255,.55)", fontSize: 13 }}>{t("footer.copyright")}</Text>
            <Pressable onPress={() => Linking.openURL("https://www.esurfr.com/")}>
              <Text style={{ color: "rgba(255,255,255,.85)", fontSize: 13, fontWeight: "600" }}>
                {t("footer.links.esurfr")}
              </Text>
            </Pressable>
            <Pressable onPress={() => Linking.openURL("#")}>
              <Text style={{ color: "rgba(255,255,255,.85)", fontSize: 13, fontWeight: "600" }}>
                {t("footer.links.privacy")}
              </Text>
            </Pressable>
            <Pressable onPress={() => Linking.openURL("#")}>
              <Text style={{ color: "rgba(255,255,255,.85)", fontSize: 13, fontWeight: "600" }}>
                {t("footer.links.support")}
              </Text>
            </Pressable>
          </View>
        </View>
      </Wrap>
    </View>
  );
}
