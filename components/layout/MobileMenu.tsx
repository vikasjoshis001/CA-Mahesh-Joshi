"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui";
import { navigation, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-200",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div
        className={cn(
          "fixed top-16 right-0 bottom-0 w-full max-w-sm bg-background z-50 md:hidden transition-transform duration-300 ease-in-out shadow-xl",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Navigation Links */}
          <nav className="flex-1 px-6 py-8 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors",
                    isActive
                      ? "bg-primary text-white"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Contact Info */}
          <div className="border-t border-border px-6 py-6 space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Contact Us
            </h3>

            <a
              href={`tel:${siteConfig.links.phone[0]}`}
              className="flex items-center gap-3 text-sm text-foreground/80 hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4 text-primary" />
              {siteConfig.links.phone[0]}
            </a>

            <a
              href={`mailto:${siteConfig.links.email}`}
              className="flex items-center gap-3 text-sm text-foreground/80 hover:text-primary transition-colors break-all"
            >
              <Mail className="h-4 w-4 text-primary flex-shrink-0" />
              {siteConfig.links.email}
            </a>

            <div className="flex items-start gap-3 text-sm text-foreground/80">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-xs leading-relaxed">
                {siteConfig.links.address}
              </span>
            </div>

            <Link href="/contact" onClick={onClose} className="block">
              <Button variant="primary" className="w-full mt-4">
                Get Consultation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
