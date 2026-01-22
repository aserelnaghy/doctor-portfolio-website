export default function Grid({
  children,
  className = "",
  cols = 3, // 1 | 2 | 3 | 4
  gap = "md", // sm | md | lg
}) {
  const gapMap = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  const colsMap = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={["grid", colsMap[cols] || colsMap[3], gapMap[gap] || gapMap.md, className].join(" ")}>
      {children}
    </div>
  );
}
