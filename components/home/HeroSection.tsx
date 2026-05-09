"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, CheckCircle, Award } from "lucide-react";
import { Button, Container } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { FadeIn } from "@/components/animations";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary-dark to-primary py-20 md:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <FadeIn delay={0.2}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                <Award className="h-5 w-5 text-secondary"/>
                <span className="text-sm font-medium">
                  ACA Qualified | ICAI Registered
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              {/* Main Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Mahesh M. Joshi
                <span className="block text-2xl md:text-3xl lg:text-4xl text-secondary mt-2">
                  Chartered Accountant
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.4}>
              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                Your Trusted Partner for{" "}
                <span className="text-accent font-semibold">Tax</span>,{" "}
                <span className="text-secondary font-semibold">Audit</span>, and{" "}
                <span className="text-accent font-semibold">Business</span>{" "}
                Solutions in Wakad
              </p>
            </FadeIn>

            <FadeIn delay={0.5}>
              {/* Description */}
              <p className="text-lg text-white/80 mb-8">
                Professional CA services including Income Tax, GST, Audit, Business Registration,
                and Compliance Management. Expert guidance for individuals and businesses.
              </p>
            </FadeIn>

            <FadeIn delay={0.6}>
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/contact">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Get Free Consultation
                  </Button>
                </Link>
                <a href={`tel:${siteConfig.links.phone[0]}`}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto bg-white/10 border-white text-white hover:bg-white hover:text-primary"
                  >
                    <Phone className="h-5 w-5" />
                    Call Now
                  </Button>
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.7}>
              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>Expert CA Services</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>Timely Compliance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>Trusted by 100+ Clients</span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Content - Photo */}
          <FadeIn delay={0.4} className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                <Image
                  src="/images/hero/mahesh_joshi_dp.jpeg"
                  alt="CA Mahesh M. Joshi"
                  width={384}
                  height={384}
                  className="w-full h-full object-cover object-top"
                  priority
                />
              </div>
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full border-2 border-secondary/40 scale-110 pointer-events-none" />
            </div>
          </FadeIn>
        </div>
      </Container>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="currentColor"
            className="text-background"
          />
        </svg>
      </div>
    </section>
  );
}
