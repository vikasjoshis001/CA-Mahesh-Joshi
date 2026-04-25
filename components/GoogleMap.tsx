"use client";

import { useState } from "react";

interface GoogleMapProps {
  embedUrl: string;
  title?: string;
}

export function GoogleMap({ embedUrl, title = "Office Location" }: GoogleMapProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-lg">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
        className="absolute inset-0 rounded-lg"
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
