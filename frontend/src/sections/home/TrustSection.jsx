// src/sections/home/TrustSection.jsx
import Section from "../../components/ui/Section";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import Reveal from "../../components/common/Reveal";
import Stagger, { StaggerItem } from "../../components/common/Stagger";
import CountUp from "../../components/common/CountUp";

export default function TrustSection({ t, home, onNavigate, parallax }) {
  const trust = home?.trust || {};
  const trustItems = trust.items || [];

  return (
    <Section
      className="py-20 sm:py-24 lg:py-28 relative"
      ref={parallax.ref}
      onMouseMove={parallax.onMouseMove}
      onMouseLeave={parallax.onMouseLeave}
      style={{ ["--mx"]: 0, ["--my"]: 0 }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-surface" />
        <div className="absolute -top-28 -left-28 h-72 w-72 rounded-full bg-brand/12 blur-3xl" />
        <div className="absolute -bottom-28 -right-28 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <div className="inline-flex items-center rounded-full border border-brand-900/15 bg-white/70 px-4 py-2 text-[12px] font-semibold tracking-[0.12em] text-brand-900">
                {trust.badge}
              </div>

              <h2 className="mt-5 text-[40px] sm:text-[48px] lg:text-[54px] leading-[1.05] font-semibold text-brand-900">
                {trust.title || ""}
              </h2>

              {trust.subtitle ? (
                <p className="mt-4 max-w-xl text-[16px] sm:text-[17px] leading-relaxed text-muted">
                  {trust.subtitle}
                </p>
              ) : null}

              <div className="mt-8">
                <Button
                  onClick={() => onNavigate("/about")}
                  className="rounded-full px-8 py-3.5 text-[14px] font-semibold bg-accent hover:bg-accent/90 text-white min-h-[44px]"
                >
                  <span className="opacity-95">{trust.aboutButton}</span>
                </Button>
              </div>
            </div>
          </Reveal>

          <Stagger className="grid grid-cols-2 gap-5 sm:gap-6 lg:justify-self-end">
            {trustItems.slice(0, 4).map((it, idx) => {
              const isNavy = idx === 1 || idx === 2;

              const cardBg = isNavy
                ? "bg-gradient-to-br from-[#0B2F66] via-[#0A2348] to-[#071A38]"
                : "bg-gradient-to-br from-[#EAF6FF] via-[#D8EEFF] to-[#CBE7FF]";

              const valueClass = isNavy ? "text-white" : "text-brand-900";
              const labelClass = isNavy ? "text-white" : "text-brand-900";
              const subClass = isNavy ? "text-white/75" : "text-brand-900/70";

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
                    <div
                      className="pointer-events-none absolute -inset-16 opacity-70"
                      style={{
                        background:
                          "radial-gradient(closest-side, rgba(255,255,255,0.50), rgba(255,255,255,0.00) 70%)",
                        transform:
                          "translate(calc(var(--mx) * 18px), calc(var(--my) * 14px))",
                      }}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/18 via-transparent to-black/15" />

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
    </Section>
  );
}
