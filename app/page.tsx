"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Container,
  Input,
  SectionHeading,
} from "@/components/ui";

export default function Home() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate validation
    if (!email.includes("@")) {
      setEmailError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    setEmailError("");
    setTimeout(() => {
      setIsLoading(false);
      alert("Form submitted!");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Container className="py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-primary mb-4">
            Mahesh Joshi & Associates
          </h1>
          <p className="text-xl text-muted-foreground">
            UI Components Showcase
          </p>
        </div>

        {/* Section Heading Component */}
        <SectionHeading
          title="Reusable UI Components"
          subtitle="Production-ready components built with TypeScript and Tailwind CSS"
          accent
        />

        {/* Buttons Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Button Variants
          </h2>

          <div className="space-y-6">
            {/* Primary Buttons */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-muted-foreground">
                Primary Variants
              </h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="sm">
                  Small Button
                </Button>
                <Button variant="primary" size="md">
                  Medium Button
                </Button>
                <Button variant="primary" size="lg">
                  Large Button
                </Button>
                <Button variant="primary" isLoading>
                  Loading...
                </Button>
                <Button variant="primary" disabled>
                  Disabled
                </Button>
              </div>
            </div>

            {/* All Variants */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-muted-foreground">
                All Variants
              </h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="accent">Accent</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className="mb-16">
          <SectionHeading
            title="Card Components"
            subtitle="Flexible card layouts for services, testimonials, and more"
            align="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Default Card */}
            <Card variant="default" hover>
              <CardHeader>
                <div className="w-12 h-12 bg-primary rounded-lg mb-4 flex items-center justify-center text-white text-xl font-bold">
                  IT
                </div>
                <CardTitle>Income Tax Services</CardTitle>
                <CardDescription>
                  Complete tax filing and planning solutions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ ITR Filing (All Categories)</li>
                  <li>✓ Tax Planning & Optimization</li>
                  <li>✓ Tax Notice Handling</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Learn More
                </Button>
              </CardFooter>
            </Card>

            {/* Bordered Card */}
            <Card variant="bordered" hover>
              <CardHeader>
                <div className="w-12 h-12 bg-secondary rounded-lg mb-4 flex items-center justify-center text-white text-xl font-bold">
                  GST
                </div>
                <CardTitle>GST Services</CardTitle>
                <CardDescription>
                  Registration, filing, and compliance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ GST Registration</li>
                  <li>✓ Monthly/Quarterly Returns</li>
                  <li>✓ GST Advisory</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" size="sm" className="w-full">
                  Get Started
                </Button>
              </CardFooter>
            </Card>

            {/* Elevated Card */}
            <Card variant="elevated" hover>
              <CardHeader>
                <div className="w-12 h-12 bg-accent rounded-lg mb-4 flex items-center justify-center text-white text-xl font-bold">
                  AU
                </div>
                <CardTitle>Audit Services</CardTitle>
                <CardDescription>
                  Professional audit and assurance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Statutory Audit</li>
                  <li>✓ Tax Audit</li>
                  <li>✓ Internal Audit</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="accent" size="sm" className="w-full">
                  Contact Us
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Input & Form Section */}
        <section className="mb-16">
          <SectionHeading
            title="Form Components"
            subtitle="Input fields with validation and error handling"
            align="left"
          />

          <div className="max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle>Contact Form Demo</CardTitle>
                <CardDescription>
                  Try the input component with validation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Full Name"
                    placeholder="Enter your name"
                    required
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={emailError}
                    required
                  />

                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="+91 XXXXXXXXXX"
                    helperText="We'll never share your number"
                  />

                  <Input
                    label="Message"
                    placeholder="How can we help you?"
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    isLoading={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit Form"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Container Sizes */}
        <section className="mb-16">
          <SectionHeading
            title="Container Sizes"
            subtitle="Responsive containers for consistent layouts"
            align="left"
          />

          <div className="space-y-4">
            <Container size="sm" className="bg-muted p-4 rounded-lg">
              <p className="text-center text-muted-foreground">
                Small Container (max-w-3xl)
              </p>
            </Container>

            <Container size="md" className="bg-muted p-4 rounded-lg">
              <p className="text-center text-muted-foreground">
                Medium Container (max-w-5xl)
              </p>
            </Container>

            <Container size="lg" className="bg-muted p-4 rounded-lg">
              <p className="text-center text-muted-foreground">
                Large Container (max-w-6xl)
              </p>
            </Container>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-16">
          <SectionHeading
            title="Component Features"
            subtitle="Built with best practices and modern standards"
            accent
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "TypeScript",
                description: "Fully typed with TypeScript for better DX",
                icon: "TS",
              },
              {
                title: "Accessible",
                description: "ARIA labels and keyboard navigation",
                icon: "A11y",
              },
              {
                title: "Responsive",
                description: "Mobile-first design approach",
                icon: "📱",
              },
              {
                title: "Customizable",
                description: "Easy to extend and customize",
                icon: "🎨",
              },
            ].map((feature, index) => (
              <Card key={index} hover>
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg mb-4 flex items-center justify-center text-white text-xl font-bold">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Footer Note */}
        <div className="text-center bg-muted rounded-lg p-8">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            ✅ UI Components Ready!
          </h3>
          <p className="text-muted-foreground mb-4">
            All reusable components are built and tested. Ready to build pages!
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="primary">Start Building</Button>
            <Button variant="outline">View Documentation</Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
