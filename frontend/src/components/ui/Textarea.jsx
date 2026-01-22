export default function Textarea({
  className = "",
  label,
  hint,
  error,
  id,
  rows = 5,
  ...rest
}) {
  const inputId = id || rest.name;

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={inputId} className="block text-small text-text">
          {label}
        </label>
      )}

      <textarea
        id={inputId}
        rows={rows}
        className={[
          "w-full rounded-sm border bg-bg px-3 py-2 text-body text-text",
          "border-border focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/60",
          error ? "border-danger focus:ring-danger/20 focus:border-danger" : "",
          className,
        ].join(" ")}
        {...rest}
      />

      {error ? (
        <p className="text-small text-danger">{error}</p>
      ) : hint ? (
        <p className="text-small text-muted">{hint}</p>
      ) : null}
    </div>
  );
}
