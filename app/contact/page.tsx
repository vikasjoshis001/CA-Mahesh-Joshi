import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Container, SectionHeading, Card, CardHeader, CardTitle, CardContent, Button } from "@/components/ui";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/config/site";
import { OFFICE_HOURS } from "@/config/constants";

export default function ContactPage() {
  // Real office location - ANP Landmark, Wakad
  // Using the actual address for embedding
  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.8837!2d73.7674!3d18.6049!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDM2JzE3LjYiTiA3M8KwNDYnMDIuNyJF!5e0!3m2!1sen!2sin!4v1234567890&q=${encodeURIComponent(
    siteConfig.links.address
  )}`;

  // Direct link to Google Maps for "Get Directions" button
  const googleMapsLink = "https://maps.app.goo.gl/acYMSXZQ53xYgQ9bA";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark py-20 text-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Have questions or need professional CA services? We're here to help.
              Reach out to us and we'll respond as soon as possible.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <Container className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form - Takes 2 columns */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          {/* Contact Information Sidebar */}
          <div className="space-y-6">
            {/* Phone Card */}
            <Card variant="elevated">
              <CardHeader>
                <div className="w-12 h-12 bg-primary rounded-lg mb-3 flex items-center justify-center">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Call Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {siteConfig.links.phone.map((phone, index) => (
                    <a
                      key={index}
                      href={`tel:${phone}`}
                      className="block text-lg font-medium text-primary hover:text-primary-dark transition-colors"
                    >
                      {phone}
                    </a>
                  ))}
                  <p className="text-sm text-muted-foreground mt-2">
                    Available during office hours
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Email Card */}
            <Card variant="elevated">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary rounded-lg mb-3 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Email Us</CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={`mailto:${siteConfig.links.email}`}
                  className="block text-base font-medium text-primary hover:text-primary-dark transition-colors break-all"
                >
                  {siteConfig.links.email}
                </a>
                <p className="text-sm text-muted-foreground mt-2">
                  We'll respond within 24 hours
                </p>
              </CardContent>
            </Card>

            {/* WhatsApp Card */}
            <Card variant="elevated">
              <CardHeader>
                <div className="w-12 h-12 bg-accent rounded-lg mb-3 flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <CardTitle>WhatsApp</CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={`https://wa.me/${siteConfig.links.whatsapp}?text=Hi, I would like to know more about your CA services.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="accent" className="w-full">
                    Chat on WhatsApp
                  </Button>
                </a>
                <p className="text-sm text-muted-foreground mt-2">
                  Quick response via WhatsApp
                </p>
              </CardContent>
            </Card>

            {/* Office Hours Card */}
            <Card variant="bordered" className="bg-muted">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg mb-3 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Office Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mon - Fri:</span>
                    <span className="font-medium text-foreground">10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday:</span>
                    <span className="font-medium text-foreground">10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday:</span>
                    <span className="font-medium text-error">Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Office Location */}
        <SectionHeading
          title="Visit Our Office"
          subtitle="We're located in the heart of Wakad, Pimpri Chinchwad"
          accent
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Address Card */}
          <Card variant="bordered">
            <CardHeader>
              <div className="w-12 h-12 bg-primary rounded-lg mb-3 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Office Address</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed mb-4">
                {siteConfig.links.address}
              </p>
              <a
                href={googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="w-full">
                  <MapPin className="h-4 w-4" />
                  Get Directions
                </Button>
              </a>

              {/* Landmarks */}
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="font-semibold text-foreground mb-3">Nearby Landmarks</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Near Bhumkar Chowk</li>
                  <li>• ANP Landmark Building, 6th Floor</li>
                  <li>• Wakad, Pimpri Chinchwad</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Google Maps */}
          <div className="relative w-full h-[400px] lg:h-full min-h-[400px] rounded-lg overflow-hidden border border-border">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location - ANP Landmark, Wakad"
              className="absolute inset-0"
            />
          </div>
        </div>

        {/* FAQ or Additional Info */}
        <div className="mt-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Need Immediate Assistance?</h2>
          <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
            For urgent matters, please call us directly. We're committed to providing
            prompt and professional service to all our clients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${siteConfig.links.phone[0]}`}>
              <Button variant="secondary" size="lg">
                <Phone className="h-5 w-5" />
                Call Now
              </Button>
            </a>
            <a
              href={`https://wa.me/${siteConfig.links.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 border-white text-white hover:bg-white hover:text-primary"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Chat
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
