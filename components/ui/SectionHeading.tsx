import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  accent?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  accent = false,
  className,
  ...props
}: SectionHeadingProps) {
  const alignments = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div
      className={cn("mb-12", alignments[align], className)}
      {...props}
    >
      {accent && (
        <div
          className={cn(
            "w-16 h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full mb-4",
            align === "center" && "mx-auto",
            align === "right" && "ml-auto"
          )}
        />
      )}

      <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
        {title}
      </h2>

      {subtitle && (
        <p className={cn("text-lg text-muted-foreground max-w-2xl", align === "center" && "mx-auto", align === "right" && "ml-auto")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
