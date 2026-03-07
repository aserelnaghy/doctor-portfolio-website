import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import Reveal from "../components/common/Reveal";
import { getFaqContent } from "../content";

function FaqList({ items, dark = false }) {
  const [openIndex, setOpenIndex] = useState(items?.length ? 0 : -1);

  return (
    <div className="space-y-4">
      {(items || []).map((item, idx) => {
        const isOpen = idx === openIndex;

        return (
          <div
            key={idx}
            className={[
              "rounded-2xl border overflow-hidden ui-transition",
              dark
                ? isOpen
                  ? "bg-white/12 border-white/15"
                  : "bg-white/6 border-white/10 hover:bg-white/8"
                : isOpen
                  ? "bg-brand text-white border-brand"
                  : "bg-white border-border hover:bg-surface",
            ].join(" ")}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : idx)}
              className={[
                "w-full flex items-center justify-between gap-4 px-6 py-5 text-right",
                dark
                  ? "text-white"
                  : isOpen
                    ? "text-white"
                    : "text-brand-900",
              ].join(" ")}
            >
              <span className="text-[16px] sm:text-[18px] font-semibold leading-7">
                {item.q}
              </span>

              <span
                className={[
                  "shrink-0 text-[28px] leading-none font-light",
                  dark
                    ? "text-teal"
                    : isOpen
                      ? "text-white"
                      : "text-brand",
                ].join(" ")}
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>

            {isOpen ? (
              <div className="px-6 pb-6">
                <div
                  className={[
                    "text-[14px] leading-8",
                    dark ? "text-white/80" : "text-white",
                  ].join(" ")}
                >
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

export default function Faq() {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  const dir = i18n.dir?.() || (i18n.language?.startsWith("ar") ? "rtl" : "ltr");
  const isRTL = dir === "rtl";

  const data = useMemo(
    () => getFaqContent(i18n.language || "en"),
    [i18n.language]
  );

  return (
    <main className={isRTL ? "text-right" : "text-left"}>
      <Section className="py-16 sm:py-20 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-bg" />
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-teal/10 blur-3xl" />
        </div>

        <Container className="relative">
          <Reveal>
            <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-brand/20 to-transparent" />

            <div className="inline-flex items-center rounded-full border border-brand/15 bg-white px-4 py-2 text-[12px] font-semibold text-brand shadow-sm">
              {t("nav.faq")}
            </div>

            <h1 className="mt-5 text-[34px] sm:text-[44px] font-bold text-brand-900 leading-tight">
              {data.title || t("nav.faq")}
            </h1>

            {data.subtitle ? (
              <p className="mt-4 max-w-3xl text-[15px] leading-8 text-muted">
                {data.subtitle}
              </p>
            ) : null}
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-10 rounded-3xl border border-border bg-white p-5 sm:p-7 shadow-sm">
              <FaqList items={data.items || []} />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-10 rounded-3xl bg-brand-900 px-6 py-8 text-white shadow-sm sm:px-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <h2 className="text-[24px] sm:text-[28px] font-bold">
                    {data.cta?.title || t("faq.cta.title", "Still need help?")}
                  </h2>
                  <p className="mt-3 text-[14px] leading-8 text-white/80">
                    {data.cta?.subtitle ||
                      t(
                        "faq.cta.subtitle",
                        "If you did not find the answer you need, contact the center for further guidance."
                      )}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={() => navigate("/contact")}
                    className="rounded-full px-7 py-3 text-[14px] font-semibold bg-teal hover:bg-teal/90 text-white min-h-[44px]"
                  >
                    {t("common.contactUs", "Contact us")}
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}