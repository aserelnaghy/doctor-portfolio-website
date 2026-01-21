export default function Stack({
  children,
  className = "",
  gap = "md", // sm | md | lg
  as = "div",
}) {
  const Component = as;

  const gapMap = {
    sm: "space-y-2",
    md: "space-y-4",
    lg: "space-y-6",
  };

  return (
    <Component className={[gapMap[gap], className].join(" ")}>
      {children}
    </Component>
  );
}
