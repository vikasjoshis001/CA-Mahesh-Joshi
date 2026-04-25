import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      className,
      size = "xl",
      children,
      ...props
    },
    ref
  ) => {
    const sizes = {
      sm: "max-w-3xl",   // 768px
      md: "max-w-5xl",   // 1024px
      lg: "max-w-6xl",   // 1152px
      xl: "max-w-7xl",   // 1280px
      full: "max-w-full",
    };

    return (
      <div
        className={cn(
          "mx-auto w-full px-4 sm:px-6 lg:px-8",
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

export { Container };
