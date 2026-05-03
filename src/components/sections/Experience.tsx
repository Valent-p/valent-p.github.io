"use client";

import { Briefcase, BookOpen } from "lucide-react";
import experienceData from "@/data/experience.json";

interface Experience {
  id: number;
  type: "experience" | "education";
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights: string[];
}

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-slate-900/30">
      <div className="container mx-auto px-8 max-w-4xl">
        <h2 className="section-title mb-16">
          Experience & <span>Education</span>
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-slate-800 transform md:-translate-x-1/2"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            {(experienceData as Experience[]).map((item, index) => (
              <div key={item.id} className={`relative ${index % 2 === 0 ? "md:pr-1/2 md:mr-1/2" : "md:ml-1/2 md:pl-1/2"}`}>
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 top-6 w-4 h-4 bg-primary rounded-full border-4 border-slate-900 z-10"></div>

                {/* Card */}
                <div className={`glass p-6 ml-6 md:ml-0 md:${index % 2 === 0 ? "mr-6" : "ml-6"}`}>
                  <div className="flex items-start gap-3 mb-2">
                    {item.type === "experience" ? (
                      <Briefcase className="text-primary flex-shrink-0 mt-1" size={20} />
                    ) : (
                      <BookOpen className="text-primary flex-shrink-0 mt-1" size={20} />
                    )}
                    <div>
                      <h3 className="text-xl font-bold">{item.role}</h3>
                      <p className="text-primary font-semibold">{item.company}</p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-400 mb-3">
                    {item.startDate} - {item.endDate}
                  </p>

                  <p className="text-slate-400 mb-4">{item.description}</p>

                  <ul className="space-y-2">
                    {item.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="text-primary mt-1">▸</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
