import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import Reveal from "../components/common/Reveal";
import Stagger, { StaggerItem } from "../components/common/Stagger";

import ServiceCard from "../components/services/ServiceCard";
import { getServicesContent } from "../content"; // adjust import path

export default function Services() {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  const dir = i18n.dir?.() || (i18n.language?.startsWith("ar") ? "rtl" : "ltr");
  const isRTL = dir === "rtl";

  const data = useMemo(() => getServicesContent(i18n.language || "en"), [i18n.language]);

  return (
    <main className={isRTL ? "text-right" : "text-left"}>
      <Section className="py-16 sm:py-20 relative">
        {/* soft background like your sections */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
        </div>

        <Container className="relative">
          <Reveal>
            <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-brand-900/20 to-transparent" />

            <h1 className="text-[34px] sm:text-[44px] font-semibold text-brand-900 leading-tight">
              {data.title || t("nav.services")}
            </h1>

            {data.subtitle ? (
              <p className="mt-3 max-w-3xl text-body text-muted leading-relaxed">
                {data.subtitle}
              </p>
            ) : null}
          </Reveal>

          {/* Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(data.items || []).map((s, idx) => (
              <StaggerItem key={s.id || idx}>
                <ServiceCard
                  dir={dir}
                  title={s.title}
                  desc={s.desc}
                  image={s.image}
                  onReadMore={() => navigate(`/services#${s.id}`)}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>
    </main>
  );
}