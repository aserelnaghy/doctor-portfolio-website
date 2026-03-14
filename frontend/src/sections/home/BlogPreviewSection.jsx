import Section from "../../components/ui/Section";
import Container from "../../components/ui/Container";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Reveal from "../../components/common/Reveal";
import Stagger, { StaggerItem } from "../../components/common/Stagger";

export default function BlogPreviewSection({ t, home, onNavigate }) {
  const section = home?.blogPreview || {};
  const subtitle = section.subtitle || "";
  const posts = (section.posts || []).slice(0, 3);

  return (
    <Section className="py-14 sm:py-16 relative">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-teal/10 blur-3xl" />
      </div>

      <Container className="relative">
        <Reveal>
          <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-brand/25 to-transparent" />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-section-title text-brand-900">{t("nav.healthAwareness")}</h2>
              {subtitle ? (
                <p className="mt-2 max-w-2xl text-body text-muted leading-relaxed">
                  {subtitle}
                </p>
              ) : null}
            </div>

            <div className="hidden sm:block">
              <Button
                onClick={() => onNavigate("/health-awareness")}
                className="rounded-full px-7 py-3 text-btn bg-brand text-white hover:bg-brand-900 min-h-[44px]"
              >
                {t("common.viewAll", "View all")}
              </Button>
            </div>
          </div>
        </Reveal>

        <Stagger className="mt-10 grid gap-4 sm:grid-cols-3">
          {posts.map((p, idx) => (
            <StaggerItem key={idx}>
              <Card className="rounded-2xl border border-border bg-white shadow-sm hover:shadow-md transition overflow-hidden">
                <div className="p-5">
                  <div className="inline-flex items-center rounded-full bg-teal/10 px-3 py-1 text-badge text-teal">
                    {t("nav.healthAwareness")}
                  </div>

                  <div className="mt-4 text-card-title font-semibold leading-snug text-brand-900">
                    {p.title}
                  </div>

                  {p.date ? (
                    <div className="mt-2 text-badge text-muted">{p.date}</div>
                  ) : null}

                  <p className="mt-3 text-small text-muted leading-7">
                    {p.excerpt}
                  </p>

                  <div className="mt-5">
                    <Button
                      variant="secondary"
                      onClick={() => onNavigate(p.href || "/health-awareness")}
                      className="rounded-full px-5 py-2 text-small min-h-[44px]"
                    >
                      {t("common.readMore", "Read more")}
                    </Button>
                  </div>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.05} y={12}>
          <div className="mt-8 sm:hidden">
            <Button
              onClick={() => onNavigate("/health-awareness")}
              className="rounded-full px-7 py-3 text-btn bg-brand text-white hover:bg-brand-900 min-h-[44px]"
            >
              {t("common.viewAll", "View all")}
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
