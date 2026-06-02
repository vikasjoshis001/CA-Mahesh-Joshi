"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, ChevronDown } from "lucide-react";
import { Button, Container } from "@/components/ui";
import { navigation, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll for sticky header with shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full bg-background border-b border-border transition-shadow duration-200",
          isScrolled && "shadow-md"
        )}
      >
        <Container>
          <div className="flex h-16 items-center justify-between">
            {/* Logo / Business Name */}
            <Link href="/" className="flex items-center space-x-3">
              {/* CA India Logo */}
              <Image
                src="/images/ca-india-logo.svg"
                alt="CA India Logo"
                width={40}
                height={30}
                className="h-8 w-auto md:h-10"
                priority
              />

              {/* Business Name */}
              <div className="flex flex-col">
                <span className="text-xl font-bold text-primary leading-tight">
                  {siteConfig.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  Chartered Accountant
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                const hasChildren = item.children && item.children.length > 0;
                const isChildActive = hasChildren && item.children?.some(child => pathname === child.href);

                if (hasChildren) {
                  return (
                    <div key={item.name} className="relative group">
                      <button
                        className={cn(
                          "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
                          isChildActive ? "text-primary" : "text-foreground/80"
                        )}
                      >
                        {item.name}
                        <ChevronDown className="h-3.5 w-3.5" />
                      </button>
                      <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        <div className="bg-background border border-border rounded-lg shadow-lg py-2 min-w-[200px]">
                          {item.children?.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className={cn(
                                "block px-4 py-2 text-sm transition-colors hover:bg-muted",
                                pathname === child.href
                                  ? "text-primary font-medium"
                                  : "text-foreground"
                              )}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      isActive
                        ? "text-primary"
                        : "text-foreground/80"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href={`tel:${siteConfig.links.phone[0]}`}
                className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                {siteConfig.links.phone[0]}
              </a>
              <Link href="/contact">
                <Button variant="primary" size="sm">
                  Get Consultation
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex flex-col items-center justify-center w-10 h-10 space-y-1.5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={cn(
                  "w-6 h-0.5 bg-foreground transition-all duration-200",
                  isMobileMenuOpen && "rotate-45 translate-y-2"
                )}
              />
              <span
                className={cn(
                  "w-6 h-0.5 bg-foreground transition-all duration-200",
                  isMobileMenuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "w-6 h-0.5 bg-foreground transition-all duration-200",
                  isMobileMenuOpen && "-rotate-45 -translate-y-2"
                )}
              />
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
