// src/sections/home/HeroSection.jsx
import { useMemo } from "react";

import Container from "../../components/ui/Container";
import Grid from "../../components/common/Grid";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Reveal from "../../components/common/Reveal";
import Stagger, { StaggerItem } from "../../components/common/Stagger";

export default function HeroSection({
  t,
  isRTL,
  home,
  site,
  phoneDisplay,
  phoneTel,
  onCallNow,
  onNavigate,
}) {
  const hero = home?.hero || {};

  const vm = useMemo(() => {
    const heroKicker =
      hero.kicker || "DIABETIC FOOT CARE | WOUND CARE | LIMB PRESERVATION";

    return {
      kicker: heroKicker,
      title: hero.title || "",
      subtitle: hero.subtitle || "",
      bullets: (hero.bullets || []).slice(0, 3),
      stats: (hero.stats || []).slice(0, 3),
      primaryLabel: t("common.callNow", "Call now"),
      secondaryLabel: t("common.viewServices", "View services"),
      imgSrc: hero?.image || hero?.imageUrl || "",
      imgAlt: hero?.imageAlt || "Doctor",
      hours:
        site?.hours?.[0]?.time ||
        t("home.hoursFallback", "Sun–Thu 9:30 AM – 5:30 PM"),
    };
  }, [hero, site, t]);

  return (
    <section className="relative overflow-hidden text-white -mt-16 sm:-mt-20 pt-16 sm:pt-20">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand to-[#1f5d73]" />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/6 via-transparent to-black/25" />

      <div className="pointer-events-none absolute -top-48 -left-48 h-[640px] w-[640px] rounded-full bg-sky/15 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-56 -right-56 h-[720px] w-[720px] rounded-full bg-teal/20 blur-3xl" />

      <div className="pointer-events-none absolute inset-0 hero-bg opacity-60" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(255,255,255,0.22) 0, rgba(255,255,255,0.22) 1px, transparent 1px, transparent 18px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* Mobile image */}
      {vm.imgSrc ? (
        <div className="relative sm:hidden -mx-4 mb-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-black/25 pointer-events-none" />
          <img
            src={vm.imgSrc}
            alt={vm.imgAlt}
            className="w-full h-[320px] object-cover object-top"
          />
        </div>
      ) : null}

      {/* Desktop image */}
      <div
        className={[
          "pointer-events-none absolute inset-y-0 w-[50%] min-w-[500px] hidden sm:block",
          isRTL ? "left-[2%]" : "right-[2%]",
        ].join(" ")}
      >
        {vm.imgSrc ? (
          <img
            src={vm.imgSrc}
            alt={vm.imgAlt}
            className={[
              "absolute bottom-0 h-[90%] w-auto max-w-none object-contain",
              isRTL ? "left-[4%]" : "right-[4%]",
            ].join(" ")}
          />
        ) : null}
      </div>

      <Container className="relative">
        <div className="min-h-0 sm:min-h-[78vh] pt-2 sm:pt-14 pb-20 sm:pb-28">
          <Grid cols={2} gap="lg" className="items-start">

            <div className="max-w-[620px] pt-4 sm:pt-6">

              <Reveal>
                <div className="text-[11px] sm:text-[12px] tracking-[0.25em] uppercase text-white/70">
                  {vm.kicker}
                </div>
              </Reveal>

              <Reveal delay={0.06} y={24}>
                <h1 className="mt-4 text-[46px] sm:text-[60px] leading-[1.02] font-bold">
                  {vm.title}
                </h1>
              </Reveal>

              <Reveal delay={0.14} y={18}>
                <p className="mt-4 text-body text-white/85 leading-[1.8] max-w-[540px]">
                  {vm.subtitle}
                </p>
              </Reveal>

              {vm.bullets.length ? (
                <Stagger className="mt-6">
                  <ul className="space-y-3 text-body text-white/90">
                    {vm.bullets.map((b, idx) => (
                      <StaggerItem key={idx}>
                        <li className="flex gap-3">
                          <span className="mt-[10px] h-2.5 w-2.5 rotate-45 rounded-[2px] bg-teal shrink-0" />
                          <span>{b}</span>
                        </li>
                      </StaggerItem>
                    ))}
                  </ul>
                </Stagger>
              ) : null}

              <Reveal delay={0.22} y={16}>
                <div className="mt-8 flex flex-wrap gap-3">

                  <Button
                    onClick={onCallNow}
                    className="rounded-full px-8 py-3.5 text-[14px] font-semibold bg-brand hover:bg-brand-900 text-white shadow-sm min-h-[44px]"
                  >
                    {vm.primaryLabel}
                  </Button>

                  <Button
                    onClick={() => onNavigate("/services")}
                    className="rounded-full px-8 py-3.5 text-[14px] font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/15 min-h-[44px]"
                  >
                    {vm.secondaryLabel}
                  </Button>

                </div>
              </Reveal>

              {vm.stats.length ? (
                <Reveal delay={0.34} y={14}>
                  <div className="mt-10">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    <Stagger className="mt-6 grid grid-cols-3 gap-6 sm:gap-10">
                      {vm.stats.map((s, idx) => (
                        <StaggerItem key={idx} y={10}>
                          <div>
                            <div className="text-2xl font-semibold">{s.value}</div>
                            <div className="mt-1 text-small text-white/75">
                              {s.label}
                            </div>
                          </div>
                        </StaggerItem>
                      ))}
                    </Stagger>

                  </div>
                </Reveal>
              ) : null}

            </div>

            <div className="relative hidden sm:block">
              <div className="h-[520px] w-full" />
            </div>

          </Grid>
        </div>

        {/* Floating card */}
        <div className="-mt-12 sm:-mt-18 pb-8 sm:pb-10 relative">

          <div className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-white/20 rounded-full" />

          <Reveal y={18} delay={0.06}>
            <Card
              padded={false}
              className="mx-auto max-w-[980px] rounded-2xl bg-gradient-to-b from-surface to-bg text-text shadow-xl border border-border"
            >
              <div className="px-5 sm:px-8 py-6">
                <div className="grid gap-6 sm:grid-cols-3 sm:items-center sm:gap-0">

                  {/* PHONE */}
                  <div className="relative flex items-center gap-4 sm:px-8 sm:py-2">
                    <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 end-0 h-14 w-px bg-border/70" />

                    <div className="h-14 w-14 rounded-2xl bg-brand-900 flex items-center justify-center text-white shrink-0">

                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.25 1.03l-2.2 2.19z" />
                      </svg>

                    </div>

                    <div className="min-w-0">
                      <div className="text-[16px] sm:text-[17px] font-semibold">
                        {t("common.phone", "Phone")}
                      </div>

                      <a
                        href={phoneTel ? `tel:${phoneTel}` : undefined}
                        dir="ltr"
                        className="mt-1 block text-[14px] text-muted hover:underline"
                        style={{ unicodeBidi: "isolate" }}
                      >
                        {phoneDisplay || "+20 …"}
                      </a>

                    </div>
                  </div>

                  {/* HOURS */}
                  <div className="relative flex items-center gap-4 sm:px-8 sm:py-2">
                    <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 end-0 h-14 w-px bg-border/70" />

                    <div className="h-14 w-14 rounded-2xl bg-brand-900 flex items-center justify-center text-white shrink-0">

                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M12 6v6l4 2"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>

                    </div>

                    <div className="min-w-0">
                      <div className="text-[16px] sm:text-[17px] font-semibold">
                        {t("common.hours", "Working hours")}
                      </div>

                      <div className="mt-1 text-[14px] text-muted">
                        {vm.hours}
                      </div>

                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col items-center justify-center gap-3 sm:px-8 sm:py-2">
                    <Button
                      onClick={() => onNavigate("/contact")}
                      className="rounded-full px-10 py-4 text-[15px] font-semibold bg-brand hover:bg-brand-900 text-white min-h-[48px]"
                    >
                      {t("common.contactUs", "Contact us")}
                    </Button>
                  </div>

                </div>
              </div>
            </Card>
          </Reveal>

        </div>
      </Container>
    </section>
  );
}