import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { getHealthContent } from "../content";

import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import Reveal from "../components/common/Reveal";
import Stagger, { StaggerItem } from "../components/common/Stagger";

function InfoCard({ title, children }) {
  return (
    <div className="rounded-3xl border border-border bg-white p-7 shadow-sm">
      <h3 className="text-card-title font-bold text-brand-900">{title}</h3>
      <div className="mt-4 text-body leading-8 text-muted">{children}</div>
    </div>
  );
}

export default function HealthAwareness() {
  const { i18n, t } = useTranslation();

  const dir = i18n.dir?.() || (i18n.language?.startsWith("ar") ? "rtl" : "ltr");
  const isRTL = dir === "rtl";

  const data = useMemo(
    () => getHealthContent(i18n.language || "en"),
    [i18n.language]
  );

  return (
    <main className={isRTL ? "text-right" : "text-left"}>
      <Section className="py-16 sm:py-20 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-bg" />
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-teal/10 blur-3xl" />
        </div>

        <Container className="relative">
          <Reveal>
            <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-brand/20 to-transparent" />

            <div className="inline-flex items-center rounded-full border border-brand/15 bg-white px-4 py-2 text-badge text-brand shadow-sm">
              {t("nav.healthAwareness")}
            </div>

            <h1 className="mt-5 text-page-title text-brand-900 leading-tight">
              {data.title || t("nav.healthAwareness")}
            </h1>
          </Reveal>

          <Stagger className="mt-10 grid gap-6 lg:grid-cols-2">
            <StaggerItem>
              <InfoCard title={data.diabeticFoot?.title}>
                {data.diabeticFoot?.description}
              </InfoCard>
            </StaggerItem>

            <StaggerItem>
              <InfoCard title={data.whyDangerous?.title}>
                {data.whyDangerous?.description}
              </InfoCard>
            </StaggerItem>
          </Stagger>

          {data.whenToSeeDoctor ? (
            <Reveal delay={0.05}>
              <div className="mt-8 rounded-3xl border border-border bg-white p-7 shadow-sm">
                <h2 className="text-section-title text-brand-900">
                  {data.whenToSeeDoctor.title}
                </h2>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {(data.whenToSeeDoctor.items || []).map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-border bg-bg px-5 py-4 text-small leading-7 text-text"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ) : null}

          {data.earlyDetection ? (
            <Reveal delay={0.07}>
              <div className="mt-8 rounded-3xl border border-border bg-white p-7 shadow-sm">
                <h2 className="text-section-title text-brand-900">
                  {data.earlyDetection.title}
                </h2>
                <p className="mt-4 text-body leading-8 text-muted">
                  {data.earlyDetection.description}
                </p>
              </div>
            </Reveal>
          ) : null}

          {data.prevention ? (
            <Reveal delay={0.09}>
              <div className="mt-8 rounded-3xl border border-sky bg-sky/15 px-7 py-8 shadow-sm">

                <h2 className="text-section-title text-brand-900">
                  {data.prevention.title}
                </h2>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {(data.prevention.tips || []).map((tip, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-sky bg-white px-5 py-4 text-small leading-7 text-text"
                    >
                      {tip}
                    </div>
                  ))}
                </div>

              </div>
            </Reveal>
          ) : null}

          {data.whenToWorry ? (
            <Reveal delay={0.11}>
              <div className="mt-8 rounded-3xl border border-danger bg-danger/10 p-7 shadow-sm relative">
                
                <span className="absolute top-0 bottom-0 start-0 w-1 bg-danger rounded-s-3xl"></span>

                <h2 className="text-section-title text-danger">
                  {data.whenToWorry.title}
                </h2>

                <p className="mt-4 text-body leading-8 text-text">
                  {data.whenToWorry.description}
                </p>

              </div>
            </Reveal>
          ) : null}

          {data.commonMistakes ? (
            <Reveal delay={0.13}>
              <div className="mt-8 rounded-3xl border border-border bg-white p-7 shadow-sm">
                <h2 className="text-section-title text-brand-900">
                  {data.commonMistakes.title}
                </h2>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {(data.commonMistakes.items || []).map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-border bg-bg px-5 py-4 text-small leading-7 text-text"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                {data.commonMistakes.note ? (
                  <p className="mt-5 text-small leading-8 text-muted">
                    {data.commonMistakes.note}
                  </p>
                ) : null}
              </div>
            </Reveal>
          ) : null}

          {data.references?.length ? (
            <Reveal delay={0.15}>
              <div className="mt-8 rounded-3xl border border-border bg-white p-7 shadow-sm">
                <h2 className="text-section-title text-brand-900">
                  {t("health.referencesTitle", "Scientific References")}
                </h2>

                <div className="mt-5 space-y-3">
                  {data.references.map((ref, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-border bg-bg px-5 py-4 text-small leading-7 text-text"
                    >
                      {ref}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ) : null}
        </Container>
      </Section>
    </main>
  );
}