"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { siteConfig } from "@/config/site";

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Show button after a delay (smoother UX)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Pre-filled WhatsApp message
  const defaultMessage = encodeURIComponent(
    "Hi! I am interested in your CA services. I would like to know more."
  );

  const whatsappUrl = `https://wa.me/${siteConfig.links.whatsapp}?text=${defaultMessage}`;

  if (!isVisible) return null;

  return (
    <>
      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Tooltip */}
        <div
          className={`
            transition-all duration-300 ease-out origin-bottom-right
            ${isHovered ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-95 translate-x-2 pointer-events-none'}
          `}
        >
          <div className="bg-white rounded-lg shadow-lg px-4 py-3 border border-border max-w-[200px]">
            <p className="text-sm font-medium text-foreground mb-1">
              Need Help?
            </p>
            <p className="text-xs text-muted-foreground">
              Chat with us on WhatsApp
            </p>
          </div>
          {/* Arrow */}
          <div className="absolute -bottom-1 right-6 w-3 h-3 bg-white border-r border-b border-border transform rotate-45"></div>
        </div>

        {/* Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="
            group relative
            w-14 h-14 rounded-full
            bg-accent hover:bg-accent/90
            shadow-lg hover:shadow-xl
            flex items-center justify-center
            transition-all duration-300
            hover:scale-110
            animate-in fade-in slide-in-from-bottom-4 duration-500
          "
          aria-label="Chat on WhatsApp"
        >
          {/* Ripple effect */}
          <div className="absolute inset-0 rounded-full bg-accent/50 animate-ping opacity-75"></div>

          {/* Icon */}
          <MessageCircle className="relative h-7 w-7 text-white transition-transform group-hover:scale-110" />

          {/* Notification badge */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full border-2 border-white animate-pulse"></div>
        </a>
      </div>
    </>
  );
}
