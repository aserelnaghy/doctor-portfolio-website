export default function Button({
  children,
  className = "",
  variant = "primary", // primary | secondary | ghost | danger
  size = "md", // sm | md | lg
  type = "button",
  disabled = false,
  loading = false,
  onClick,
  ...rest
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-sm font-medium transition " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 " +
    "disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-brand text-white hover:bg-brand-900",
    secondary: "bg-surface text-text border border-border hover:bg-bg",
    ghost: "bg-transparent text-text hover:bg-surface",
    danger: "bg-danger text-white hover:opacity-90",
  };

  const sizes = {
    sm: "h-9 px-3 text-small",
    md: "h-10 px-4 text-body",
    lg: "h-11 px-5 text-body",
  };

  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >
      {loading && (
        <span
          className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}
