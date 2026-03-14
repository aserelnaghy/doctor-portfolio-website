import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import Reveal from "../components/common/Reveal";
import Stagger, { StaggerItem } from "../components/common/Stagger";

import ServiceCard from "../components/services/ServiceCard";
import { getServicesContent } from "../content";

export default function Services() {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  const dir = i18n.dir?.() || (i18n.language?.startsWith("ar") ? "rtl" : "ltr");
  const isRTL = dir === "rtl";

  const data = useMemo(
    () => getServicesContent(i18n.language || "en"),
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

            <h1 className="text-page-title text-brand-900 leading-tight">
              {data.title || t("nav.services")}
            </h1>

            {data.subtitle ? (
              <p className="mt-3 max-w-3xl text-body text-muted leading-8">
                {data.subtitle}
              </p>
            ) : null}
          </Reveal>

          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(data.items || []).map((s, idx) => (
              <StaggerItem key={s.id || idx}>
                <ServiceCard
                  dir={dir}
                  title={s.title}
                  desc={s.desc}
                  image={s.image}
                  onReadMore={() =>
                    s.id ? navigate(`/services#${s.id}`) : navigate("/contact")
                  }
                />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>
    </main>
  );
}