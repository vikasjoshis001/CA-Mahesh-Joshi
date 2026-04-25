"use client";

import { useState } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui";
import { testimonials } from "@/lib/data/testimonials";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/animations";

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-background">
      <Container>
        <FadeIn>
          <SectionHeading
            title="Client Testimonials"
            subtitle="What our clients say about our services"
            accent
          />
        </FadeIn>

        <div className="max-w-4xl mx-auto">
          <ScaleIn delay={0.3}>
            {/* Main Testimonial Card */}
            <div className="relative bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-8 md:p-12 text-white">
              {/* Quote Icon */}
              <div className="absolute top-8 right-8 opacity-20">
                <Quote className="h-16 w-16" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(currentTestimonial.rating || 5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                ))}
              </div>

              {/* Message */}
              <blockquote className="text-xl md:text-2xl font-medium mb-8 leading-relaxed relative z-10">
                "{currentTestimonial.message}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-lg">{currentTestimonial.name}</div>
                  <div className="text-white/80 text-sm">
                    {currentTestimonial.role}
                    {currentTestimonial.company && `, ${currentTestimonial.company}`}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex gap-2">
                  <button
                    onClick={prevTestimonial}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </ScaleIn>

          {/* Dots Indicator */}
          <FadeIn delay={0.5}>
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-primary"
                      : "w-2 bg-border hover:bg-primary/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </FadeIn>

          {/* All Testimonials Grid (Desktop) */}
          <StaggerContainer className="hidden lg:grid grid-cols-2 gap-6 mt-12" staggerDelay={0.1} initialDelay={0.6}>
            {testimonials.map((testimonial, index) => (
              <StaggerItem key={testimonial.id}>
                <div
                  className={`bg-card border border-border rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg ${
                    index === currentIndex ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setCurrentIndex(index)}
                >
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    "{testimonial.message}"
                  </p>
                  <div className="text-sm font-semibold text-card-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </Container>
    </section>
  );
}
