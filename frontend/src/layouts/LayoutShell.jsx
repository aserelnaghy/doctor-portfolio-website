import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

export default function LayoutShell() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const isArabic = i18n.language === "ar";
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.documentElement.lang = isArabic ? "ar" : "en";
  }, [i18n.language]);

  return (
    <>
      <Header />

      {/* Push all pages below the sticky header */}
      <main className="flex-1 pt-16 sm:pt-20">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
