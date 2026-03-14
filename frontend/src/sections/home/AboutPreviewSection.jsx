// src/sections/home/AboutPreviewSection.jsx
import Section from "../../components/ui/Section";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import Reveal from "../../components/common/Reveal";
import Stagger, { StaggerItem } from "../../components/common/Stagger";

export default function AboutPreviewSection({ t, home, onNavigate }) {
  const section = home?.aboutPreview || {};
  const subtitle = section.subtitle || "";
  const bullets = (section.bullets || []).slice(0, 4);
  const image = section.image;

  return (
    <Section className="py-14 sm:py-16 relative">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-sky/10 blur-3xl" />
      </div>

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <Reveal>
              <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-brand/25 to-transparent" />

              <div className="inline-flex items-center rounded-full border border-brand/15 bg-white px-4 py-2 text-badge text-brand shadow-sm">
                {t("nav.about")}
              </div>

              <h2 className="mt-5 text-section-title leading-snug text-brand-900">
                {t("home.aboutPreview.title", "نبذة عن المركز")}
              </h2>
            </Reveal>

            {subtitle ? (
              <Reveal delay={0.08} y={14}>
                <p className="mt-4 max-w-2xl text-body leading-8 text-muted">
                  {subtitle}
                </p>
              </Reveal>
            ) : null}

            {bullets.length ? (
              <Stagger className="mt-6 grid gap-3 sm:grid-cols-2">
                {bullets.map((b, idx) => (
                  <StaggerItem key={idx}>
                    <div className="rounded-2xl border border-border bg-white px-4 py-4 shadow-sm ui-transition hover-lift">
                      <div className="flex items-start gap-3">
                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-sky shrink-0" />
                        <div className="text-small leading-7 text-text">{b}</div>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            ) : null}

            <Reveal delay={0.16} y={12}>
              <div className="mt-8">
                <Button
                  onClick={() => onNavigate("/about")}
                  className="rounded-full px-7 py-3 text-btn bg-brand text-white hover:bg-brand-900 min-h-[44px]"
                >
                  {t("common.learnMore", "Learn more")}
                </Button>
              </div>
            </Reveal>
          </div>

          {image?.src ? (
            <Reveal y={16} delay={0.08}>
              <div className="relative">
                <div className="absolute -inset-4 rounded-[32px] bg-sky/10 blur-2xl" />
                <div className="relative overflow-hidden rounded-3xl border border-border bg-white shadow-sm hidden sm:block">
                  <img
                    src={image.src}
                    alt={image.alt || "About"}
                    className="w-full h-[420px] object-cover hidden sm:block"
                    loading="lazy"
                  />
                </div>
              </div>
            </Reveal>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}