import Link from "next/link";
import { FileText, Receipt, Shield, Building, Calculator, ClipboardCheck, Phone, CheckCircle } from "lucide-react";
import { Container, SectionHeading, Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui";
import { services } from "@/lib/data/services";
import { siteConfig } from "@/config/site";

const iconMap: Record<string, any> = {
  FileText,
  Receipt,
  Shield,
  Building,
  Calculator,
  ClipboardCheck,
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark py-20 text-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Comprehensive CA services tailored to meet your business and personal financial needs.
              From taxation to audit, we've got you covered.
            </p>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <Container className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || FileText;
            const colors = ["primary", "secondary", "accent"];
            const bgColor = colors[index % 3];

            return (
              <Card key={service.id} variant="bordered" hover className="overflow-hidden">
                {/* Header with colored background */}
                <div className={`bg-${bgColor} p-6`}>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="text-white">
                      <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                      <p className="text-white/90">{service.description}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-foreground mb-4">What's Included:</h4>
                  <ul className="space-y-3">
                    {service.features?.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Why Choose Our Services */}
        <SectionHeading
          title="Why Choose Our Services"
          subtitle="Professional expertise you can trust"
          accent
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: "Expert Guidance",
              description: "Professional advice from experienced CA with 5+ years in the field",
            },
            {
              title: "Timely Delivery",
              description: "100% on-time completion of all filings and compliance requirements",
            },
            {
              title: "Competitive Pricing",
              description: "Transparent and competitive pricing with no hidden charges",
            },
          ].map((benefit, index) => (
            <Card key={index} variant="elevated" className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">{index + 1}</span>
                </div>
                <CardTitle className="text-lg">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Industries We Serve */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
            Industries We Serve
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              "Retail",
              "Manufacturing",
              "IT & Software",
              "Real Estate",
              "Healthcare",
              "Education",
              "E-commerce",
              "Hospitality",
              "Construction",
              "Professional Services",
              "Trading",
              "Startups",
            ].map((industry, index) => (
              <div
                key={index}
                className="bg-muted rounded-lg p-4 text-center hover:bg-primary/10 transition-colors"
              >
                <span className="text-sm font-medium text-muted-foreground">
                  {industry}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Need Help with Your Finances?</h2>
          <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
            Get expert CA services tailored to your needs. Contact us today for a free consultation!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Get Free Consultation
              </Button>
            </Link>
            <a href={`tel:${siteConfig.links.phone[0]}`}>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 border-white text-white hover:bg-white hover:text-primary"
              >
                <Phone className="h-5 w-5" />
                Call Now
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
