import { useMemo, useState } from "react";

export default function FaqAccordion({ items = [] }) {
    const [openIndex, setOpenIndex] = useState(1); // default open (like reference)

    const safeItems = useMemo(() => items.filter(Boolean), [items]);

    return (
        <div className="space-y-4">
            {safeItems.map((qa, idx) => {
                const isOpen = idx === openIndex;

                return (
                    <div
                        key={idx}
                        className={[
                            "rounded-2xl border transition overflow-hidden",
                            isOpen
                                ? "bg-[#C39B78] border-white/10"
                                : "bg-white border-white/10",
                        ].join(" ")}
                    >
                        <button
                            type="button"
                            onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                            className={[
                                "w-full flex items-center justify-between gap-4 px-6 py-5 text-left",
                                isOpen ? "text-white" : "text-brand-900",
                            ].join(" ")}
                        >
                            <span className="text-[16px] sm:text-[18px] font-semibold">
                                {qa.q}
                            </span>

                            <span
                                className={[
                                    "shrink-0 font-light leading-none",
                                    "text-[28px] sm:text-[32px]",
                                    isOpen ? "text-white" : "text-brand-900",
                                ].join(" ")}
                                aria-hidden="true"
                            >
                                {isOpen ? "−" : "+"}
                            </span>
                        </button>

                        <div
                            className={[
                                "grid transition-[grid-template-rows] duration-300 ease-out",
                                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                            ].join(" ")}
                        >
                            <div className="overflow-hidden">
                                <div
                                    className={[
                                        "px-6 pb-6 transition-opacity duration-200",
                                        isOpen ? "opacity-100" : "opacity-0",
                                    ].join(" ")}
                                >
                                    <p className="text-[14px] leading-relaxed">
                                        {qa.a}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}