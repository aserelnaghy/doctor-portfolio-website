export default function Badge({
  children,
  className = "",
  variant = "default", // default | brand | accent | danger
}) {
  const variants = {
    default: "bg-surface text-text border border-border",
    brand: "bg-brand/10 text-brand-900",
    accent: "bg-accent/10 text-accent",
    danger: "bg-danger/10 text-danger",
  };

  return (
    <span
      className={[
        "inline-flex items-center rounded-sm px-2.5 py-1 text-small font-medium",
        variants[variant],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
