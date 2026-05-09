"use client";

import { UserCheck, MessageCircle, Cloud, Phone, Upload, CheckCircle } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";

const reasons = [
  {
    icon: UserCheck,
    title: "Direct Founder Access",
    description:
      "You work directly with CA Mahesh Joshi — not a junior staffer. Every query, every filing, handled personally.",
  },
  {
    icon: MessageCircle,
    title: "Jargon-Free Advisory",
    description:
      "Clear, actionable financial advice in plain language. No complex tax jargon — just guidance you can act on.",
  },
  {
    icon: Cloud,
    title: "100% Digital Flow",
    description:
      "Seamless document sharing and cloud-based compliance. Modern, paperless, and built for busy professionals.",
  },
];

const steps = [
  {
    icon: Phone,
    step: "Step 1",
    title: "Free Discovery Call",
    description: "We start with a no-obligation call to understand your financial needs and goals.",
  },
  {
    icon: Upload,
    step: "Step 2",
    title: "Secure Digital Document Upload",
    description: "Share your documents digitally through a secure channel — no physical visits needed.",
  },
  {
    icon: CheckCircle,
    step: "Step 3",
    title: "Timely Filing & Proactive Advisory",
    description: "We handle all filings on time and keep you ahead with proactive tax planning advice.",
  },
];

export function WhyChooseUs() {
  return (
    <>
      {/* Why Choose Us */}
      <section className="py-20 bg-muted">
        <Container>
          <FadeIn>
            <SectionHeading
              title="Why Choose Us"
              subtitle="Client-first CA services designed around your convenience."
              accent
            />
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.1}>
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <StaggerItem key={index}>
                  <div className="group relative bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                    <div className="mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-card-foreground mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {reason.description}
                    </p>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-transparent rounded-xl" />
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <Container>
          <FadeIn>
            <SectionHeading
              title="How It Works"
              subtitle="Get started in three simple steps."
              accent
            />
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.15}>
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <StaggerItem key={index}>
                  <div className="relative flex flex-col items-center text-center p-6">
                    {/* Step number */}
                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mb-4 shadow-lg">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <span className="text-xs font-bold text-primary uppercase tracking-widest mb-1">
                      {step.step}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                    {/* Connector line — hidden on last item */}
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute top-7 left-[calc(50%+3.5rem)] w-[calc(100%-7rem)] h-0.5 bg-border" />
                    )}
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </section>
    </>
  );
}
