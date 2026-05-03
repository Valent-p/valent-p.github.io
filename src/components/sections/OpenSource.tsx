"use client";

import { Github, Star, GitFork } from "lucide-react";
import openSourceData from "@/data/openSource.json";

interface OpenSourceProject {
  id: number;
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string;
  topics: string[];
  featured: boolean;
}

export default function OpenSource() {
  const featured = (openSourceData as OpenSourceProject[]).filter((p) => p.featured);
  const other = (openSourceData as OpenSourceProject[]).filter((p) => !p.featured);

  return (
    <section id="opensource" className="py-24 bg-slate-900/30">
      <div className="container mx-auto px-8">
        <h2 className="section-title mb-16">
          Open Source <span>Projects</span>
        </h2>

        {/* Featured */}
        {featured.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-slate-300">Featured</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featured.map((project) => (
                <a
                  key={project.id}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass p-8 flex flex-col group hover:-translate-y-2 hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <Github className="text-primary" size={28} />
                    <div className="flex gap-4 text-sm">
                      {project.stars > 0 && (
                        <div className="flex items-center gap-1 text-yellow-400">
                          <Star size={14} fill="currentColor" />
                          {project.stars}
                        </div>
                      )}
                      {project.forks > 0 && (
                        <div className="flex items-center gap-1 text-slate-400">
                          <GitFork size={14} />
                          {project.forks}
                        </div>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.name}</h3>
                  <p className="text-slate-400 text-sm mb-4 flex-grow">{project.description}</p>

                  <div className="flex gap-2 flex-wrap mb-4">
                    <span className="text-xs px-2 py-1 bg-slate-800 text-slate-300 rounded border border-white/5">
                      {project.language}
                    </span>
                  </div>

                  <div className="flex gap-2 flex-wrap pt-4 border-t border-white/5">
                    {project.topics.map((topic) => (
                      <span key={topic} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                        {topic}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Other */}
        {other.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold mb-8 text-slate-300">Other Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {other.map((project) => (
                <a
                  key={project.id}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass p-6 flex flex-col group hover:border-primary/50 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-bold group-hover:text-primary transition-colors">{project.name}</h4>
                    <div className="flex gap-2 text-sm">
                      {project.stars > 0 && (
                        <div className="flex items-center gap-1 text-yellow-400">
                          <Star size={12} fill="currentColor" />
                          {project.stars}
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm mb-4">{project.description}</p>

                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-1 bg-slate-800 text-slate-300 rounded border border-white/5">
                      {project.language}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
