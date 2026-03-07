import { useState } from "react";
import Section from "../../components/ui/Section";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import Reveal from "../../components/common/Reveal";

function FaqList({ items }) {
  const [openIndex, setOpenIndex] = useState(items?.length ? 0 : -1);

  return (
    <div className="space-y-4">
      {(items || []).map((item, idx) => {
        const isOpen = idx === openIndex;

        return (
          <div
            key={idx}
            className={[
              "rounded-2xl border overflow-hidden ui-transition relative",
              isOpen
                ? "bg-white border-teal shadow-md"
                : "bg-white border-white/20 hover:border-white/35",
            ].join(" ")}
          >
            {isOpen ? (
              <span className="pointer-events-none absolute inset-y-0 start-0 w-1 bg-teal" />
            ) : null}

            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : idx)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-right"
            >
              <span className="text-[16px] sm:text-[18px] font-semibold leading-7 text-brand-900">
                {item.q}
              </span>

              <span
                className={[
                  "shrink-0 text-[28px] leading-none font-light ui-transition",
                  isOpen ? "text-teal" : "text-brand",
                ].join(" ")}
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>

            {isOpen ? (
              <div className="px-6 pb-6 border-t border-border">
                <div className="pt-4 text-[14px] leading-8 text-muted">
                  {item.a}
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default function FaqPreviewSection({ t, home, onNavigate }) {
  const section = home?.faqPreview || {};
  const subtitle = section.subtitle || "";
  const items = (section.items || []).slice(0, 5);

  return (
    <Section className="py-16 sm:py-20 relative overflow-hidden bg-brand-900 text-white">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-black/20" />
      <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-teal/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-28 h-96 w-96 rounded-full bg-sky/10 blur-3xl" />

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <Reveal>
            <div className="text-white">
              <div className="inline-flex items-center rounded-full border border-white/15 bg-white/8 px-4 py-2 text-[12px] font-semibold tracking-[0.08em] text-white/85">
                {t("nav.faq")}
              </div>

              {subtitle ? (
                <h2 className="mt-5 text-[34px] sm:text-[42px] lg:text-[50px] leading-[1.12] font-bold text-white">
                  {subtitle}
                </h2>
              ) : null}

              <p className="mt-4 max-w-xl text-[15px] leading-8 text-white/75">
                {t(
                  "home.faqPreview.supportText",
                  "إجابات مختصرة وواضحة على أكثر الأسئلة شيوعاً حول القدم السكري، الوقاية، ومتى يجب طلب التقييم الطبي."
                )}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  onClick={() => onNavigate("/faq")}
                  className="rounded-full px-8 py-3.5 text-[14px] font-semibold bg-teal hover:bg-teal/90 text-white min-h-[44px]"
                >
                  {t("common.viewAll", "View all")}
                </Button>

                <Button
                  onClick={() => onNavigate("/contact")}
                  className="rounded-full px-8 py-3.5 text-[14px] font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/15 min-h-[44px]"
                >
                  {t("common.contactUs", "Contact us")}
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="rounded-3xl border border-white/10 bg-white/8 p-4 sm:p-5 backdrop-blur-sm">
              <FaqList items={items} />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}