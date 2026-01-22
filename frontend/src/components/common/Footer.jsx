import { NavLink } from "react-router-dom";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { getSiteContent } from "../../content"; // adjust if your content path differs

import Container from "../ui/Container";
import Section from "../ui/Section";
import Button from "../ui/Button";
import Grid from "./Grid";
import Stack from "./Stack";
import Divider from "./Divider";
import IconText from "./IconText";

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 3.5l3 1.5-1.3 3c.8 1.5 2 2.7 3.5 3.5l3-1.3 1.5 3c.2.5 0 1.1-.4 1.5l-1.6 1.6c-.6.6-1.5.8-2.3.5-6.1-2.3-10.4-6.6-12.7-12.7-.3-.8-.1-1.7.5-2.3L5 3.9c.4-.4 1-.6 1.5-.4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 22s7-4.5 7-12a7 7 0 1 0-14 0c0 7.5 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Footer() {
  const { t, i18n } = useTranslation();

  // pull from the same en/ar structure (siteEN/siteAR)
  const site = useMemo(() => {
    const lang = i18n.language || "en";
    return getSiteContent(lang);
  }, [i18n.language]);

  const brandName = site?.brand?.name || site?.clinicName || t("footer.brand", "Dr. Youssry");
  const brandTagline = site?.brand?.tagline || t("footer.tagline", "Medical Center");

  const phoneDisplay = site?.phoneDisplay || site?.phoneTel || "";
  const phoneTel = (site?.phoneTel || phoneDisplay || "").replace(/\s+/g, "");
  const address = site?.address || "";

  // hours: supports either site.hours array OR fallback translation
  const hoursText =
    (Array.isArray(site?.hours) && site.hours[0]?.time) ||
    t("home.hoursFallback", "Sun–Thu 9:30 AM – 5:30 PM");

  // socials (optional)
  const socials = site?.socials || site?.social || {};

  return (
    <footer className="bg-surface">
      <Section className="py-12">
        <Container>
          <Grid cols={3} gap="lg">
            {/* Brand / About */}
            <Stack gap="md">
              <div className="leading-tight">
                <div className="text-body font-semibold text-brand-900">
                  {site?.clinicName || site?.legalName || brandName}
                </div>
                <div className="text-small text-muted">{t("footer.tagline", brandTagline)}</div>
              </div>

              <p className="text-body text-muted">{t("footer.about")}</p>

              <div className="flex flex-wrap gap-3">
                {phoneTel ? (
                  <a href={`tel:${phoneTel}`}>
                    <Button size="sm">{t("common.callNow", "Call now")}</Button>
                  </a>
                ) : (
                  <Button size="sm" disabled>
                    {t("common.callNow", "Call now")}
                  </Button>
                )}

                <NavLink to="/contact">
                  <Button size="sm" variant="secondary">
                    {t("common.contactUs", "Contact us")}
                  </Button>
                </NavLink>
              </div>
            </Stack>

            {/* Quick links */}
            <Stack gap="md">
              <div className="text-body font-semibold text-text">
                {t("footer.quickLinks", "Quick Links")}
              </div>

              <div className="flex flex-col gap-2">
                <NavLink className="text-body text-muted hover:text-brand-900" to="/about">
                  {t("nav.about")}
                </NavLink>
                <NavLink className="text-body text-muted hover:text-brand-900" to="/services">
                  {t("nav.services")}
                </NavLink>
                <NavLink className="text-body text-muted hover:text-brand-900" to="/stories">
                  {t("nav.stories")}
                </NavLink>
                <NavLink className="text-body text-muted hover:text-brand-900" to="/blog">
                  {t("nav.blog")}
                </NavLink>
                <NavLink className="text-body text-muted hover:text-brand-900" to="/faq">
                  {t("nav.faq")}
                </NavLink>
                <NavLink className="text-body text-muted hover:text-brand-900" to="/contact">
                  {t("nav.contact")}
                </NavLink>
              </div>
            </Stack>

            {/* Contact info */}
            <Stack gap="md">
              <div className="text-body font-semibold text-text">{t("footer.contact", "Contact")}</div>

              <Stack gap="sm">
                <IconText
                  icon={<PhoneIcon />}
                  title={t("footer.phone", "Phone")}
                  description={
                    phoneTel ? (
                      <a
                        href={`tel:${phoneTel}`}
                        dir="ltr"
                        className="hover:underline"
                        style={{ unicodeBidi: "isolate" }}
                      >
                        {phoneDisplay || phoneTel}
                      </a>
                    ) : (
                      phoneDisplay
                    )
                  }
                />

                <IconText
                  icon={<PinIcon />}
                  title={t("footer.location", "Location")}
                  description={address}
                />

                <IconText
                  icon={<ClockIcon />}
                  title={t("footer.hoursTitle", "Working Hours")}
                  description={hoursText}
                />
              </Stack>

              <div className="flex items-center gap-3">
                {socials.facebook ? (
                  <a
                    className="text-body text-muted hover:text-brand-900"
                    href={socials.facebook}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                  >
                    {t("footer.social.facebook", "Facebook")}
                  </a>
                ) : null}

                {socials.instagram ? (
                  <a
                    className="text-body text-muted hover:text-brand-900"
                    href={socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                  >
                    {t("footer.social.instagram", "Instagram")}
                  </a>
                ) : null}
              </div>
            </Stack>
          </Grid>

          <Divider className="my-8" />

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-small text-muted">
              © {new Date().getFullYear()} {site?.clinicName || site?.legalName || brandName}.{" "}
              {t("footer.rights", "All rights reserved.")}
            </div>

            <div className="text-small text-muted">
              <NavLink className="hover:text-brand-900" to="/privacy">
                {t("footer.privacy", "Privacy")}
              </NavLink>
              <span className="mx-2">•</span>
              <NavLink className="hover:text-brand-900" to="/terms">
                {t("footer.terms", "Terms")}
              </NavLink>
            </div>
          </div>
        </Container>
      </Section>
    </footer>
  );
}
