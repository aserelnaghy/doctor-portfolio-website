import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function LayoutShell() {
    const { i18n } = useTranslation()

  useEffect(() => {
    const isArabic = i18n.language === 'ar'
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
    document.documentElement.lang = isArabic ? 'ar' : 'en'
  }, [i18n.language])

  return (
    <>
      <Header />
      <main style={{ padding: 16 }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
