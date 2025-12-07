import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  systemSize: string;
  quote: string;
  savings: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Chennai",
    systemSize: "5 kW",
    quote: "My electricity bill dropped from ₹8,000 to just ₹500! Stryde Solar made the entire process seamless. Best decision for my home.",
    savings: "₹90,000/year",
  },
  {
    id: 2,
    name: "Priya Venkatesh",
    location: "Coimbatore",
    systemSize: "3 kW",
    quote: "The team was professional and completed installation in just 2 days. Now I'm generating my own clean energy!",
    savings: "₹54,000/year",
  },
  {
    id: 3,
    name: "Anand Rajan",
    location: "Madurai",
    systemSize: "8 kW",
    quote: "Running my entire household and even selling excess power back to the grid. ROI in just 4 years!",
    savings: "₹1,44,000/year",
  },
  {
    id: 4,
    name: "Lakshmi Narayanan",
    location: "Trichy",
    systemSize: "4 kW",
    quote: "From consultation to installation, everything was handled perfectly. Highly recommend SolarTN!",
    savings: "₹72,000/year",
  },
  {
    id: 5,
    name: "Suresh Babu",
    location: "Salem",
    systemSize: "6 kW",
    quote: "The after-sales service is excellent. Any queries are resolved within hours. True professionals!",
    savings: "₹1,08,000/year",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollTo = (index: number) => {
    if (index < 0) index = testimonials.length - 1;
    if (index >= testimonials.length) index = 0;
    setCurrentIndex(index);
  };

  return (
    <section id="testimonials" className="section-padding bg-secondary/30">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-4">
            Customer Stories
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Hear From Our Happy Customers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from Tamil Nadu homeowners who made the switch to solar
          </p>
        </div>

        {/* Testimonial Cards - Reel Style */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scrollTo(currentIndex - 1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-card shadow-elevated flex items-center justify-center hover:scale-110 transition-transform"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <button
            onClick={() => scrollTo(currentIndex + 1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-card shadow-elevated flex items-center justify-center hover:scale-110 transition-transform"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>

          {/* Cards Container */}
          <div
            ref={containerRef}
            className="flex gap-6 overflow-hidden px-4"
          >
            {testimonials.map((testimonial, index) => {
              const isActive = index === currentIndex;
              const isPrev = index === currentIndex - 1 || (currentIndex === 0 && index === testimonials.length - 1);
              const isNext = index === currentIndex + 1 || (currentIndex === testimonials.length - 1 && index === 0);
              
              let translateX = (index - currentIndex) * 100;
              let scale = isActive ? 1 : 0.85;
              let opacity = isActive ? 1 : isPrev || isNext ? 0.5 : 0;

              return (
                <div
                  key={testimonial.id}
                  className="flex-shrink-0 w-full md:w-[calc(33.333%-1rem)] transition-all duration-500"
                  style={{
                    transform: `translateX(${-currentIndex * 100}%) scale(${isActive ? 1 : 0.95})`,
                    opacity: isActive || isPrev || isNext ? 1 : 0.3,
                  }}
                >
                  <div className={`bg-card rounded-3xl p-8 h-full shadow-card border border-border/50 transition-all duration-300 ${isActive ? 'ring-2 ring-primary shadow-glow-sm' : ''}`}>
                    {/* Quote Icon */}
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                      <Quote className="w-6 h-6 text-primary" />
                    </div>

                    {/* Quote */}
                    <p className="text-lg text-foreground mb-6 leading-relaxed">
                      "{testimonial.quote}"
                    </p>

                    {/* Customer Info */}
                    <div className="flex items-center justify-between pt-6 border-t border-border">
                      <div>
                        <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.location} • {testimonial.systemSize}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Saving</p>
                        <p className="text-lg font-bold text-primary">{testimonial.savings}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-primary w-8' : 'bg-border hover:bg-muted-foreground'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
