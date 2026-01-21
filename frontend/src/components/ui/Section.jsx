export default function Section({
  children,
  className = "",
  as = "section",
  padded = true,
}) {
  const Component = as;
  return (
    <Component
      className={`${padded ? "py-12 sm:py-16" : ""} ${className}`}
    >
      {children}
    </Component>
  );
}
