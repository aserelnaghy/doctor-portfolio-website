// src/sections/home/FaqPreviewSection.jsx
import Section from "../../components/ui/Section";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import Reveal from "../../components/common/Reveal";
import FaqAccordion from "../../components/ui/FaqAccordion";

export default function FaqPreviewSection({ t, home, onNavigate }) {
  const subtitle = home?.faqPreview?.subtitle || "";
  const items = (home?.faqPreview?.items || []).slice(0, 5);

  return (
    <Section className="py-16 relative overflow-hidden bg-brand-900 text-white">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/35" />
      <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-28 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* LEFT */}
          <Reveal>
            <div className="text-white">
              <div className="text-[20px] tracking-[0.1em] text-white/80">
                {t("nav.faq")}
              </div>

              {subtitle ? (
                <p className="mt-4 text-[40px] sm:text-[48px] leading-[1.05] font-semibold text-white leading-relaxed">
                  {subtitle}
                </p>
              ) : null}

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  onClick={() => onNavigate("/contact")}
                  className="rounded-full px-8 py-3.5 text-[14px] font-semibold bg-accent hover:bg-accent/90 text-white min-h-[44px]"
                >
                  {t("common.contactUs", "Contact us")}
                </Button>
              </div>
            </div>
          </Reveal>

          {/* RIGHT */}
          <FaqAccordion items={items} />
        </div>
      </Container>
    </Section>
  );
}
