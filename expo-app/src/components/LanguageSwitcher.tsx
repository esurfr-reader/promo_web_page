import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import { colors, fonts } from "../styles/theme";
import { SUPPORTED_LNGS, type Lng } from "../i18n/i18n";

const LANG_LABELS: Record<Lng, { name: string; code: string }> = {
  en: { name: "English", code: "EN" },
  es: { name: "Español", code: "ES" },
  pt: { name: "Português", code: "PT" },
  ja: { name: "日本語", code: "JA" },
  fr: { name: "Français", code: "FR" },
};

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const current = (i18n.resolvedLanguage ?? i18n.language ?? "en").split("-")[0] as Lng;

  return (
    <View style={{ position: "absolute", top: 14, right: 14, zIndex: 100 }}>
      <Pressable
        onPress={() => setOpen((v) => !v)}
        style={{
          paddingHorizontal: 14,
          paddingVertical: 8,
          borderRadius: 999,
          backgroundColor: "rgba(255,255,255,.92)",
          borderWidth: 1,
          borderColor: colors.line,
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
        }}
      >
        <Text style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: "700", letterSpacing: 1, color: colors.ink }}>
          🌐 {LANG_LABELS[current].code}
        </Text>
        <Text style={{ fontSize: 9, opacity: 0.6 }}>▾</Text>
      </Pressable>

      {open && (
        <View
          style={{
            position: "absolute",
            top: 38,
            right: 0,
            backgroundColor: colors.white,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colors.line,
            padding: 6,
            minWidth: 160,
            gap: 2,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
          }}
        >
          {SUPPORTED_LNGS.map((lng) => {
            const isActive = current === lng;
            return (
              <Pressable
                key={lng}
                onPress={() => {
                  i18n.changeLanguage(lng);
                  setOpen(false);
                }}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  borderRadius: 8,
                  backgroundColor: isActive ? colors.paper2 : "transparent",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <Text style={{ fontWeight: isActive ? "700" : "500", fontSize: 13, color: colors.ink }}>
                  {LANG_LABELS[lng].name}
                </Text>
                <Text style={{ fontSize: 11, opacity: 0.5 }}>{LANG_LABELS[lng].code}</Text>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
}
