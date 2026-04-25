import Link from "next/link";
import { FileText, Receipt, Shield, Building, Calculator, ClipboardCheck } from "lucide-react";
import { Container, SectionHeading, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from "@/components/ui";
import { services } from "@/lib/data/services";

const iconMap: Record<string, any> = {
  FileText,
  Receipt,
  Shield,
  Building,
  Calculator,
  ClipboardCheck,
};

export function ServicesOverview() {
  return (
    <section className="py-20 bg-background">
      <Container>
        <SectionHeading
          title="Our Services"
          subtitle="Comprehensive CA solutions for individuals and businesses"
          accent
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || FileText;
            const colors = ["primary", "secondary", "accent"];
            const color = colors[index % 3];

            return (
              <Card key={service.id} variant="bordered" hover>
                <CardHeader>
                  <div className={`w-14 h-14 bg-${color} rounded-xl mb-4 flex items-center justify-center`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features?.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-accent mt-0.5">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/services" className="w-full">
                    <Button variant="outline" size="sm" className="w-full">
                      Learn More
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/services">
            <Button variant="primary" size="lg">
              View All Services
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
