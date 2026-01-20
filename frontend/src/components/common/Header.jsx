import { NavLink } from "react-router-dom";
import LanguageToggle from "./LanguageToggle";
import { useTranslation } from "react-i18next";

export default function Header() {
    const { t } = useTranslation();

  return (
    <header style={{ padding: 16, borderBottom: "1px solid #ddd" }}>
      <nav style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <NavLink to="/">{t('nav.home')}</NavLink>
        <NavLink to="/about">{t('nav.about')}</NavLink>
        <NavLink to="/services">{t('nav.services')}</NavLink>
        <NavLink to="/stories">{t('nav.stories')}</NavLink>
        <NavLink to="/blog">{t('nav.blog')}</NavLink>
        <NavLink to="/faq">{t('nav.faq')}</NavLink>
        <NavLink to="/contact">{t('nav.contact')}</NavLink>
        <div style={{ marginLeft: "auto" }}>
          <LanguageToggle />
        </div>
      </nav>
    </header>
  );
}
