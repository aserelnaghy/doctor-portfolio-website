// src/sections/home/StoriesPreviewSection.jsx
import Section from "../../components/ui/Section";
import Container from "../../components/ui/Container";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Reveal from "../../components/common/Reveal";
import Stagger, { StaggerItem } from "../../components/common/Stagger";

export default function StoriesPreviewSection({ t, home, onNavigate }) {
  const subtitle = home?.storiesPreview?.subtitle || "";
  const items = (home?.storiesPreview?.items || []).slice(0, 3);

  return (
    <Section className="py-14 relative overflow-hidden bg-brand-900 text-white">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/35" />
      <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-28 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

      <Container>
        <Reveal>
          <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-brand-900/20 to-transparent" />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-h2 text-white">{t("nav.stories")}</h2>
              {subtitle ? (
                <p className="mt-2 max-w-2xl text-body text-white/80">
                  {subtitle}
                </p>
              ) : null}
            </div>

            <div className="hidden sm:block">
              <Button
                onClick={() => onNavigate("/stories")}
                className="rounded-full px-6 py-3 text-[14px] font-semibold min-h-[44px]"
              >
                {t("common.viewAll", "View all")}
              </Button>
            </div>
          </div>
        </Reveal>

        <Stagger className="mt-10 grid gap-4 sm:grid-cols-3">
          {items.map((r, idx) => {
            const initial = (r?.name || "?").trim().charAt(0) || "?";
            return (
              <StaggerItem key={idx}>
                <Card className="rounded-2xl border border-border bg-gradient-to-b from-bg to-surface shadow-sm">
                  <p className="text-[13px] text-muted leading-relaxed">
                    “{r.quote}”
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-brand-900 text-white grid place-items-center text-xs font-semibold">
                      {initial}
                    </div>

                    <div>
                      <div className="text-[14px] font-semibold text-text">
                        {r.name}
                      </div>
                      {r.detail ? (
                        <div className="mt-0.5 text-[12px] text-muted">
                          {r.detail}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={0.05} y={12}>
          <div className="mt-8 sm:hidden">
            <Button
              onClick={() => onNavigate("/stories")}
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
