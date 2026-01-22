import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import Button from "../components/ui/Button";

export default function Contact() {
  return (
    <div className="bg-bg">
      <Section>
        <Container>
          <h1 className="text-h2 text-brand-900">Contact</h1>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <Card>
              <h2 className="text-h3">Send a Message</h2>

              <div className="mt-4 space-y-4">
                <Input
                  name="name"
                  label="Full Name"
                  placeholder="Your name"
                />
                <Input
                  name="phone"
                  label="Phone"
                  placeholder="+973 ..."
                  hint="We usually respond within 24 hours."
                />
                <Textarea
                  name="message"
                  label="Message"
                  placeholder="How can we help?"
                />
                <Button>Submit</Button>
              </div>
            </Card>

            <Card>
              <h2 className="text-h3">Clinic Info</h2>
              <p className="mt-2 text-body text-muted">
                Gulf Medical Complex, Salmanniya
              </p>
              <p className="mt-1 text-body">
                Phone: <span className="text-brand-900">+973 17270017</span>
              </p>
            </Card>
          </div>
        </Container>
      </Section>
    </div>
  );
}
