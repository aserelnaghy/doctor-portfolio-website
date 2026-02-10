// src/sections/home/TeamPreviewSection.jsx
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";


import Section from "../../components/ui/Section";
import Container from "../../components/ui/Container";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Reveal from "../../components/common/Reveal";
import Stagger, { StaggerItem } from "../../components/common/Stagger";

function getInitial(name) {
    if (!name) return "?";

    const clean = String(name)
        // normalize weird spaces
        .replace(/\u00A0/g, " ")
        .trim()
        // remove Arabic/English titles with optional dot and optional extra spaces
        .replace(/^(د)\s*\.?\s*/i, "")
        .replace(/^(dr)\s*\.?\s*/i, "")
        .replace(/^(doctor)\s+/i, "")
        .trim();

    return clean.charAt(0) || "?";
}


function TeamMiniCard({ m, detailsLabel, yearsLabel, onClick }) {

    const initial = getInitial(m?.name);


    return (
        <Card
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onClick?.();
            }}
            className={[
                "group relative rounded-3xl border border-brand-900/10 bg-white/70",
                "shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer will-change-transform",
                "hover:-translate-y-1 hover:scale-[1.01]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white/60",
            ].join(" ")}
        >
            {/* subtle hover sheen */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand/6 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

            <div className="relative">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                        <div className="text-[16px] font-semibold text-brand-900 truncate">
                            {m.name}
                        </div>
                        <div className="mt-1 text-[12px] text-muted truncate">
                            {m.specialty}
                        </div>
                    </div>

                    <div className="h-11 w-11 rounded-2xl bg-brand-900 text-white grid place-items-center text-[13px] font-semibold shrink-0 transition-transform duration-200 group-hover:scale-105">
                        {initial}
                    </div>
                </div>

                {/* Role (single line) */}
                <div className="mt-4 flex items-center gap-2 text-[13px] text-muted">
                    <span className="h-2 w-2 rounded-full border border-accent bg-accent/20 transition-transform duration-200 group-hover:scale-110" />
                    <span className="truncate">{m.roleShort}</span>
                </div>

                {/* Footer */}
                <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-brand-900/5 px-3 py-1 text-[12px] font-semibold text-brand-900 whitespace-nowrap transition-colors duration-200 group-hover:bg-brand-900/10">
                        {yearsLabel}
                    </span>

                    <span className="text-[12px] text-brand-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                        {detailsLabel} ←
                    </span>
                </div>

                {/* tiny accent line */}
                <div className="mt-4 h-[2px] w-8 rounded-full bg-accent/70 group-hover:w-14 transition-all duration-200" />
            </div>
        </Card>
    );
}

export default function TeamPreviewSection({ home, onNavigate }) {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const dir = i18n.dir?.() || (i18n.language?.startsWith("ar") ? "rtl" : "ltr");
    const isRTL = dir === "rtl";

    const members = home?.teamPreview?.members || [];

    const kicker = t("home.teamPreview.kicker", "Our Medical Team");
    const title = t("home.teamPreview.title", "Meet our medical team");
    const subtitle = t(
        "home.teamPreview.subtitle",
        "Specialists working together to deliver clear, careful care."
    );

    const ctaTeam = t("home.teamPreview.ctaTeam", "View team");
    const ctaBook = t("home.teamPreview.ctaBook", "Book appointment");
    const hint = t(
        "home.teamPreview.hint",
        "Full details about doctors and specialties are on the Team page."
    );

    const detailsLabel = t("home.teamPreview.detailsHint", "View details");

    return (
        <Section className="py-16 sm:py-20 relative overflow-hidden">
            {/* background consistent with your light sections */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-surface" />
                <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />
                <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
            </div>

            <Container className="relative">
                <Reveal>
                    <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
                        {/* Header */}
                        <div className={isRTL ? "text-right" : "text-left"}>
                            <div className="inline-flex items-center rounded-full border border-brand-900/15 bg-white/70 px-4 py-2 text-[12px] font-semibold text-brand-900">
                                {kicker}
                            </div>

                            <h2 className="mt-4 text-[28px] sm:text-[34px] font-semibold text-brand-900">
                                {title}
                            </h2>

                            <p className="mt-3 text-[14px] sm:text-[15px] text-muted leading-relaxed max-w-2xl">
                                {subtitle}
                            </p>
                        </div>

                        {/* CTAs */}
                        <div className={isRTL ? "lg:text-left" : "lg:text-right"}>
                            <div className="flex flex-wrap gap-3 lg:justify-end items-center">
                                <Button
                                    onClick={() => navigate("/medical-team")}
                                    className="rounded-full px-7 py-2.5 text-[14px] font-semibold bg-brand-900 text-white hover:bg-brand-900/90 min-h-[44px]"
                                >
                                    {ctaTeam}
                                </Button>

                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* Cards wrapper to make section feel “designed”, not floating */}
                <div className="mt-10 rounded-3xl bg-surface/60 border border-brand-900/10 p-6 sm:p-8">
                    <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {members.slice(0, 4).map((m, idx) => (
                            <StaggerItem key={idx} y={10}>
                                <Reveal y={16} delay={0.06 * idx}>
                                    <TeamMiniCard
                                        m={m}
                                        detailsLabel={detailsLabel}
                                        yearsLabel={t("home.teamPreview.yearsBadge", { years: m.years })}
                                        onClick={() => navigate("/medical-team")}
                                    />
                                </Reveal>
                            </StaggerItem>
                        ))}
                    </Stagger>

                    <Reveal delay={0.08}>
                        <div className="mt-6 text-[12px] text-muted">
                            {hint}
                        </div>
                    </Reveal>
                </div>
            </Container>
        </Section>
    );
}
