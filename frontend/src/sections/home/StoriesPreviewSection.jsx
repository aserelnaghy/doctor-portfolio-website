import Section from "../../components/ui/Section";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import Reveal from "../../components/common/Reveal";
import Stagger, { StaggerItem } from "../../components/common/Stagger";

export default function StoriesPreviewSection({ t, home, onNavigate }) {
  const section = home?.storiesPreview || {};
  const subtitle = section.subtitle || "";
  const items = (section.items || []).slice(0, 3);

  return (
    <Section className="py-14 sm:py-16 relative overflow-hidden bg-brand-900 text-white">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-black/20" />
      <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-teal/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-28 h-96 w-96 rounded-full bg-sky/10 blur-3xl" />

      <Container className="relative">
        <Reveal>
          <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-h2 text-white">{t("nav.stories")}</h2>

              {subtitle && (
                <p className="mt-2 max-w-2xl text-body text-white/80">
                  {subtitle}
                </p>
              )}
            </div>

            <div className="hidden sm:block">
              <Button
                onClick={() => onNavigate("/stories")}
                className="rounded-full px-7 py-3 text-[14px] font-semibold bg-teal hover:bg-teal/90 text-white min-h-[44px]"
              >
                {t("common.viewAll", "View all")}
              </Button>
            </div>
          </div>
        </Reveal>

        <Stagger className="mt-10 grid gap-6 sm:grid-cols-3">
          {items.map((item, idx) => (
            <StaggerItem key={idx}>
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/8 backdrop-blur-sm">
                <video
                  src={item.videoUrl}
                  controls
                  className="w-full h-[360px] object-cover"
                />

                <div className="p-4">
                  <div className="text-[15px] font-semibold text-white">
                    {item.title}
                  </div>

                  {item.patientName && (
                    <div className="mt-1 text-[13px] text-white/70">
                      {item.patientName}
                    </div>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.05}>
          <div className="mt-8 sm:hidden">
            <Button
              onClick={() => onNavigate("/stories")}
              className="rounded-full px-7 py-3 text-[14px] font-semibold bg-teal hover:bg-teal/90 text-white min-h-[44px]"
            >
              {t("common.viewAll", "View all")}
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}