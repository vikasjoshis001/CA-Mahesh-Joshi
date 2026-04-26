import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/ui";
import { navigation, siteConfig } from "@/config/site";
import { services } from "@/lib/data/services";
import { OFFICE_HOURS } from "@/config/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer Content */}
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            {/* CA India Logo */}
            <Image
              src="/images/ca-india-logo.svg"
              alt="CA India - ICAI"
              width={80}
              height={60}
              className="h-12 w-auto mb-4"
            />

            <h3 className="text-lg font-bold mb-4">{siteConfig.name}</h3>
            <p className="text-white/80 text-sm mb-4 leading-relaxed">
              Professional Chartered Accountant services in Wakad, Pimpri Chinchwad.
              Providing expert solutions in taxation, audit, GST, and business consulting.
            </p>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <span className="font-semibold">ACA Qualified</span>
              <span>•</span>
              <span>ICAI Registered</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/80 hover:text-white text-sm transition-colors inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    href="/services"
                    className="text-white/80 hover:text-white text-sm transition-colors inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {service.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${siteConfig.links.phone[0]}`}
                  className="flex items-start gap-3 text-white/80 hover:text-white text-sm transition-colors group"
                >
                  <Phone className="h-4 w-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>{siteConfig.links.phone[0]}</span>
                </a>
              </li>

              <li>
                <a
                  href={`mailto:${siteConfig.links.email}`}
                  className="flex items-start gap-3 text-white/80 hover:text-white text-sm transition-colors group break-all"
                >
                  <Mail className="h-4 w-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>{siteConfig.links.email}</span>
                </a>
              </li>

              <li>
                <div className="flex items-start gap-3 text-white/80 text-sm">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span className="text-xs leading-relaxed">
                    {siteConfig.links.address}
                  </span>
                </div>
              </li>

              <li>
                <div className="flex items-start gap-3 text-white/80 text-sm">
                  <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div className="text-xs space-y-1">
                    <p>{OFFICE_HOURS.weekdays}</p>
                    <p>{OFFICE_HOURS.saturday}</p>
                    <p className="text-white/60">{OFFICE_HOURS.sunday}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <Container className="py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
            <p>
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>
            <p className="flex items-center gap-1">
              Designed & Developed with
              <span className="text-secondary">♥</span>
              by Your Team
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
