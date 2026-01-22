import { NavLink } from "react-router-dom";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { getSiteContent } from "../../content";

import Container from "../ui/Container";
import Button from "../ui/Button";
import LanguageToggle from "./LanguageToggle";
import Divider from "./Divider";

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const linkBase =
  "text-[14px] font-medium text-text/80 hover:text-brand-900 transition px-3 py-2 rounded-full";
const activeLink = "text-brand-900 bg-brand/10";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const isRTL =
    (i18n.dir?.() || (i18n.language?.startsWith("ar") ? "rtl" : "ltr")) === "rtl";

  const site = useMemo(() => {
    const lang = i18n.language || "en";
    return getSiteContent(lang);
  }, [i18n.language]);

  const links = useMemo(
    () => [
      { to: "/", label: t("nav.home") },
      { to: "/about", label: t("nav.about") },
      { to: "/services", label: t("nav.services") },
      { to: "/stories", label: t("nav.stories") },
      { to: "/blog", label: t("nav.blog") },
      { to: "/faq", label: t("nav.faq") },
      { to: "/contact", label: t("nav.contact") },
    ],
    [t]
  );

  const callNow = () => {
    if (site?.phoneTel) {
      window.location.href = `tel:${site.phoneTel}`;
    }
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-bg/70 backdrop-blur border-b border-border/60">
        <Container className="py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Brand */}
            <NavLink to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
              {site?.brand?.logo ? (
                <img
                  src={site.brand.logo}
                  alt={site.brand.logoAlt || site.brand.name}
                  className="h-10 w-10 object-contain"
                />
              ) : null}

              <div className="leading-tight">
                <div className="text-[14px] font-semibold text-brand-900">
                  {site?.brand?.name}
                </div>
                {site?.brand?.tagline ? (
                  <div className="text-[12px] text-muted">{site.brand.tagline}</div>
                ) : null}
              </div>
            </NavLink>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `${linkBase} ${isActive ? activeLink : "hover:bg-surface"}`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {site?.phoneTel ? (
                <div className="hidden lg:block">
                  <Button
                    onClick={callNow}
                    className="rounded-full px-6 py-2.5 text-[13px] font-semibold bg-accent text-white"
                  >
                    {t("common.callNow", "Call now")}
                  </Button>
                </div>
              ) : null}

              <LanguageToggle size="sm" />

              <div className="lg:hidden">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setOpen((v) => !v)}
                  aria-label="Toggle menu"
                  className="rounded-full"
                >
                  {open ? <CloseIcon /> : <MenuIcon />}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {open ? (
            <div className="lg:hidden mt-3">
              <div className="rounded-2xl border border-border bg-gradient-to-b from-surface to-bg shadow-sm">
                <nav className="flex flex-col gap-1 p-3" dir={isRTL ? "rtl" : "ltr"}>
                  {links.map((l) => (
                    <NavLink
                      key={l.to}
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        isActive
                          ? "px-4 py-3 rounded-xl bg-brand/10 text-brand-900"
                          : "px-4 py-3 rounded-xl text-text/80 hover:bg-surface"
                      }
                    >
                      {l.label}
                    </NavLink>
                  ))}
                </nav>

                {site?.phoneTel ? (
                  <div className="p-3">
                    <Button
                      onClick={callNow}
                      className="w-full rounded-xl px-5 py-3 text-[14px] font-semibold bg-accent text-white"
                    >
                      {t("common.callNow", "Call now")}
                    </Button>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </Container>
      </div>

      <Divider />
    </header>
  );
}
