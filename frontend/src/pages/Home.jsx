// src/pages/Home.jsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { getHomeContent, getSiteContent } from "../content";
import { usePhoneActions } from "../hooks/usePhoneActions";
import { useTrustParallax } from "../hooks/useTrustParallax";

import HeroSection from "../sections/home/HeroSection";
import TeamPreviewSection from "../sections/home/MedicalTeamSection";
import TrustSection from "../sections/home/TrustSection";
import ServicesPreviewSection from "../sections/home/ServicesPreviewSection";
import StoriesPreviewSection from "../sections/home/StoriesPreviewSection";
import AboutPreviewSection from "../sections/home/AboutPreviewSection";
import FaqPreviewSection from "../sections/home/FaqPreviewSection";
import BlogPreviewSection from "../sections/home/BlogPreviewSection";
import FinalCtaBand from "../sections/home/FinalCtaBand";

export default function Home() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const dir = i18n.dir?.() || (i18n.language?.startsWith("ar") ? "rtl" : "ltr");
  const isRTL = dir === "rtl";

  const { site, home } = useMemo(() => {
    const lang = i18n.language || "en";
    return { site: getSiteContent(lang), home: getHomeContent(lang) };
  }, [i18n.language]);

  const { phoneDisplay, phoneTel, callNow } = usePhoneActions(site);
  const trustParallax = useTrustParallax();

  return (
    <main className={isRTL ? "text-right" : "text-left"}>
      <HeroSection
        t={t}
        isRTL={isRTL}
        home={home}
        site={site}
        phoneDisplay={phoneDisplay}
        phoneTel={phoneTel}
        onCallNow={callNow}
        onNavigate={navigate}
      />

      <TrustSection
        t={t}
        home={home}
        onNavigate={navigate}
        parallax={trustParallax}
      />

      <ServicesPreviewSection t={t} home={home} onNavigate={navigate} />
      <TeamPreviewSection t={t} home={home} onNavigate={navigate} />
      <StoriesPreviewSection t={t} home={home} onNavigate={navigate} />
      <AboutPreviewSection t={t} home={home} onNavigate={navigate} />
      <FaqPreviewSection t={t} home={home} onNavigate={navigate} />
      <BlogPreviewSection t={t} home={home} onNavigate={navigate} />

      <FinalCtaBand
        t={t}
        home={home}
        site={site}
        isRTL={isRTL}
        phoneDisplay={phoneDisplay}
        onCallNow={callNow}
        onNavigate={navigate}
      />
    </main>
  );
}
