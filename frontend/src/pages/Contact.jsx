// src/pages/Contact.jsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { getContactContent, getSiteContent } from "../content";

import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import Reveal from "../components/common/Reveal";
import Button from "../components/ui/Button";

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.07 21 3 13.93 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="m4 8 8 6 8-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfoCard({ icon, title, children }) {
  return (
    <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand shrink-0">
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-card-title font-bold text-brand-900">{title}</h3>
          <div className="mt-3 text-small leading-8 text-muted">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  const { i18n, t } = useTranslation();

  const dir = i18n.dir?.() || (i18n.language?.startsWith("ar") ? "rtl" : "ltr");
  const isRTL = dir === "rtl";

  const contact = useMemo(
    () => getContactContent(i18n.language || "en"),
    [i18n.language]
  );

  const site = useMemo(
    () => getSiteContent(i18n.language || "en"),
    [i18n.language]
  );

  const phoneDisplay = site?.phoneDisplay || site?.phoneTel || "";
  const phoneTel = (site?.phoneTel || phoneDisplay || "").replace(/\s+/g, "");
  const email = site?.email || "";
  const address = site?.address || "";
  const hours =
    (Array.isArray(site?.hours) && site.hours[0]?.time) ||
    t("home.hoursFallback", "Sun–Thu 9:30 AM – 5:30 PM");

  const mapEmbed = site?.mapEmbed || "";
  const mapUrl = site?.mapUrl || "";

  return (
    <main className={isRTL ? "text-right" : "text-left"}>
      <Section className="py-16 sm:py-20 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-bg" />
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-sky/10 blur-3xl" />
        </div>

        <Container className="relative">
          <Reveal>
            <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-brand/20 to-transparent" />

            <div className="inline-flex items-center rounded-full border border-brand/15 bg-white px-4 py-2 text-badge text-brand shadow-sm">
              {t("nav.contact")}
            </div>

            <h1 className="mt-5 text-page-title text-brand-900 leading-tight">
              {contact.title || t("nav.contact")}
            </h1>

            {contact.description ? (
              <p className="mt-4 max-w-3xl text-body text-muted">
                {contact.description}
              </p>
            ) : null}
          </Reveal>

          <div
            className={[
              "mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]",
              isRTL ? "lg:[direction:rtl]" : "",
            ].join(" ")}
          >
            <Reveal delay={0.05}>
              <div className={isRTL ? "lg:order-2" : "lg:order-1"}>
                <div className="rounded-3xl border border-border bg-white p-6 shadow-sm h-full">
                  <h2 className="text-card-title font-bold text-brand-900">
                    {t("contact.quickReach", "Quick Reach")}
                  </h2>

                  <p className="mt-3 text-small leading-8 text-muted">
                    {t(
                      "contact.quickReachText",
                      "Call the center directly or use the location details below to reach the clinic."
                    )}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {phoneTel ? (
                      <Button
                        onClick={() => (window.location.href = `tel:${phoneTel}`)}
                        className="rounded-full px-7 py-3 text-btn bg-teal hover:bg-teal/90 text-white min-h-[44px]"
                      >
                        {t("common.callNow", "Call now")}
                      </Button>
                    ) : null}

                    {mapUrl ? (
                      <Button
                        onClick={() => window.open(mapUrl, "_blank", "noopener,noreferrer")}
                        className="rounded-full px-7 py-3 text-btn bg-white text-brand border border-border hover:bg-bg min-h-[44px]"
                      >
                        {t("contact.openMap", "Open map")}
                      </Button>
                    ) : null}
                  </div>

                  <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-bg min-h-[320px]">
                    {mapEmbed ? (
                      <iframe
                        title="Clinic location map"
                        src={mapEmbed}
                        className="h-[320px] w-full border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    ) : (
                      <div className="flex h-[320px] items-center justify-center p-6 text-center text-small leading-8 text-muted">
                        {address || t("contact.mapFallback", "Map location can be added here.")}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className={isRTL ? "lg:order-1" : "lg:order-2"}>
                <div className="grid gap-5">
                  <InfoCard icon={<PhoneIcon />} title={t("common.phone", "Phone")}>
                    {phoneTel ? (
                      <a
                        href={`tel:${phoneTel}`}
                        dir="ltr"
                        className="text-brand hover:underline"
                        style={{ unicodeBidi: "isolate" }}
                      >
                        {phoneDisplay}
                      </a>
                    ) : (
                      <span>{phoneDisplay || "—"}</span>
                    )}
                  </InfoCard>

                  <InfoCard icon={<PinIcon />} title={t("footer.location", "Location")}>
                    <div className="whitespace-pre-line">{address || "—"}</div>
                  </InfoCard>

                  <InfoCard icon={<ClockIcon />} title={t("footer.hoursTitle", "Working Hours")}>
                    <div>{hours}</div>
                  </InfoCard>

                  {email ? (
                    <InfoCard icon={<MailIcon />} title={t("common.email", "Email")}>
                      <a href={`mailto:${email}`} className="text-brand hover:underline">
                        {email}
                      </a>
                    </InfoCard>
                  ) : null}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </main>
  );
}