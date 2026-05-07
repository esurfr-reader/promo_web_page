import { View, Text, Image, Pressable, Linking } from "react-native";
import { useTranslation } from "react-i18next";
import { colors, fonts, layout } from "../styles/theme";
import { useLocalizedImages } from "../content/images";

const NAV_HEIGHT = 64;

function NavLink({ label, href }: { label: string; href: string }) {
  return (
    <Pressable onPress={() => Linking.openURL(href)} hitSlop={6}>
      <Text
        style={{
          fontFamily: fonts.sans,
          fontSize: 14.5,
          fontWeight: "600",
          color: colors.ink2,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export default function Nav() {
  const { t } = useTranslation("common");
  const images = useLocalizedImages();
  return (
    <View
      style={{
        height: NAV_HEIGHT,
        backgroundColor: colors.paper,
        borderBottomColor: colors.line,
        borderBottomWidth: 1,
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: "100%",
          maxWidth: layout.wrapMax,
          marginLeft: "auto",
          marginRight: "auto",
          paddingHorizontal: layout.pad,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Pressable onPress={() => Linking.openURL("#top")} style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Image source={{ uri: images.brandLogo }} style={{ width: 36, height: 36 }} resizeMode="contain" />
          <Text style={{ fontFamily: fonts.display, fontWeight: "700", fontSize: 22, color: colors.navy }}>
            {t("brand")}
          </Text>
        </Pressable>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 28 }}>
          <NavLink label={t("nav.how")} href="#how" />
          <NavLink label={t("nav.canvas")} href="#canvas" />
          <NavLink label={t("nav.review")} href="#review" />
          <NavLink label={t("nav.method")} href="#method" />
          <Pressable
            onPress={() => Linking.openURL("#download")}
            style={{
              backgroundColor: colors.navy,
              paddingHorizontal: 18,
              paddingVertical: 10,
              borderRadius: 999,
            }}
          >
            <Text style={{ color: colors.white, fontWeight: "700", fontSize: 14 }}>{t("nav.cta")}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
