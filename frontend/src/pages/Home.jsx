import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { getHomeContent, getSiteContent } from "../content";

import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import Grid from "../components/common/Grid";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import Reveal from "../components/common/Reveal";
import Stagger, { StaggerItem } from "../components/common/Stagger";
import FaqAccordion from "../components/ui/FaqAccordion";
import CountUp from "../components/common/CountUp";

export default function Home() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const dir = i18n.dir?.() || (i18n.language?.startsWith("ar") ? "rtl" : "ltr");
  const isRTL = dir === "rtl";

  const { site, home } = useMemo(() => {
    const lang = i18n.language || "en";
    return { site: getSiteContent(lang), home: getHomeContent(lang) };
  }, [i18n.language]);

  const phoneDisplay = site.phoneDisplay || site.phoneTel || "";
  const phoneTel = (site.phoneTel || phoneDisplay || "").replace(/\s+/g, "");

  const callNow = () => {
    if (!phoneTel) return;
    window.location.href = `tel:${phoneTel}`;
  };

  const hero = home?.hero || {};
  const heroKicker =
    hero.kicker || "DIABETIC FOOT CARE | WOUND CARE | LIMB PRESERVATION";
  const heroTitle = hero.title || "";
  const heroSubtitle = hero.subtitle || "";
  const heroBullets = (hero.bullets || []).slice(0, 3);
  const heroStats = (hero.stats || []).slice(0, 3);

  const heroPrimaryLabel = t("common.callNow", "Call now");
  const heroSecondaryLabel = t("common.viewServices", "View services");

  const heroImgSrc = hero?.image || hero?.imageUrl || "";
  const heroImgAlt = hero?.imageAlt || "Doctor";

  const trust = home?.trust || {};
  const trustTitle = trust.title || "";
  const trustSubtitle = trust.subtitle || "";
  const trustItems = trust.items || [];

  const trustRef = useRef(null);

  const onTrustMove = (e) => {
    const el = trustRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2;  // -1..1
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2; // -1..1

    // CSS variables drive transforms (fast, no re-render)
    el.style.setProperty("--mx", x.toFixed(3));
    el.style.setProperty("--my", y.toFixed(3));
  };

  const onTrustLeave = () => {
    const el = trustRef.current;
    if (!el) return;
    el.style.setProperty("--mx", "0");
    el.style.setProperty("--my", "0");
  };

  return (
    <main className={isRTL ? "text-right" : "text-left"}>
      {/* HERO */}
      <section className="relative overflow-hidden text-white -mt-16 sm:-mt-20 pt-16 sm:pt-20">
        {/* base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-[#0b2f66] to-[#071a38]" />

        {/* overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/7 via-transparent to-black/35" />
        <div className="pointer-events-none absolute -top-48 -left-48 h-[640px] w-[640px] rounded-full bg-brand/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-56 -right-56 h-[720px] w-[720px] rounded-full bg-accent/20 blur-3xl" />

        {/* tone down on mobile */}
        <div className="pointer-events-none absolute inset-0 hero-bg opacity-50 sm:opacity-70" />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(255,255,255,0.22) 0, rgba(255,255,255,0.22) 1px, transparent 1px, transparent 18px)",
            backgroundSize: "18px 18px",
          }}
        />

        {/* HERO IMAGE: mobile (in flow) */}
        {heroImgSrc ? (
          <div className="relative sm:hidden -mx-4 mb-0">
            {/* optional: keep the background vibe behind the image */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-black/25 pointer-events-none" />
            <img
              src={heroImgSrc}
              alt={heroImgAlt}
              className="w-full h-[320px] object-cover object-top"
            />
          </div>
        ) : null}


        {/* HERO IMAGE: desktop (absolute overlay) */}
        <div
          className={[
            "pointer-events-none absolute inset-y-0 w-[52%] min-w-[520px] hidden sm:block",
            isRTL ? "left-0" : "right-0",
          ].join(" ")}
        >
          {heroImgSrc ? (
            <img
              src={heroImgSrc}
              alt={heroImgAlt}
              className={[
                "absolute bottom-0 h-[92%] w-auto max-w-none object-contain",
                isRTL ? "left-0" : "right-0",
              ].join(" ")}
            />
          ) : null}
        </div>

        <Container className="relative">
          {/* keep hero compact on mobile */}
          <div className="min-h-0 sm:min-h-[78vh] pt-2 sm:pt-14 pb-20 sm:pb-28">
            <Grid cols={2} gap="lg" className="items-start">
              {/* LEFT */}
              <div className="max-w-[620px] pt-4 sm:pt-6">
                {/* Kicker: smaller + lighter + more spacing */}
                <Reveal>
                  <div className="text-[11px] sm:text-[12px] tracking-[0.25em] uppercase text-white/60">
                    {heroKicker}
                  </div>
                </Reveal>

                {/* Title: bolder */}
                <Reveal delay={0.06} y={24}>
                  <h1 className="mt-4 text-[46px] sm:text-[60px] leading-[1.02] font-bold">
                    {heroTitle}
                  </h1>
                </Reveal>

                {/* Subtitle: narrower */}
                <Reveal delay={0.14} y={18}>
                  <p className="mt-4 text-body text-white/75 leading-[1.7] max-w-[520px]">
                    {heroSubtitle}
                  </p>
                </Reveal>

                {/* bullets: delayed slightly to guide reading order */}
                {heroBullets.length > 0 ? (
                  <Stagger className="mt-6">
                    <ul className="space-y-3 text-body text-white/85">
                      {heroBullets.map((b, idx) => (
                        <StaggerItem key={idx}>
                          <li className="flex gap-3">
                            <span className="mt-[10px] h-2.5 w-2.5 rotate-45 rounded-[2px] bg-accent shrink-0" />
                            <span>{b}</span>
                          </li>
                        </StaggerItem>
                      ))}
                    </ul>
                  </Stagger>
                ) : null}

                {/* CTA: ensure 44px tap targets */}
                <Reveal delay={0.22} y={16}>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button
                      onClick={callNow}
                      className="rounded-full px-8 py-3.5 text-[14px] font-semibold bg-accent hover:bg-accent/90 text-white shadow-sm min-h-[44px]"
                    >
                      {heroPrimaryLabel}
                    </Button>

                    <Button
                      onClick={() => navigate("/services")}
                      className="rounded-full px-8 py-3.5 text-[14px] font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/15 min-h-[44px]"
                    >
                      {heroSecondaryLabel}
                    </Button>
                  </div>
                </Reveal>

                {/* stats */}
                {heroStats.length > 0 ? (
                  <Reveal delay={0.34} y={14}>
                    <div className="mt-10">
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      <Stagger className="mt-6 grid grid-cols-3 gap-6 sm:gap-10">
                        {heroStats.map((s, idx) => (
                          <StaggerItem key={idx} y={10}>
                            <div>
                              <div className="text-2xl font-semibold">
                                {s.value}
                              </div>
                              <div className="mt-1 text-small text-white/70">
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

              {/* RIGHT spacer */}
              <div className="relative hidden sm:block">
                <div className="h-[520px] w-full" />
              </div>
            </Grid>
          </div>

          {/* Floating bottom card (enhanced + connected) */}
          <div className="-mt-12 sm:-mt-18 pb-8 sm:pb-10 relative">
            {/* connect bar */}
            <div className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-white/20 rounded-full" />

            <Reveal y={18} delay={0.06}>
              <Card
                padded={false}
                className="mx-auto max-w-[980px] rounded-2xl bg-gradient-to-b from-surface to-bg text-text shadow-xl border border-border"
              >
                <div className="px-5 sm:px-8 py-6">
                  <div className="grid gap-6 sm:grid-cols-3 sm:items-center sm:gap-0">
                    {/* PHONE */}
                    <Reveal y={12} delay={0.08}>
                      <div className="relative flex items-center gap-4 sm:px-8 sm:py-2">
                        {/* divider between col1 and col2 (direction-safe) */}
                        <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 end-0 h-14 w-px bg-border/70" />

                        <div className="h-14 w-14 rounded-2xl bg-brand-900 flex items-center justify-center text-white shrink-0">
                          {/* use filled phone icon so it looks correct */}
                          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
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
                    </Reveal>

                    {/* HOURS */}
                    <Reveal y={12} delay={0.12}>
                      <div className="relative flex items-center gap-4 sm:px-8 sm:py-2">
                        {/* divider between col2 and col3 */}
                        <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 end-0 h-14 w-px bg-border/70" />

                        <div className="h-14 w-14 rounded-2xl bg-brand-900 flex items-center justify-center text-white shrink-0">
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z" stroke="currentColor" strokeWidth="2" />
                            <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </div>

                        <div className="min-w-0">
                          <div className="text-[16px] sm:text-[17px] font-semibold">
                            {t("common.hours", "Working hours")}
                          </div>
                          <div className="mt-1 text-[14px] text-muted">
                            {site.hours?.[0]?.time || t("home.hoursFallback", "Sun–Thu 9:30 AM – 5:30 PM")}
                          </div>
                        </div>
                      </div>
                    </Reveal>

                    {/* CTA */}
                    <Reveal y={12} delay={0.16}>
                      <div className="flex flex-col items-center justify-center gap-3 sm:px-8 sm:py-2">
                        <Button
                          onClick={() => navigate("/contact")}
                          className="rounded-full px-10 py-4 text-[15px] font-semibold bg-accent hover:bg-accent/90 text-white min-h-[48px]"
                        >
                          {t("common.contactUs", "Contact us")}
                        </Button>
                      </div>
                </Reveal>
              </div>
          </div>
        </Card>
      </Reveal>
    </div>
        </Container >
      </section >

    {/* SECTION: Trust (hero-style, badge cards, parallax) */ }
    < Section
  className = "py-20 sm:py-24 lg:py-28 relative"
  ref = { trustRef }
  onMouseMove = { onTrustMove }
  onMouseLeave = { onTrustLeave }
  style = {{ ["--mx"]: 0, ["--my"]: 0 }
}
      >
  {/* background (soft like Services, but a touch richer) */ }
  < div className = "pointer-events-none absolute inset-0 overflow-hidden" >
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-surface" />
          <div className="absolute -top-28 -left-28 h-72 w-72 rounded-full bg-brand/12 blur-3xl" />
          <div className="absolute -bottom-28 -right-28 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
        </div >

  <Container className="relative">
    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
      {/* LEFT: reference-like text */}
      <Reveal>
        <div>
          {/* doctor badge */}
          <div className="inline-flex items-center rounded-full border border-brand-900/15 bg-white/70 px-4 py-2 text-[12px] font-semibold tracking-[0.12em] text-brand-900">
            {trust.badge}
          </div>

          <h2 className="mt-5 text-[40px] sm:text-[48px] lg:text-[54px] leading-[1.05] font-semibold text-brand-900">
            {trustTitle}
          </h2>

          {trustSubtitle ? (
            <p className="mt-4 max-w-xl text-[16px] sm:text-[17px] leading-relaxed text-muted">
              {trustSubtitle}
            </p>
          ) : null}

          <div className="mt-8">
            <Button
              onClick={() => navigate("/about")}
              className="rounded-full px-8 py-3.5 text-[14px] font-semibold bg-accent hover:bg-accent/90 text-white min-h-[44px]">
              <span className="opacity-95">{trust.aboutButton}</span>
            </Button>
          </div>
        </div>
      </Reveal>

      {/* RIGHT: bigger polished cards */}
      <Stagger className="grid grid-cols-2 gap-5 sm:gap-6 lg:justify-self-end">
        {trustItems.slice(0, 4).map((it, idx) => {
          const isNavy = idx === 1 || idx === 2;

          const cardBg = isNavy
            ? "bg-gradient-to-br from-[#0B2F66] via-[#0A2348] to-[#071A38]"
            : "bg-gradient-to-br from-[#EAF6FF] via-[#D8EEFF] to-[#CBE7FF]";

          const valueClass = isNavy ? "text-white" : "text-brand-900";
          const labelClass = isNavy ? "text-white" : "text-brand-900";
          const subClass = isNavy ? "text-white/75" : "text-brand-900/70";

          // base “badge tilt” per card (slightly different angles)
          const tilt =
            idx === 0 ? -2 : idx === 1 ? 2 : idx === 2 ? -1.5 : 1.5;

          return (
            <StaggerItem key={idx}>
              <div
                className={[
                  "relative overflow-hidden rounded-[28px] border shadow-sm",
                  "w-full h-[190px] sm:h-[230px] lg:h-[250px]",
                  "p-9 sm:p-11",
                  cardBg,
                  isNavy ? "border-white/10" : "border-brand-900/15",
                  // polished hover
                  "transition-transform duration-200 will-change-transform",
                  "hover:-translate-y-1 hover:shadow-lg",
                ].join(" ")}
                style={{
                  transform: `
                    perspective(900px)
                    rotateX(calc(var(--my) * -5deg))
                    rotateY(calc(var(--mx) * 6deg))
                    rotateZ(${tilt}deg)
                    translate3d(calc(var(--mx) * 6px), calc(var(--my) * 5px), 0)
                  `,
                }}
              >
                {/* shiny highlight (works for both variants) */}
                <div
                  className="pointer-events-none absolute -inset-16 opacity-70"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(255,255,255,0.50), rgba(255,255,255,0.00) 70%)",
                    transform:
                      "translate(calc(var(--mx) * 18px), calc(var(--my) * 14px))",
                  }}
                />

                {/* subtle gloss line */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/18 via-transparent to-black/15" />

                {/* content */}
                <div className="relative">
                  <div className={`trust-value text-[44px] sm:text-[56px] lg:text-[60px] leading-none font-semibold ${valueClass}`}>
                    <CountUp value={it.value} />
                  </div>

                  <div className={`mt-4 text-[15px] sm:text-[18px] font-semibold ${labelClass}`}>
                    {it.label}
                  </div>

                  {it.subLabel ? (
                    <div className={`mt-2 text-[13px] sm:text-[14px] leading-relaxed ${subClass}`}>
                      {it.subLabel}
                    </div>
                  ) : null}
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </div>
  </Container>
      </Section >

  {/* SECTION 1: Services preview (reduce cognitive load) */ }
  < Section className = "py-14 relative" >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
        </div>

        <Container className="relative">
          <Reveal>
            <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-brand-900/25 to-transparent" />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-h2 text-brand-900">{t("nav.services")}</h2>
                {home?.servicesPreview?.subtitle ? (
                  <p className="mt-2 max-w-2xl text-body text-muted">
                    {home.servicesPreview.subtitle}
                  </p>
                ) : null}
              </div>

              <div className="hidden sm:block">
                <Button
                  onClick={() => navigate("/services")}
                  className="rounded-full px-7 py-3 text-[14px] font-semibold bg-brand-900 text-white hover:bg-brand-900/90 min-h-[44px]"
                >
                  {t("common.viewAll", "View all")}
                </Button>
              </div>
            </div>
          </Reveal>

          <Stagger className="mt-10 grid gap-4 sm:grid-cols-3">
            {(home?.servicesPreview?.items || []).slice(0, 3).map((s, idx) => {
              const isPrimary = idx < 3;
              return (
                <StaggerItem key={idx}>
                  <Card
                    className={[
                      "rounded-2xl border bg-gradient-to-b from-surface to-bg shadow-sm hover:shadow-md transition",
                      isPrimary ? "border-brand-900/30" : "border-border opacity-90",
                    ].join(" ")}
                  >
                    <div className="text-[15px] font-semibold text-text">
                      {s.title}
                    </div>
                    <p className="mt-2 text-[13px] text-muted leading-relaxed">
                      {s.desc}
                    </p>

                    {s.image?.src ? (
                      <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-slate-100">
                        <img
                          src={s.image.src}
                          alt={s.image.alt || s.title}
                          className="h-[200px] w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ) : null}

                    <div className="mt-4">
                      <Button
                        variant="secondary"
                        onClick={() => navigate("/services")}
                        className="rounded-full px-5 py-2 text-[13px] min-h-[44px]"
                      >
                        {t("common.learnMore", "Learn more")}
                      </Button>
                    </div>
                  </Card>
                </StaggerItem>
              );
            })}
          </Stagger>

          <Reveal delay={0.05} y={12}>
            <div className="mt-8 sm:hidden">
              <Button
                onClick={() => navigate("/services")}
                className="rounded-full px-7 py-3 text-[14px] font-semibold bg-brand-900 text-white hover:bg-brand-900/90 min-h-[44px]"
              >
                {t("common.viewAll", "View all")}
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section >

  {/* SECTION 2: Patient Stories preview (avatar initials) */ }
  < Section className = "py-14 relative overflow-hidden bg-brand-900 text-white" >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/35" />
        <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-28 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

        <Container>
          <Reveal>
            <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-brand-900/20 to-transparent" />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-h2 text-white">{t("nav.stories")}</h2>
                {home?.storiesPreview?.subtitle ? (
                  <p className="mt-2 max-w-2xl text-body text-white/80">
                    {home.storiesPreview.subtitle}
                  </p>
                ) : null}
              </div>

              <div className="hidden sm:block">
                <Button
                  onClick={() => navigate("/stories")}
                  className="rounded-full px-6 py-3 text-[14px] font-semibold min-h-[44px]"

                >
                  {t("common.viewAll", "View all")}
                </Button>
              </div>
            </div>
          </Reveal>

          <Stagger className="mt-10 grid gap-4 sm:grid-cols-3">
            {(home?.storiesPreview?.items || []).slice(0, 3).map((r, idx) => {
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
                onClick={() => navigate("/stories")}
                className="rounded-full px-7 py-3 text-[14px] font-semibold bg-brand-900 text-white hover:bg-brand-900/90 min-h-[44px]"
              >
                {t("common.viewAll", "View all")}
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section >

  {/* SECTION: About preview */ }
  < Section className = "py-14 relative" >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
        </div>

        <Container className="relative">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

            {/* LEFT: Text */}
            <div>
              <Reveal>
                <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-brand-900/25 to-transparent" />
                <h2 className="text-h2 text-brand-900">{t("nav.about")}</h2>
              </Reveal>

              {home?.aboutPreview?.subtitle ? (
                <Reveal delay={0.10} y={14}>
                  <p className="mt-3 text-body text-muted leading-relaxed max-w-xl">
                    {home.aboutPreview.subtitle}
                  </p>
                </Reveal>
              ) : null}

              {home?.aboutPreview?.bullets?.length ? (
                <Stagger className="mt-6">
                  <ul className="space-y-3">
                    {home.aboutPreview.bullets.slice(0, 4).map((b, idx) => (
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
                    onClick={() => navigate("/about")}
                    className="rounded-full px-7 py-3 text-[14px] font-semibold bg-brand-900 text-white hover:bg-brand-900/90 min-h-[44px]"
                  >
                    {t("common.learnMore", "Learn more")}
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* RIGHT: Image */}
            {home?.aboutPreview?.image?.src ? (
              <Reveal y={16} delay={0.08}>
                <div className="relative">
                  <div className="overflow-hidden rounded-3xl border border-border shadow-sm bg-white hidden sm:block">
                    <img
                      src={home.aboutPreview.image.src}
                      alt={home.aboutPreview.image.alt || "About"}
                      className="w-full h-[420px] object-cover hidden sm:block"
                      loading="lazy"
                    />
                  </div>
                </div>
              </Reveal>
            ) : null}
          </div>
        </Container>
      </Section >

  {/* SECTION: FAQ preview (2-col + accordion) */ }
  < Section className = "py-16 relative overflow-hidden bg-brand-900 text-white" >
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

                {/* <h2 className="mt-3 text-[40px] sm:text-[48px] leading-[1.05] font-semibold">
                    {t("home.faqTitle")}
                  </h2> */}

                {home?.faqPreview?.subtitle ? (
                  <p className="mt-4 text-[40px] sm:text-[48px] leading-[1.05] font-semibold  text-white leading-relaxed">
                    {home.faqPreview.subtitle}
                  </p>
                ) : null}

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button
                    onClick={() => navigate("/contact")}
                    className="rounded-full px-8 py-3.5 text-[14px] font-semibold bg-accent hover:bg-accent/90 text-white min-h-[44px]"
                  >
                    {t("common.contactUs", "Contact us")}
                  </Button>
                </div>
              </div>
            </Reveal>

            {/* RIGHT: Accordion */}
            <FaqAccordion items={(home?.faqPreview?.items || []).slice(0, 5)} />
          </div>
        </Container>
      </Section >

  {/* SECTION 5: Blog preview (unchanged, just ensure tap targets) */ }
  < Section className = "py-14 relative" >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
        </div>

        <Container className="relative">
          <Reveal>
            <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-brand-900/25 to-transparent" />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-h2 text-brand-900">{t("nav.blog")}</h2>
                {home?.blogPreview?.subtitle ? (
                  <p className="mt-2 max-w-2xl text-body text-muted">
                    {home.blogPreview.subtitle}
                  </p>
                ) : null}
              </div>

              <div className="hidden sm:block">
                <Button
                  onClick={() => navigate("/blog")}
                  className="rounded-full px-7 py-3 text-[14px] font-semibold bg-brand-900 text-white hover:bg-brand-900/90 min-h-[44px]"
                >
                  {t("common.viewAll", "View all")}
                </Button>
              </div>
            </div>
          </Reveal>

          <Stagger className="mt-10 grid gap-4 sm:grid-cols-3">
            {(home?.blogPreview?.posts || []).slice(0, 3).map((p, idx) => (
              <StaggerItem key={idx}>
                <Card className="rounded-2xl border border-border bg-gradient-to-b from-surface to-bg shadow-sm hover:shadow-md transition">
                  <div className="text-[15px] font-semibold text-text">
                    {p.title}
                  </div>
                  {p.date ? (
                    <div className="mt-1 text-[12px] text-muted">{p.date}</div>
                  ) : null}
                  <p className="mt-2 text-[13px] text-muted leading-relaxed">
                    {p.excerpt}
                  </p>

                  <div className="mt-4">
                    <Button
                      variant="secondary"
                      onClick={() => navigate(p.href || "/blog")}
                      className="rounded-full px-5 py-2 text-[13px] min-h-[44px]"
                    >
                      {t("common.readMore", "Read more")}
                    </Button>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.05} y={12}>
            <div className="mt-8 sm:hidden">
              <Button
                onClick={() => navigate("/blog")}
                className="rounded-full px-7 py-3 text-[14px] font-semibold bg-brand-900 text-white hover:bg-brand-900/90 min-h-[44px]"
              >
                {t("common.viewAll", "View all")}
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section >

  {/* FINAL CTA BAND (cleaner + less redundancy) */ }
  < Section padded = { false} className = "py-0" >
    <div className="relative overflow-hidden bg-brand-900 text-white">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/35" />
      <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-28 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

      <Container className="relative py-12 sm:py-14">
        <Grid cols={2} gap="lg" className="items-center">
          <div>
            <Reveal>
              <h2 className="text-[28px] sm:text-[34px] leading-tight font-semibold">
                {home?.finalCta?.title || t("home.finalTitle", "Need help or guidance?")}
              </h2>
            </Reveal>
            <Reveal delay={0.10} y={14}>
              <p className="mt-3 text-body text-white/80 max-w-xl">
                {home?.finalCta?.subtitle ||
                  t(
                    "home.finalSubtitle",
                    "Call us or contact the clinic — we will guide you to the right next step."
                  )}
              </p>
            </Reveal>

            {/* subtle info line */}
            <div className="mt-5 text-[12px] text-white/65">
              {t("common.address", "Address")}: {site.address}
            </div>
          </div>

          <Reveal delay={0.14} y={12}>
            <div className={isRTL ? "sm:text-left" : "sm:text-right"}>
              <div className="flex flex-wrap gap-3 sm:justify-end">
                <Button
                  onClick={callNow}
                  className="rounded-full px-8 py-3.5 text-[14px] font-semibold bg-accent hover:bg-accent/90 text-white min-h-[44px]"
                >
                  {t("common.callNow", "Call now")}
                </Button>
                <Button
                  onClick={() => navigate("/contact")}
                  className="rounded-full px-8 py-3.5 text-[14px] font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/15 min-h-[44px]"
                >
                  {t("common.contactUs", "Contact us")}
                </Button>
              </div>

              {/* reduced redundancy: phone shown subtly */}
              <div className="mt-5 text-small text-white/70">
                {t("common.phone", "Phone")}:{" "}
                <span dir="ltr" style={{ unicodeBidi: "isolate" }}>
                  {phoneDisplay}
                </span>
              </div>
            </div>
          </Reveal>
        </Grid>
      </Container>
    </div>
      </Section >
    </main >
  );
}
