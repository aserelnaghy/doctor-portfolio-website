import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import Grid from "../components/common/Grid";

export default function Home() {
  return (
    <div className="bg-bg">
      <Section>
        <Container>
          <Grid cols={3}>
            <Card>Service 1</Card>
            <Card>Service 2</Card>
            <Card>Service 3</Card>
          </Grid>
        </Container>
      </Section>
    </div>
  );
}
