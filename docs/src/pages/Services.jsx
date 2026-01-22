import PageHeader from "../components/common/PageHeader";
import Button from "../components/ui/Button";

export default function Services() {
  return (
    <>
      <PageHeader
        title="Services"
        subtitle="Comprehensive care with a focus on diabetic foot management and general surgery."
        badge="Surgery & Diabetic Foot Center"
        actions={<Button>Call Now</Button>}
        variant="surface"
      />
    </>
  );
}
