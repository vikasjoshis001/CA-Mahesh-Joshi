"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, CheckCircle } from "lucide-react";
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui";
import { SERVICE_OPTIONS } from "@/config/constants";

// Zod validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number is too long"),
  service: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message is too long"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      // Call the API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // Show success message
        setIsSuccess(true);
        reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      } else {
        // Handle error
        console.error('Form submission error:', result.error);
        alert('Failed to send message. Please try again or contact us directly.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Failed to send message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card variant="bordered" className="bg-gradient-to-br from-accent/10 to-accent/5">
        <CardContent className="py-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-accent rounded-full mx-auto mb-4 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Thank You!
            </h3>
            <p className="text-muted-foreground mb-6">
              Your message has been received. We'll get back to you within 24 hours.
            </p>
            <Button
              variant="outline"
              onClick={() => setIsSuccess(false)}
            >
              Send Another Message
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="bordered">
      <CardHeader>
        <CardTitle>Send Us a Message</CardTitle>
        <CardDescription>
          Fill out the form below and we'll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <Input
            label="Full Name"
            placeholder="Enter your name"
            error={errors.name?.message}
            {...register("name")}
            required
          />

          {/* Email */}
          <Input
            label="Email Address"
            type="email"
            placeholder="your@email.com"
            error={errors.email?.message}
            {...register("email")}
            required
          />

          {/* Phone */}
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+91 XXXXXXXXXX"
            error={errors.phone?.message}
            {...register("phone")}
            required
          />

          {/* Service */}
          <div className="w-full">
            <label
              htmlFor="service"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Service Required
            </label>
            <select
              id="service"
              className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              {...register("service")}
            >
              <option value="">Select a service (optional)</option>
              {SERVICE_OPTIONS.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div className="w-full">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Message
              <span className="text-error ml-1">*</span>
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Tell us about your requirements..."
              className="flex w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              {...register("message")}
            />
            {errors.message && (
              <p className="mt-1.5 text-sm text-error">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={isSubmitting}
          >
            {isSubmitting ? "Sending..." : (
              <>
                <Send className="h-5 w-5" />
                Send Message
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By submitting this form, you agree to our privacy policy.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
