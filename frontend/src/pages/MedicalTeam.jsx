// src/pages/MedicalTeam.jsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import Reveal from "../components/common/Reveal";
import Stagger, { StaggerItem } from "../components/common/Stagger";
import { getTeamContent } from "../content";

function TeamPageCard({ member, idx }) {
  return (
    <div className="rounded-3xl border border-border bg-white p-7 shadow-sm">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white font-bold">
        {idx + 1}
      </div>

      <h3 className="mt-5 text-card-title font-bold text-brand-900">
        {member.name}
      </h3>

      <div className="mt-2 text-body font-medium text-brand">
        {member.specialty}
      </div>

      {member.years ? (
        <div className="mt-3 inline-flex rounded-full bg-brand/8 px-3 py-1 text-badge text-brand">
          {member.years}
        </div>
      ) : null}

      {member.roleShort ? (
        <p className="mt-4 text-small leading-7 text-muted">
          {member.roleShort}
        </p>
      ) : null}

      {member.description ? (
        <p className="mt-4 text-small leading-8 text-muted">
          {member.description}
        </p>
      ) : null}
    </div>
  );
}

export default function MedicalTeam() {
  const { i18n } = useTranslation();

  const dir = i18n.dir?.() || (i18n.language?.startsWith("ar") ? "rtl" : "ltr");
  const isRTL = dir === "rtl";

  const data = useMemo(
    () => getTeamContent(i18n.language || "en"),
    [i18n.language]
  );

  return (
    <main className={isRTL ? "text-right" : "text-left"}>
      <Section className="py-16 sm:py-20 relative">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-teal/10 blur-3xl" />
        </div>

        <Container className="relative">
          <Reveal>
            <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-brand/20 to-transparent" />

            <div className="inline-flex items-center rounded-full border border-brand/15 bg-white px-4 py-2 text-badge text-brand shadow-sm">
              {data.badge}
            </div>

            <h1 className="mt-5 text-page-title text-brand-900 leading-tight">
              {data.title}
            </h1>

            {data.subtitle ? (
              <p className="mt-4 max-w-3xl text-body leading-8 text-muted">
                {data.subtitle}
              </p>
            ) : null}
          </Reveal>

          {data.approach ? (
            <Reveal delay={0.05}>
              <div className="mt-10 rounded-3xl border border-border bg-white p-8 shadow-sm">
                <h2 className="text-section-title font-bold text-brand-900">
                  {data.approach.title}
                </h2>

                <p className="mt-4 text-body leading-8 text-muted">
                  {data.approach.description}
                </p>

                {data.approach.points?.length ? (
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {data.approach.points.map((point, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-border bg-bg px-5 py-4 text-small leading-7 text-text"
                      >
                        {point}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </Reveal>
          ) : null}

          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(data.members || []).map((member, idx) => (
              <StaggerItem key={idx}>
                <TeamPageCard member={member} idx={idx} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>
    </main>
  );
}