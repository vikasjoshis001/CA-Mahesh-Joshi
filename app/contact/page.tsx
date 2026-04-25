import { Container, SectionHeading } from "@/components/ui";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Container className="py-24">
        <SectionHeading
          title="Contact Us"
          subtitle="This page is coming soon"
          accent
        />
        <p className="text-center text-muted-foreground">
          Contact page content will be built in the next tasks.
        </p>
      </Container>
    </div>
  );
}
