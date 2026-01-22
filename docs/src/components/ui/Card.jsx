export default function Card({
  children,
  className = "",
  as = "div",
  padded = true,
}) {
  const Component = as;

  return (
    <Component
      className={[
        "rounded-md border border-border bg-surface shadow-sm",
        padded ? "p-6" : "",
        className,
      ].join(" ")}
    >
      {children}
    </Component>
  );
}
