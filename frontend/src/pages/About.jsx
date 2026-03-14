import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { getAboutContent } from "../content";

export default function About() {
  const { i18n } = useTranslation();

  const about = useMemo(() => {
    const lang = i18n.language || "en";
    return getAboutContent(lang);
  }, [i18n.language]);

  return (
    <main className="bg-bg text-text">
      <section className="bg-white border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <h1 className="text-page-title font-bold text-brand-900">
            {about.hero.title}
          </h1>
          <p className="mt-5 max-w-3xl text-body leading-8 text-muted">
            {about.hero.subtitle}
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-3xl border border-border bg-white p-8 shadow-sm">
              <h2 className="text-section-title font-bold text-brand-900">
                {about.intro.title}
              </h2>

              <div className="mt-5 space-y-5">
                {about.intro.paragraphs.map((p, idx) => (
                  <p key={idx} className="text-body text-muted">
                    {p}
                  </p>
                ))}
              </div>
            </div>

            <div className="grid gap-6">
              <div className="rounded-3xl bg-brand text-white p-7 shadow-sm">
                <h3 className="text-card-title font-bold">{about.vision.title}</h3>
                <p className="mt-4 text-small leading-8 text-white/85">
                  {about.vision.description}
                </p>
              </div>

              <div className="rounded-3xl border border-border bg-white p-7 shadow-sm">
                <h3 className="text-card-title font-bold text-brand-900">
                  {about.mission.title}
                </h3>
                <p className="mt-4 text-small leading-8 text-muted">
                  {about.mission.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border bg-bg p-8 shadow-sm">
            <h2 className="text-section-title font-bold text-brand-900">
              {about.philosophy.title}
            </h2>

            <div className="mt-5 space-y-5">
              {about.philosophy.paragraphs.map((p, idx) => (
                <p key={idx} className="text-body text-muted">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-section-title font-bold text-brand-900">
            {about.approach.title}
          </h2>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {about.approach.steps.map((step, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-border bg-white p-7 shadow-sm"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/10 text-brand-900 font-bold">
                  {idx + 1}
                </div>

                <h3 className="mt-5 text-card-title font-bold text-brand-900">
                  {step.title}
                </h3>

                <p className="mt-4 text-small leading-8 text-muted">
                  {step.description}
                </p>

                {step.note ? (
                  <p className="mt-4 text-small leading-8 text-brand">
                    {step.note}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
