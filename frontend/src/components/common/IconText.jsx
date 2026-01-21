export default function IconText({
  icon,          // React node (svg/icon)
  title,
  description,
  className = "",
  align = "start", // start | center
}) {
  return (
    <div
      className={[
        "flex gap-3",
        align === "center" ? "items-center" : "items-start",
        className,
      ].join(" ")}
    >
      {icon ? (
        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand/10 text-brand-900">
          {icon}
        </div>
      ) : null}

      <div>
        <div className="text-body font-semibold text-text">{title}</div>
        {description ? (
          <p className="mt-1 text-body text-muted">{description}</p>
        ) : null}
      </div>
    </div>
  );
}
