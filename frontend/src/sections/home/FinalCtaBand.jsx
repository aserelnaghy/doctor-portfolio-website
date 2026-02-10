// src/sections/home/FinalCtaBand.jsx
import Section from "../../components/ui/Section";
import Container from "../../components/ui/Container";
import Grid from "../../components/common/Grid";
import Button from "../../components/ui/Button";
import Reveal from "../../components/common/Reveal";

export default function FinalCtaBand({
  t,
  home,
  site,
  isRTL,
  phoneDisplay,
  onCallNow,
  onNavigate,
}) {
  const title = home?.finalCta?.title || t("home.finalTitle", "Need help or guidance?");
  const subtitle =
    home?.finalCta?.subtitle ||
    t(
      "home.finalSubtitle",
      "Call us or contact the clinic — we will guide you to the right next step."
    );

  return (
    <Section padded={false} className="py-0">
      <div className="relative overflow-hidden bg-brand-900 text-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/35" />
        <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-28 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

        <Container className="relative py-12 sm:py-14">
          <Grid cols={2} gap="lg" className="items-center">
            <div>
              <Reveal>
                <h2 className="text-[28px] sm:text-[34px] leading-tight font-semibold">
                  {title}
                </h2>
              </Reveal>
              <Reveal delay={0.1} y={14}>
                <p className="mt-3 text-body text-white/80 max-w-xl">
                  {subtitle}
                </p>
              </Reveal>

              <div className="mt-5 text-[12px] text-white/65">
                {t("common.address", "Address")}: {site?.address}
              </div>
            </div>

            <Reveal delay={0.14} y={12}>
              <div className={isRTL ? "sm:text-left" : "sm:text-right"}>
                <div className="flex flex-wrap gap-3 sm:justify-end">
                  <Button
                    onClick={onCallNow}
                    className="rounded-full px-8 py-3.5 text-[14px] font-semibold bg-accent hover:bg-accent/90 text-white min-h-[44px]"
                  >
                    {t("common.callNow", "Call now")}
                  </Button>
                  <Button
                    onClick={() => onNavigate("/contact")}
                    className="rounded-full px-8 py-3.5 text-[14px] font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/15 min-h-[44px]"
                  >
                    {t("common.contactUs", "Contact us")}
                  </Button>
                </div>

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
    </Section>
  );
}
