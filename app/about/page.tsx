import { Award, GraduationCap, Briefcase, Target, Phone, Mail } from "lucide-react";
import Image from "next/image";
import { Container, SectionHeading, Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { aboutMetadata } from "@/lib/metadata";
import { BreadcrumbSchema } from "@/components/StructuredData";
import Link from "next/link";

export const metadata = aboutMetadata;

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://camaheshjoshi.com" },
        { name: "About", url: "https://camaheshjoshi.com/about" }
      ]} />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark py-20 text-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left: Text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                <Award className="h-5 w-5 text-secondary" />
                <span className="text-sm font-medium">About Us</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                CA Mahesh Joshi
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                A dedicated Chartered Accountant committed to providing professional,
                reliable, and comprehensive financial services to individuals and businesses
                in Pune.
              </p>
            </div>
            {/* Right: Convocation Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/20 max-w-md w-full">
                <Image
                  src="/images/about/ca_induction.jpeg"
                  alt="CA Mahesh Joshi — ICAI Convocation December 2025"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <Container className="py-16">
        {/* Professional Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Professional Background
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                <p>
                  Welcome to <strong>Mahesh Joshi & Associates</strong>. As an Associate Chartered Accountant (ACA)
                  and registered member of the Institute of Chartered Accountants of India (ICAI),
                  I bring professional expertise and dedication to every client engagement.
                </p>
                <p>
                  With over 5 years of experience in taxation, audit, and business consulting,
                  I have helped numerous individuals and businesses navigate complex financial matters,
                  ensure compliance, and achieve their financial goals.
                </p>
                <p>
                  My practice is built on the foundation of integrity, professionalism, and personalized service.
                  Whether you need assistance with income tax filing, GST compliance, statutory audits,
                  or business setup, I am committed to delivering timely and accurate solutions tailored to your needs.
                </p>
              </div>
            </div>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card variant="bordered">
                <CardHeader>
                  <Target className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    To provide expert financial services that empower businesses and individuals
                    to make informed decisions, achieve compliance, and grow sustainably.
                  </p>
                </CardContent>
              </Card>

              <Card variant="bordered">
                <CardHeader>
                  <Award className="h-8 w-8 text-secondary mb-2" />
                  <CardTitle>Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    To be the most trusted CA firm in the region, recognized for professional excellence,
                    ethical practices, and long-term client relationships.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Qualifications Card */}
            <Card variant="elevated">
              <CardHeader>
                {/* CA India Logo instead of GraduationCap */}
                <div className="w-16 h-16 bg-primary/10 rounded-xl mb-4 flex items-center justify-center p-2">
                  <Image
                    src="/images/ca-india-logo.svg"
                    alt="CA India Certified"
                    width={64}
                    height={48}
                    className="w-full h-auto"
                  />
                </div>
                <CardTitle>Qualifications</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">✓</span>
                    <span className="text-sm text-muted-foreground">
                      <strong>ACA</strong> - Associate Chartered Accountant
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">✓</span>
                    <span className="text-sm text-muted-foreground">
                      Registered with <strong>ICAI</strong> (Institute of Chartered Accountants of India)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">✓</span>
                    <span className="text-sm text-muted-foreground">
                      <strong>5+ Years</strong> of Professional Experience
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Expertise Card */}
            <Card variant="elevated">
              <CardHeader>
                <Briefcase className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Areas of Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Income Tax & Tax Planning</li>
                  <li>• GST & Indirect Taxation</li>
                  <li>• Statutory & Tax Audits</li>
                  <li>• Business Registration</li>
                  <li>• Financial Consulting</li>
                  <li>• Compliance Management</li>
                </ul>
              </CardContent>
            </Card>

            {/* Contact CTA */}
            <Card variant="bordered" className="bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  Ready to work together? Contact us today!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <a href={`tel:${siteConfig.links.phone[0]}`}>
                  <Button variant="primary" className="w-full">
                    <Phone className="h-4 w-4" />
                    Call Now
                  </Button>
                </a>
                <Link href="/contact">
                  <Button variant="outline" className="w-full">
                    <Mail className="h-4 w-4" />
                    Send Message
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Core Values */}
        <SectionHeading
          title="Our Core Values"
          subtitle="The principles that guide our practice"
          accent
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              title: "Integrity",
              description: "Maintaining the highest ethical standards in all our professional dealings.",
            },
            {
              title: "Excellence",
              description: "Delivering superior quality service through continuous learning and improvement.",
            },
            {
              title: "Reliability",
              description: "Being dependable and consistent in meeting deadlines and commitments.",
            },
            {
              title: "Client Focus",
              description: "Putting clients first and building long-term trusted relationships.",
            },
          ].map((value, index) => (
            <Card key={index} hover variant="bordered" className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">{index + 1}</span>
                </div>
                <CardTitle className="text-lg">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
            Whether you're an individual or a business, we're here to help you with all your financial needs.
          </p>
          <Link href="/contact">
            <Button variant="secondary" size="lg">
              Schedule a Consultation
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
