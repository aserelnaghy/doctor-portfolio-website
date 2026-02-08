// src/sections/home/ServicesPreviewSection.jsx
import Section from "../../components/ui/Section";
import Container from "../../components/ui/Container";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Reveal from "../../components/common/Reveal";
import Stagger, { StaggerItem } from "../../components/common/Stagger";

export default function ServicesPreviewSection({ t, home, onNavigate }) {
  const subtitle = home?.servicesPreview?.subtitle || "";
  const items = (home?.servicesPreview?.items || []).slice(0, 3);

  return (
    <Section className="py-14 relative">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <Container className="relative">
        <Reveal>
          <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-brand-900/25 to-transparent" />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-h2 text-brand-900">{t("nav.services")}</h2>
              {subtitle ? (
                <p className="mt-2 max-w-2xl text-body text-muted">{subtitle}</p>
              ) : null}
            </div>

            <div className="hidden sm:block">
              <Button
                onClick={() => onNavigate("/services")}
                className="rounded-full px-7 py-3 text-[14px] font-semibold bg-brand-900 text-white hover:bg-brand-900/90 min-h-[44px]"
              >
                {t("common.viewAll", "View all")}
              </Button>
            </div>
          </div>
        </Reveal>

        <Stagger className="mt-10 grid gap-4 sm:grid-cols-3">
          {items.map((s, idx) => (
            <StaggerItem key={idx}>
              <Card className="rounded-2xl border bg-gradient-to-b from-surface to-bg shadow-sm hover:shadow-md transition border-brand-900/30">
                <div className="text-[15px] font-semibold text-text">
                  {s.title}
                </div>
                <p className="mt-2 text-[13px] text-muted leading-relaxed">
                  {s.desc}
                </p>

                {s.image?.src ? (
                  <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-slate-100">
                    <img
                      src={s.image.src}
                      alt={s.image.alt || s.title}
                      className="h-[200px] w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : null}

                <div className="mt-4">
                  <Button
                    variant="secondary"
                    onClick={() => onNavigate("/services")}
                    className="rounded-full px-5 py-2 text-[13px] min-h-[44px]"
                  >
                    {t("common.learnMore", "Learn more")}
                  </Button>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.05} y={12}>
          <div className="mt-8 sm:hidden">
            <Button
              onClick={() => onNavigate("/services")}
              className="rounded-full px-7 py-3 text-[14px] font-semibold bg-brand-900 text-white hover:bg-brand-900/90 min-h-[44px]"
            >
              {t("common.viewAll", "View all")}
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
