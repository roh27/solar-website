import { useState } from "react";
import { MapPin, Zap, Calendar } from "lucide-react";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";

interface Project {
  id: number;
  image: string;
  title: string;
  location: string;
  capacity: string;
  year: string;
  description: string;
}

const projects: Project[] = [
  {
    id: 1,
    image: portfolio1,
    title: "Villa Installation",
    location: "Chennai, Anna Nagar",
    capacity: "8 kW",
    year: "2024",
    description: "Premium monocrystalline panels with smart monitoring system",
  },
  {
    id: 2,
    image: portfolio2,
    title: "Apartment Complex",
    location: "Coimbatore, RS Puram",
    capacity: "15 kW",
    year: "2024",
    description: "Commercial-grade installation with battery backup",
  },
  {
    id: 3,
    image: portfolio3,
    title: "Residential Setup",
    location: "Madurai, KK Nagar",
    capacity: "5 kW",
    year: "2023",
    description: "Compact rooftop solution with net metering",
  },
];

const stats = [
  { value: "500+", label: "Projects Completed" },
  { value: "50 MW", label: "Total Capacity" },
  { value: "15+", label: "Districts Covered" },
  { value: "99%", label: "Customer Satisfaction" },
];

const PortfolioSection = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="portfolio" className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-4">
            Our Work
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Projects Across Tamil Nadu
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From Chennai to Kanyakumari, we've powered homes in every corner of the state
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-secondary/50 border border-border/50"
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-3xl overflow-hidden bg-card shadow-card border border-border/50 transition-all duration-500 hover:shadow-elevated hover:-translate-y-2"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                
                {/* Capacity Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  {project.capacity}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-primary" />
                    {project.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-primary" />
                    {project.year}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
