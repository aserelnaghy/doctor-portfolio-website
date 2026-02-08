import Button from "../ui/Button";

export default function ServiceCard({ dir = "ltr", title, desc, image, onReadMore }) {
    const isRTL = dir === "rtl";

    return (
        <div className="rounded-3xl border border-border bg-gradient-to-b from-surface to-bg shadow-sm hover:shadow-md transition overflow-hidden">
            {/* Image */}
            <div className="p-5 pb-0">
                <div className="overflow-hidden rounded-2xl border border-border/70 bg-white">
                    <img
                        src={image}
                        alt={title}
                        className="h-[200px] w-full object-cover"
                        loading="lazy"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="p-5 sm:p-6">
                <h3 className="text-[18px] sm:text-[20px] font-semibold text-text leading-snug">
                    {title}
                </h3>

                <p className="mt-2 text-[13px] sm:text-[14px] text-muted leading-relaxed">
                    {desc}
                </p>

                <div className={["mt-5", isRTL ? "text-right" : "text-left"].join(" ")}>
                    <Button
                        variant="secondary"
                        onClick={onReadMore}
                        className="rounded-xl px-5 py-2.5 text-[13px] min-h-[44px]"
                    >
                        {isRTL ? "اعرف المزيد" : "Read more"}
                    </Button>
                </div>
            </div>
        </div>
    );
}