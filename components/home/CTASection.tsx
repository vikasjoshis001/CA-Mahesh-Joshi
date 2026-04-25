import Link from "next/link";
import { Phone, Mail, ArrowRight } from "lucide-react";
import { Container, Button } from "@/components/ui";
import { siteConfig } from "@/config/site";

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary-dark to-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Get expert CA services for your business. Schedule a free consultation today!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/contact">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto group">
                Get Free Consultation
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href={`tel:${siteConfig.links.phone[0]}`}>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-white/10 border-white text-white hover:bg-white hover:text-primary"
              >
                <Phone className="h-5 w-5" />
                {siteConfig.links.phone[0]}
              </Button>
            </a>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 text-white/90">
              <Phone className="h-5 w-5 text-secondary" />
              <div className="text-left">
                <div className="text-sm text-white/60">Call Us</div>
                <a
                  href={`tel:${siteConfig.links.phone[0]}`}
                  className="font-medium hover:text-secondary transition-colors"
                >
                  {siteConfig.links.phone[0]}
                </a>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 text-white/90">
              <Mail className="h-5 w-5 text-secondary" />
              <div className="text-left">
                <div className="text-sm text-white/60">Email Us</div>
                <a
                  href={`mailto:${siteConfig.links.email}`}
                  className="font-medium hover:text-secondary transition-colors break-all text-sm"
                >
                  {siteConfig.links.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 80L60 70C120 60 240 40 360 30C480 20 600 20 720 25C840 30 960 40 1080 45C1200 50 1320 50 1380 50L1440 50V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
            fill="currentColor"
            className="text-background"
          />
        </svg>
      </div>
    </section>
  );
}
