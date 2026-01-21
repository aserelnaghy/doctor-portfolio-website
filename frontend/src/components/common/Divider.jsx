export default function Divider({ className = "" }) {
  return <hr className={["border-border", className].join(" ")} />;
}
