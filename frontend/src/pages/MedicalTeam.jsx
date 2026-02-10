// src/pages/MedicalTeam.jsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { getTeamContent } from "../content";

import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import Reveal from "../components/common/Reveal";

function normalizeText(s) {
  return String(s || "").replace(/\u00A0/g, " ").trim().toLowerCase();
}

function getInitial(name) {
  if (!name) return "?";
  const clean = String(name)
    .replace(/\u00A0/g, " ")
    .trim()
    .replace(/^(د)\s*\.?\s*/i, "")
    .replace(/^(dr)\s*\.?\s*/i, "")
    .replace(/^(doctor)\s+/i, "")
    .trim();
  return clean.charAt(0) || "?";
}

function buildSpecialties(members) {
  const set = new Set();
  members.forEach((m) => m?.specialty && set.add(m.specialty));
  return Array.from(set);
}

function sortMembers(list, sortKey) {
  const arr = [...list];
  if (sortKey === "years_desc") return arr.sort((a, b) => (Number(b?.years) || 0) - (Number(a?.years) || 0));
  if (sortKey === "years_asc") return arr.sort((a, b) => (Number(a?.years) || 0) - (Number(b?.years) || 0));
  return arr.sort((a, b) => String(a?.name || "").localeCompare(String(b?.name || "")));
}

// ✅ Modern slide-over drawer (instead of modal)
function ProfileDrawer({ open, onClose, member, t, isRTL }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80]" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="absolute inset-0 bg-black/35 backdrop-blur-sm" />

      <div
        className={[
          "absolute top-0 h-full w-full max-w-xl bg-white shadow-2xl",
          "border-l border-brand-900/10",
          isRTL ? "left-0" : "right-0",
          "animate-[slideIn_.18s_ease-out]",
        ].join(" ")}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="p-6 sm:p-8 h-full overflow-auto">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-[18px] sm:text-[20px] font-semibold text-brand-900 truncate">
                {member?.name || t("team.profile", "Profile")}
              </div>
              <div className="mt-1 text-[13px] text-muted">
                {member?.specialty || t("team.unknownSpecialty", "Specialty")}
              </div>
            </div>

            <Button variant="secondary" size="sm" onClick={onClose} className="rounded-full">
              {t("common.close", "Close")}
            </Button>
          </div>

          <div className="mt-5 flex gap-4">
            <div className="h-20 w-20 rounded-3xl overflow-hidden border border-brand-900/10 bg-surface shrink-0">
              {member?.photo ? (
                <img src={member.photo} alt={member.name} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full grid place-items-center text-[20px] font-semibold text-brand-900">
                  {getInitial(member?.name)}
                </div>
              )}
            </div>

            <div className="min-w-0">
              {member?.roleShort ? (
                <div className="inline-flex rounded-full bg-brand-900/5 px-3 py-1 text-[12px] font-semibold text-brand-900">
                  {member.roleShort}
                </div>
              ) : null}

              <div className="mt-2 flex flex-wrap gap-2">
                {typeof member?.years === "number" ? (
                  <span className="rounded-full border border-brand-900/10 bg-surface px-3 py-1 text-[12px] font-semibold text-brand-900">
                    {t("team.yearsExpShort", { years: member.years, defaultValue: "{{years}} yrs exp" })}
                  </span>
                ) : null}

                {member?.availability ? (
                  <span className="rounded-full border border-brand-900/10 bg-surface px-3 py-1 text-[12px] font-semibold text-brand-900">
                    {member.availability}
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          {member?.bio ? (
            <div className="mt-6">
              <div className="text-[13px] font-semibold text-brand-900">{t("team.aboutDoctor", "About")}</div>
              <p className="mt-2 text-[14px] leading-relaxed text-text/80">{member.bio}</p>
            </div>
          ) : null}

          {Array.isArray(member?.tags) && member.tags.length ? (
            <div className="mt-6">
              <div className="text-[13px] font-semibold text-brand-900">{t("team.focusAreas", "Focus areas")}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {member.tags.slice(0, 12).map((tag, idx) => (
                  <span
                    key={idx}
                    className="rounded-full border border-brand-900/10 bg-surface px-3 py-1 text-[12px] font-semibold text-brand-900"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {(member?.phone || member?.email) ? (
            <div className="mt-7 rounded-3xl border border-brand-900/10 bg-surface/60 p-4">
              <div className="text-[13px] font-semibold text-brand-900">{t("team.contactBlock", "Contact")}</div>
              <div className="mt-3 grid gap-2 text-[13px] text-muted">
                {member?.phone ? (
                  <a className="text-brand-900 hover:underline" href={`tel:${member.phone}`}>
                    {t("team.phone", "Phone")}: {member.phone}
                  </a>
                ) : null}
                {member?.email ? (
                  <a className="text-brand-900 hover:underline" href={`mailto:${member.email}`}>
                    {t("team.email", "Email")}: {member.email}
                  </a>
                ) : null}
              </div>
            </div>
          ) : null}

          <div className="mt-8 flex justify-end gap-3">
            <Button
              onClick={() => (window.location.href = "/contact")}
              className="rounded-full px-6 py-2.5 text-[13px] font-semibold bg-brand-900 text-white hover:bg-brand-900/90"
            >
              {t("team.book", "Book / Contact")}
            </Button>
          </div>
        </div>
      </div>

      {/* tiny keyframes */}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(${isRTL ? "-12px" : "12px"}); opacity: .6; }
          to   { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ✅ Modern row (not a card-grid)
function DoctorRow({ m, onOpen, t }) {
  const initial = getInitial(m?.name);
  const tags = Array.isArray(m?.tags) ? m.tags.slice(0, 3) : [];

  return (
    <button
      type="button"
      onClick={() => onOpen(m)}
      className={[
        "w-full text-left",
        "rounded-3xl border border-brand-900/10 bg-white/70",
        "px-4 sm:px-5 py-4",
        "hover:bg-white hover:shadow-sm transition",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
      ].join(" ")}
    >
      <div className="flex items-start gap-4">
        <div className="h-14 w-14 rounded-3xl overflow-hidden border border-brand-900/10 bg-surface shrink-0">
          {m?.photo ? (
            <img src={m.photo} alt={m.name} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full grid place-items-center text-[16px] font-semibold text-brand-900">
              {initial}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[15px] sm:text-[16px] font-semibold text-brand-900 truncate">
                {m?.name}
              </div>
              <div className="mt-1 text-[13px] text-muted truncate">
                {m?.specialty}
                {m?.roleShort ? <span className="text-text/60"> • {m.roleShort}</span> : null}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-end">
              {typeof m?.years === "number" ? (
                <span className="rounded-full bg-brand-900/5 px-3 py-1 text-[12px] font-semibold text-brand-900">
                  {t("team.yearsBadge", { years: m.years, defaultValue: "{{years}} yrs" })}
                </span>
              ) : null}
              {m?.availability ? (
                <span className="rounded-full bg-surface px-3 py-1 text-[12px] font-semibold text-brand-900 border border-brand-900/10">
                  {m.availability}
                </span>
              ) : null}
            </div>
          </div>

          {m?.bio ? (
            <p className="mt-3 text-[13px] text-text/75 leading-relaxed line-clamp-2">
              {m.bio}
            </p>
          ) : null}

          {tags.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="rounded-full border border-brand-900/10 bg-surface px-3 py-1 text-[11px] font-semibold text-brand-900"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-4 text-[12px] font-semibold text-brand-900">
            {t("team.openProfile", "Open profile")} →
          </div>
        </div>
      </div>
    </button>
  );
}

export default function MedicalTeam() {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir?.() || (i18n.language?.startsWith("ar") ? "rtl" : "ltr");
  const isRTL = dir === "rtl";

  const team = useMemo(() => getTeamContent(i18n.language || "en"), [i18n.language]);
  const members = Array.isArray(team?.members) ? team.members : [];

  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("all");
  const [sortKey, setSortKey] = useState("name");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const specialties = useMemo(() => buildSpecialties(members), [members]);

  const filtered = useMemo(() => {
    const q = normalizeText(query);
    const base = members.filter((m) => {
      const hitText =
        normalizeText(m?.name).includes(q) ||
        normalizeText(m?.specialty).includes(q) ||
        normalizeText(m?.roleShort).includes(q) ||
        normalizeText((m?.tags || []).join(" ")).includes(q);

      const hitSpec = specialty === "all" ? true : m?.specialty === specialty;
      return hitText && hitSpec;
    });
    return sortMembers(base, sortKey);
  }, [members, query, specialty, sortKey]);

  const kicker = team?.kicker || t("team.kicker", "Medical Team");
  const title = team?.title || t("team.title", "Our Doctors");
  const subtitle = team?.subtitle || t("team.subtitle", "Browse doctors and view full profiles.");

  return (
    <>
      <Section className="py-14 sm:py-16 relative overflow-hidden">
        {/* New modern hero (not like Home) */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-surface" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
        </div>

        <Container className="relative" dir={isRTL ? "rtl" : "ltr"}>
          <Reveal>
            <div className="flex flex-col gap-4">
              <div className="inline-flex w-fit items-center rounded-full border border-brand-900/15 bg-white/70 px-4 py-2 text-[12px] font-semibold text-brand-900">
                {kicker}
              </div>

              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                <div>
                  <h1 className="text-[34px] sm:text-[40px] font-semibold text-brand-900">
                    {title}
                  </h1>
                  <p className="mt-2 text-[14px] sm:text-[15px] text-muted max-w-2xl">
                    {subtitle}
                  </p>
                </div>

                {/* Sticky-ish filter bar feel */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t("team.searchPlaceholder", "Search doctors...")}
                    className="w-full sm:w-[260px] min-h-[44px] rounded-2xl border border-border bg-white/90 px-4 text-[14px] outline-none focus:ring-2 focus:ring-accent/40"
                  />

                  <select
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="w-full sm:w-[220px] min-h-[44px] rounded-2xl border border-border bg-white/90 px-4 text-[14px] outline-none focus:ring-2 focus:ring-accent/40"
                  >
                    <option value="all">{t("team.allSpecialties", "All specialties")}</option>
                    {specialties.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>

                  <select
                    value={sortKey}
                    onChange={(e) => setSortKey(e.target.value)}
                    className="w-full sm:w-[220px] min-h-[44px] rounded-2xl border border-border bg-white/90 px-4 text-[14px] outline-none focus:ring-2 focus:ring-accent/40"
                  >
                    <option value="name">{t("team.sortName", "Sort: Name")}</option>
                    <option value="years_desc">{t("team.sortYearsDesc", "Sort: Experience (high)")}</option>
                    <option value="years_asc">{t("team.sortYearsAsc", "Sort: Experience (low)")}</option>
                  </select>
                </div>
              </div>

              <div className="text-[12px] text-muted">
                {t("team.resultsCount", { count: filtered.length, defaultValue: "{{count}} doctors" })}
              </div>
            </div>
          </Reveal>

          {/* Modern directory list */}
          <div className="mt-8 grid gap-4">
            {filtered.length === 0 ? (
              <div className="rounded-3xl border border-brand-900/10 bg-white/70 p-8 text-center">
                <div className="text-[16px] font-semibold text-brand-900">
                  {t("team.emptyTitle", "No results")}
                </div>
                <div className="mt-2 text-[13px] text-muted">
                  {t("team.emptyHint", "Try another search term or reset filters.")}
                </div>

                <div className="mt-5 flex justify-center">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setQuery("");
                      setSpecialty("all");
                      setSortKey("name");
                    }}
                    className="rounded-full px-6 py-2.5 text-[13px] font-semibold"
                  >
                    {t("team.reset", "Reset")}
                  </Button>
                </div>
              </div>
            ) : (
              filtered.map((m) => (
                <DoctorRow
                  key={m?.id || m?.name}
                  m={m}
                  t={t}
                  onOpen={(mm) => {
                    setSelected(mm);
                    setDrawerOpen(true);
                  }}
                />
              ))
            )}
          </div>
        </Container>
      </Section>

      <ProfileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        member={selected}
        t={t}
        isRTL={isRTL}
      />
    </>
  );
}
