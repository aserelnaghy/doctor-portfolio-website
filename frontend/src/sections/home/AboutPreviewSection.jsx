// src/sections/home/AboutPreviewSection.jsx
import Section from "../../components/ui/Section";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import Reveal from "../../components/common/Reveal";
import Stagger, { StaggerItem } from "../../components/common/Stagger";

export default function AboutPreviewSection({ t, home, onNavigate }) {
  const subtitle = home?.aboutPreview?.subtitle || "";
  const bullets = (home?.aboutPreview?.bullets || []).slice(0, 4);
  const image = home?.aboutPreview?.image;

  return (
    <Section className="py-14 relative">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* LEFT */}
          <div>
            <Reveal>
              <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-brand-900/25 to-transparent" />
              <h2 className="text-h2 text-brand-900">{t("nav.about")}</h2>
            </Reveal>

            {subtitle ? (
              <Reveal delay={0.1} y={14}>
                <p className="mt-3 text-body text-muted leading-relaxed max-w-xl">
                  {subtitle}
                </p>
              </Reveal>
            ) : null}

            {bullets.length ? (
              <Stagger className="mt-6">
                <ul className="space-y-3">
                  {bullets.map((b, idx) => (
                    <StaggerItem key={idx}>
                      <li className="flex items-start gap-3 rounded-xl border border-border bg-white/40 px-4 py-3">
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-accent shrink-0" />
                        <div className="text-[14px] text-muted leading-relaxed">
                          {b}
                        </div>
                      </li>
                    </StaggerItem>
                  ))}
                </ul>
              </Stagger>
            ) : null}

            <Reveal delay={0.18} y={12}>
              <div className="mt-8">
                <Button
                  onClick={() => onNavigate("/about")}
                  className="rounded-full px-7 py-3 text-[14px] font-semibold bg-brand-900 text-white hover:bg-brand-900/90 min-h-[44px]"
                >
                  {t("common.learnMore", "Learn more")}
                </Button>
              </div>
            </Reveal>
          </div>

          {/* RIGHT */}
          {image?.src ? (
            <Reveal y={16} delay={0.08}>
              <div className="relative">
                <div className="overflow-hidden rounded-3xl border border-border shadow-sm bg-white hidden sm:block">
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
