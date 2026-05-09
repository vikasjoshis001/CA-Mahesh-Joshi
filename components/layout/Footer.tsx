import Link from "next/link";
import Image from "next/image";
import type { ReactElement } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/ui";
import { navigation, siteConfig, socialLinks } from "@/config/site";
import { services } from "@/lib/data/services";
import { OFFICE_HOURS } from "@/config/constants";

// ── Social icon SVGs (inline, zero extra dependencies) ──────────────────────

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Active social links (filter out empty strings)
const activeSocialLinks = [
  socialLinks.youtube   && { href: socialLinks.youtube,   label: "YouTube",   Icon: YoutubeIcon,   hoverColor: "hover:text-red-400" },
  socialLinks.instagram && { href: socialLinks.instagram, label: "Instagram",  Icon: InstagramIcon, hoverColor: "hover:text-pink-400" },
  socialLinks.twitter   && { href: socialLinks.twitter,   label: "X (Twitter)", Icon: XIcon,        hoverColor: "hover:text-sky-400" },
  socialLinks.linkedin  && { href: socialLinks.linkedin,  label: "LinkedIn",   Icon: XIcon,        hoverColor: "hover:text-blue-400" },
].filter(Boolean) as {
  href: string;
  label: string;
  Icon: (props: { className?: string }) => ReactElement;
  hoverColor: string;
}[];

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
            <div className="flex items-center gap-2 text-sm text-white/80 mb-5">
              <span className="font-semibold">ACA Qualified</span>
              <span>•</span>
              <span>ICAI Registered</span>
            </div>

            {/* Social Links */}
            {activeSocialLinks.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">
                  Follow Us
                </p>
                <div className="flex items-center gap-3">
                  {activeSocialLinks.map(({ href, label, Icon, hoverColor }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow on ${label}`}
                      className={`w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 ${hoverColor} hover:bg-white/20 transition-all duration-200`}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            )}
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

            {/* Social links — compact repeat in bottom bar for visibility */}
            {activeSocialLinks.length > 0 && (
              <div className="flex items-center gap-3">
                {activeSocialLinks.map(({ href, label, Icon, hoverColor }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow on ${label}`}
                    className={`text-white/50 ${hoverColor} transition-colors`}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}

            {/* Designed & Developed with ♥ by Your Team */}
          </div>
        </Container>
      </div>
    </footer>
  );
}
