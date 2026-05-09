"use client";

import { Award, Clock, Shield, TrendingUp, Users, HeartHandshake } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";

const reasons = [
  {
    icon: Award,
    title: "Expert Professionals",
    description: "ACA qualified Chartered Accountant with extensive experience in taxation and compliance.",
  },
  {
    icon: Clock,
    title: "Timely Service",
    description: "On-time delivery for all filings and compliances. Never miss a deadline.",
  },
  {
    icon: Shield,
    title: "Data Security",
    description: "Your financial data is completely secure and confidential with us.",
  },
  {
    icon: TrendingUp,
    title: "Growth Focused",
    description: "Strategic tax planning and advisory to help your business grow sustainably.",
  },
  {
    icon: Users,
    title: "Personalized Attention",
    description: "Dedicated support and customized solutions for each client's unique needs.",
  },
  {
    icon: HeartHandshake,
    title: "Trusted Relationships",
    description: "Building long-term partnerships with clients across industries.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-muted">
      <Container>
        <FadeIn>
          <SectionHeading
            title="Why Choose Us"
            subtitle="Your success is our priority. Here's what makes us different."
            accent
          />
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <StaggerItem key={index}>
                <div className="group relative bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  {/* Icon */}
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>

                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-transparent rounded-xl" />
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Container>
    </section>
  );
}
