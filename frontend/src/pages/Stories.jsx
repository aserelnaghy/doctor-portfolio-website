import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { getStoriesContent } from "../content";

import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import Reveal from "../components/common/Reveal";
import Stagger, { StaggerItem } from "../components/common/Stagger";

function VideoModal({ open, onClose, item }) {
  if (!open || !item) return null;

  const isEmbed =
    item.videoUrl?.includes("youtube.com/embed") ||
    item.videoUrl?.includes("player.vimeo.com");

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-4xl rounded-3xl bg-white shadow-xl overflow-hidden">
        <button
          type="button"
          onClick={onClose}
          className="absolute left-4 top-4 z-10 rounded-full bg-black/60 px-3 py-1 text-small text-white"
        >
          ✕
        </button>

        <div className="aspect-video w-full bg-black">
          {isEmbed ? (
            <iframe
              src={item.videoUrl}
              title={item.title || "Patient video"}
              className="h-full w-full border-0"
              allowFullScreen
            />
          ) : (
            <video
              src={item.videoUrl}
              controls
              autoPlay
              className="h-full w-full"
            />
          )}
        </div>

        <div className="p-5">
          <h3 className="text-card-title font-bold text-brand-900">
            {item.title}
          </h3>
          {item.patientName && (
            <p className="mt-2 text-small text-muted">{item.patientName}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Stories() {
  const { i18n, t } = useTranslation();
  const [activeVideo, setActiveVideo] = useState(null);

  const dir =
    i18n.dir?.() || (i18n.language?.startsWith("ar") ? "rtl" : "ltr");
  const isRTL = dir === "rtl";

  const data = useMemo(
    () => getStoriesContent(i18n.language || "en"),
    [i18n.language]
  );

  return (
    <>
      <main className={isRTL ? "text-right" : "text-left"}>
        <Section className="py-16 sm:py-20 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-bg" />
            <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-sky/10 blur-3xl" />
          </div>

          <Container className="relative">
            <Reveal>
              <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-brand/20 to-transparent" />

              <div className="inline-flex items-center rounded-full border border-brand/15 bg-white px-4 py-2 text-badge text-brand shadow-sm">
                {t("nav.stories")}
              </div>

              <h1 className="mt-5 text-page-title text-brand-900 leading-tight">
                {data.title || t("nav.stories")}
              </h1>

              {data.subtitle && (
                <p className="mt-4 max-w-3xl text-body text-muted">
                  {data.subtitle}
                </p>
              )}
            </Reveal>

            <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(data.items || []).map((item, idx) => (
                <StaggerItem key={idx}>
                  <button
                    type="button"
                    onClick={() => setActiveVideo(item)}
                    className="block w-full text-right"
                  >
                    <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-sm hover:shadow-md transition">
                      <video
                        src={item.videoUrl}
                        className="w-full h-[360px] object-cover"
                        preload="metadata"
                      />

                      <div className="p-5">
                        <h3 className="text-card-title leading-snug text-brand-900">
                          {item.title}
                        </h3>

                        {item.patientName && (
                          <div className="mt-2 text-small text-muted">
                            {item.patientName}
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </Section>
      </main>

      <VideoModal
        open={!!activeVideo}
        item={activeVideo}
        onClose={() => setActiveVideo(null)}
      />
    </>
  );
}
