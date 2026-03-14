// src/sections/home/TeamPreviewSection.jsx
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Section from "../../components/ui/Section";
import Container from "../../components/ui/Container";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Reveal from "../../components/common/Reveal";
import Stagger, { StaggerItem } from "../../components/common/Stagger";

function getInitial(name) {
  if (!name) return "?";

  const clean = String(name)
    .replace(/\u00A0/g, " ")
    .trim()
    .replace(/^(د)\s*\.?\s*/i, "")
    .replace(/^(dr)\s*\.?\s*/i, "")
    .replace(/^(doctor)\s+/i, "")
    .trim();

  return clean.charAt(0) || "?";
}

function TeamMiniCard({ m, detailsLabel, yearsLabel, onClick }) {
  const initial = getInitial(m?.name);

  return (
    <Card
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.();
      }}
      className={[
        "group relative rounded-3xl border border-border bg-white",
        "shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer will-change-transform",
        "hover:-translate-y-1 hover:scale-[1.01]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

      <div className="relative p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-card-title font-semibold text-brand-900 truncate">
              {m.name}
            </div>
            <div className="mt-1 text-small text-muted truncate">
              {m.specialty}
            </div>
          </div>

          <div className="h-11 w-11 rounded-2xl bg-brand text-white grid place-items-center text-small font-semibold shrink-0 transition-transform duration-200 group-hover:scale-105">
            {initial}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-small text-muted">
          <span className="h-2 w-2 rounded-full bg-teal shrink-0 transition-transform duration-200 group-hover:scale-110" />
          <span className="truncate">{m.roleShort}</span>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="rounded-full bg-brand/8 px-3 py-1 text-badge text-brand whitespace-nowrap transition-colors duration-200 group-hover:bg-brand/12">
            {yearsLabel}
          </span>

          <span className="text-badge text-brand opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            {detailsLabel}
          </span>
        </div>

        <div className="mt-4 h-[2px] w-8 rounded-full bg-teal/80 group-hover:w-14 transition-all duration-200" />
      </div>
    </Card>
  );
}

export default function TeamPreviewSection({ home }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const dir = i18n.dir?.() || (i18n.language?.startsWith("ar") ? "rtl" : "ltr");
  const isRTL = dir === "rtl";

  const section = home?.teamPreview || {};
  const members = section.members || [];

  const kicker = section.kicker || t("home.teamPreview.kicker", "الفريق الطبي");
  const title =
    section.title || t("home.teamPreview.title", "فريق طبي متخصص ونهج علاجي منظم");
  const subtitle =
    section.subtitle ||
    t(
      "home.teamPreview.subtitle",
      "فريق يعمل وفق تقييم دقيق للحالة، وخطة علاج مناسبة، ومتابعة منظمة تدعم الحفاظ على الطرف وتقليل المضاعفات."
    );

  const ctaTeam = section.ctaTeam || t("home.teamPreview.ctaTeam", "عرض الصفحة");
  const hint =
    section.hint ||
    t(
      "home.teamPreview.hint",
      "تعرف على منهج المركز والفريق الطبي والنهج العلاجي بشكل أكثر تفصيلاً داخل الصفحة."
    );

  const detailsLabel = section.detailsHint || t("home.teamPreview.detailsHint", "عرض التفاصيل");

  return (
    <Section className="py-16 sm:py-20 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-bg" />
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-teal/10 blur-3xl" />
      </div>

      <Container className="relative">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div className={isRTL ? "text-right" : "text-left"}>
              <div className="inline-flex items-center rounded-full border border-brand/15 bg-white px-4 py-2 text-badge text-brand shadow-sm">
                {kicker}
              </div>

              <h2 className="mt-4 text-section-title text-brand-900 leading-snug">
                {title}
              </h2>

              <p className="mt-3 text-body text-muted leading-8 max-w-2xl">
                {subtitle}
              </p>
            </div>

            <div className={isRTL ? "lg:text-left" : "lg:text-right"}>
              <div className="flex flex-wrap gap-3 lg:justify-end items-center">
                <Button
                  onClick={() => navigate("/medical-team")}
                  className="rounded-full px-7 py-2.5 text-btn bg-brand text-white hover:bg-brand-900 min-h-[44px]"
                >
                  {ctaTeam}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 rounded-3xl bg-white/80 border border-border p-6 sm:p-8 shadow-sm">
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {members.slice(0, 4).map((m, idx) => (
              <StaggerItem key={idx} y={10}>
                <Reveal y={16} delay={0.06 * idx}>
                  <TeamMiniCard
                    m={m}
                    detailsLabel={detailsLabel}
                    yearsLabel={t("home.teamPreview.yearsBadge", { years: m.years || "—" })}
                    onClick={() => navigate("/medical-team")}
                  />
                </Reveal>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.08}>
            <div className="mt-6 text-badge text-muted">
              {hint}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}