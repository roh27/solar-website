import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Phone, MessageCircle, MapPin, Send, CheckCircle } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  whatsapp: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  pincode: z.string().trim().regex(/^6\d{5}$/, "Enter a valid Tamil Nadu pincode (starts with 6)"),
});

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    pincode: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          fieldErrors[error.path[0] as string] = error.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Request Submitted!",
      description: "Our team will contact you within 24 hours.",
    });

    // Open WhatsApp with pre-filled message
    const message = encodeURIComponent(
      `Hi SolarTN! I'm ${formData.name} from ${formData.pincode}. I'm interested in getting a solar installation quote.`
    );
    window.open(`https://wa.me/919876543210?text=${message}`, "_blank");
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Thank You!
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We've received your request. Our solar expert will call you within 24 hours
              to discuss your solar requirements.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setIsSubmitted(false);
                setFormData({ name: "", whatsapp: "", pincode: "" });
              }}
            >
              Submit Another Request
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="section-padding bg-secondary/30">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Info */}
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-4">
              Get in Touch
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Ready to Go Solar?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Fill in your details and our solar experts will get in touch within 24 hours
              with a customized quote for your home.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {[
                "Free site survey & consultation",
                "Customized system design",
                "Transparent pricing - no hidden costs",
                "Help with subsidy applications",
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="w-5 h-5 text-primary" />
                +91 98765 43210
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-primary" />
                WhatsApp Us
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                Chennai, Tamil Nadu
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-card rounded-3xl p-8 shadow-elevated border border-border">
            <h3 className="text-xl font-bold text-foreground mb-6">
              Request a Free Quote
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`h-12 ${errors.name ? 'border-destructive' : ''}`}
                />
                {errors.name && (
                  <p className="text-sm text-destructive mt-1">{errors.name}</p>
                )}
              </div>

              {/* WhatsApp */}
              <div>
                <label htmlFor="whatsapp" className="block text-sm font-medium text-foreground mb-2">
                  WhatsApp Number
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    +91
                  </span>
                  <Input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    placeholder="9876543210"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className={`h-12 pl-12 ${errors.whatsapp ? 'border-destructive' : ''}`}
                    maxLength={10}
                  />
                </div>
                {errors.whatsapp && (
                  <p className="text-sm text-destructive mt-1">{errors.whatsapp}</p>
                )}
              </div>

              {/* Pincode */}
              <div>
                <label htmlFor="pincode" className="block text-sm font-medium text-foreground mb-2">
                  Pincode
                </label>
                <Input
                  id="pincode"
                  name="pincode"
                  type="text"
                  placeholder="e.g., 600001"
                  value={formData.pincode}
                  onChange={handleChange}
                  className={`h-12 ${errors.pincode ? 'border-destructive' : ''}`}
                  maxLength={6}
                />
                {errors.pincode && (
                  <p className="text-sm text-destructive mt-1">{errors.pincode}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="solar"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Get Free Quote
                    <Send className="w-5 h-5" />
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                By submitting, you agree to receive communications from us via WhatsApp and phone.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
