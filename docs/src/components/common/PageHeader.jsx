import Container from "../ui/Container";
import Section from "../ui/Section";
import Badge from "../ui/Badge";

export default function PageHeader({
  title,
  subtitle,
  badge,
  actions, // optional React node (buttons/links)
  variant = "default", // default | surface
}) {
  return (
    <Section className={variant === "surface" ? "bg-surface" : ""}>
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {badge ? (
              <div className="mb-3">
                <Badge variant="brand">{badge}</Badge>
              </div>
            ) : null}

            <h1 className="text-h2 text-brand-900">{title}</h1>

            {subtitle ? (
              <p className="mt-2 max-w-2xl text-body text-muted">{subtitle}</p>
            ) : null}
          </div>

          {actions ? <div className="flex gap-3">{actions}</div> : null}
        </div>
      </Container>
    </Section>
  );
}
