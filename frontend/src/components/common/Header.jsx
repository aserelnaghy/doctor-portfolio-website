import { NavLink } from "react-router-dom";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import Container from "../ui/Container";
import Button from "../ui/Button";
import LanguageToggle from "./LanguageToggle";
import Divider from "./Divider";

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const linkBase = "text-body text-text hover:text-brand-900 transition";
const activeLink = "text-brand-900 font-semibold";

export default function Header() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

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

  return (
    <header className="sticky top-0 z-50 bg-bg/90 backdrop-blur">
      <Container className="py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo / Brand */}
          <NavLink to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-md bg-brand/10" aria-hidden="true" />
            <div className="leading-tight">
              <div className="text-body font-semibold text-brand-900">Dr. Youssry</div>
              <div className="text-small text-muted">Medical Center</div>
            </div>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-5 lg:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) => `${linkBase} ${isActive ? activeLink : ""}`}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <LanguageToggle size="sm" />

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button
                variant="secondary"
                size="sm"
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-label={open ? "Close menu" : "Open menu"}
              >
                {open ? <CloseIcon /> : <MenuIcon />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {open ? (
          <div className="lg:hidden">
            <Divider className="my-4" />
            <nav className="flex flex-col gap-3">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-sm px-3 py-2 ${linkBase} ${isActive ? activeLink + " bg-brand/10" : "hover:bg-surface"}`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
          </div>
        ) : null}
      </Container>

      <Divider />
    </header>
  );
}
