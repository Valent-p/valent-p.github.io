"use client";

import { useState } from "react";
import ProjectCard from "../ui/ProjectCard";
import projectStats from "@/data/projectStats.json";

const projects = [
  {
    title: "WASM Convertify",
    description:
      "A privacy-first, universal file converter powered by WebAssembly. Process documents, images, videos, and audio directly in your browser with zero server uploads. Built with React, TypeScript, and FFmpeg.wasm for high-performance, offline-capable conversions.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Zustand", "FFmpeg.wasm", "WebAssembly"],
    tryit: "https://wasm-convertify.vercel.app",
    image: "/images/wasm-convertify.png",
    featured: true,
  },
  {
    title: "Love-as-a-Service (LaaS)",
    description:
      "A high-performance REST API for affirmations. Launched as a counter-culture project to 'no-as-a-service', it went viral on LinkedIn with 13,000+ impressions in its first week. Built with Next.js Edge Runtime for global scalability and DDoS resilience.",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "Edge Runtime", "API"],
    devlog:
      "https://www.linkedin.com/posts/valentino-phiri-74263237b_nextjs-vercel-webdevelopment-share-7441276665172750336-kopq?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF3jPKIBXhL9i5pYIWTxED230Q9L7tCOgz0",
    source: "https://github.com/Valent-p/love-as-a-service",
    tryit: "https://love-as-a-service.vercel.app/",
    image: "/images/laas-v1.0-screenshot.png",
    featured: true,
  },
  {
    title: "GitCard",
    description:
      "GitCard is a sleek, interactive web application that generates a beautiful, shareable card summarizing your GitHub profile. It's built with modern web technologies and features fluid animations to present your stats in an engaging way ;)",
    tags: ["React", "FastAPI", "PostgreSQL", "Cloud"],
    devlog: "https://veigatec.rf.gd/project/gitcard",
    source: "https://github.com/Valent-p/gitcard",
    tryit: "https://gitcard-valentp.vercel.app/",
    image: "/images/gitcard-logo.png",
    featured: true,
  },
  {
    title: "Simple Snake Game",
    description:
      "This project is a classic Snake game built from scratch using only HTML, CSS, and vanilla JavaScript. It is designed for educational purposes to help beginners understand the fundamental concepts of 2D game development in a web browser.",
    tags: ["Game Dev", "Javascript", "HTML", "CSS"],
    devlog: "#",
    source: "https://github.com/Valent-p/ClassicSnakeTutorial",
    image:
      "https://github.com/Valent-p/ClassicSnakeTutorial/blob/main/screenshots/start.jpg?raw=true",
    featured: false,
  },
  {
    title: "SubOrbit",
    description:
      "A simple and powerful subscription management system. You can use it to track your expenses like on Netflix, Spotify, etc. It is built with modern web technologies and features fluid animations to present your stats in an engaging way ;)",
    tags: [
      "Next.js",
      "Zod",
      "Zustand",
      "Tailwind CSS",
      "Lucide React",
      "React Hook Form",
      "Recharts",
    ],
    devlog: "#",
    //source: "https://github.com/Valent-p/suborbit",
    tryit: "https://suborbit.vercel.app/",
    image: "/images/suborbit-overview.png",
    featured: false,
  },
];

export default function Projects() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  // Get all unique technologies
  const allTechs = Array.from(new Set(projects.flatMap((p) => p.tags))).sort();

  // Filter projects
  const filteredProjects = selectedTech
    ? projects.filter((p) => p.tags.includes(selectedTech))
    : projects;

  return (
    <section id="projects" className="py-24 container mx-auto px-8">
      <h2 className="section-title mb-12">
        Featured <span>Projects</span>
      </h2>

      {/* Filter by Technology */}
      <div className="mb-12">
        <button
          onClick={() => setSelectedTech(null)}
          className={`px-4 py-2 rounded-lg font-semibold transition-all mr-2 mb-2 ${
            selectedTech === null
              ? "bg-primary text-slate-900"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          All
        </button>
        {allTechs.map((tech) => (
          <button
            key={tech}
            onClick={() => setSelectedTech(tech)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all mr-2 mb-2 ${
              selectedTech === tech
                ? "bg-primary text-slate-900"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            {tech}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((p, i) => {
          const stats = projectStats[p.title as keyof typeof projectStats];
          return (
            <ProjectCard 
              key={i} 
              {...p} 
              stats={stats}
            />
          );
        })}
      </div>
    </section>
  );
}
