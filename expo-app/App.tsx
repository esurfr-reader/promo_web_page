import { useEffect } from "react";
import { Platform, ScrollView, StatusBar, View } from "react-native";
import "./src/i18n/i18n";
import i18n from "./src/i18n/i18n";
import LanguageSwitcher from "./src/components/LanguageSwitcher";
import Nav from "./src/components/Nav";
import Hero from "./src/components/Hero";
import Problem from "./src/components/Problem";
import Flow from "./src/components/Flow";
import Canvas from "./src/components/Canvas";
import Features from "./src/components/Features";
import Review from "./src/components/Review";
import Method from "./src/components/Method";
import Languages from "./src/components/Languages";
import FinalCta from "./src/components/FinalCta";
import Footer from "./src/components/Footer";
import { colors } from "./src/styles/theme";

export default function App() {
  useEffect(() => {
    if (Platform.OS !== "web") return;
    const sync = (lng: string) => {
      document.documentElement.lang = lng.split("-")[0];
    };
    sync(i18n.resolvedLanguage ?? i18n.language ?? "en");
    i18n.on("languageChanged", sync);
    return () => i18n.off("languageChanged", sync);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.paper }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <LanguageSwitcher />
        <Nav />
        <Hero />
        <Problem />
        <Flow />
        <Canvas />
        <Features />
        <Review />
        <Method />
        <Languages />
        <FinalCta />
        <Footer />
      </ScrollView>
    </View>
  );
}
