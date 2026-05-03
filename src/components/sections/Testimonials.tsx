"use client";

import { Quote } from "lucide-react";
import testimonialsData from "@/data/testimonials.json";

interface Testimonial {
  id: number;
  author: string;
  role: string;
  company: string;
  testimonial: string;
  image: string | null;
  link: string | null;
  featured: boolean;
}

export default function Testimonials() {
  const featured = (testimonialsData as Testimonial[]).filter((t) => t.featured);
  const others = (testimonialsData as Testimonial[]).filter((t) => !t.featured);

  const displayTestimonials = featured.length > 0 ? featured : (testimonialsData as Testimonial[]);

  return (
    <section id="testimonials" className="py-24 container mx-auto px-8">
      <h2 className="section-title mb-16">
        What People <span>Say</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {displayTestimonials.map((testimonial) => (
          <div key={testimonial.id} className="glass p-8 flex flex-col">
            <Quote className="text-primary mb-4" size={32} />

            <p className="text-slate-300 mb-6 italic flex-grow">"{testimonial.testimonial}"</p>

            <div className="flex items-center gap-4 pt-6 border-t border-white/5">
              {testimonial.image && (
                <img src={testimonial.image} alt={testimonial.author} className="w-12 h-12 rounded-full object-cover" />
              )}

              <div>
                <a
                  href={testimonial.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-bold block ${testimonial.link ? "text-primary hover:underline" : "text-white"}`}
                >
                  {testimonial.author}
                </a>
                <p className="text-sm text-slate-400">
                  {testimonial.role} at {testimonial.company}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
