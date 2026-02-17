"use client";

import { Github, Code2, BookOpen } from "lucide-react";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  devlog?: string;
  source?: string;
  image?: string;
}

export default function ProjectCard({
  title,
  description,
  tags,
  devlog,
  source,
  image,
}: ProjectCardProps) {
  return (
    <div className="glass overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-2 hover:border-primary/50">
      {/* Project Image / Placeholder */}
      <div className="relative h-48 w-full bg-slate-800 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            unoptimized={image.startsWith("http")}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-primary/10 flex items-center justify-center opacity-50">
            <Code2 size={48} className="text-primary/20" />
          </div>
        )}
      </div>

      <div className="p-8 flex flex-col gap-4 flex-grow">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-slate-400 text-sm line-clamp-3 mb-2">
          {description}
        </p>

        <div className="flex gap-2 flex-wrap mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full border border-primary/20 font-bold uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-4 pt-4 border-t border-white/5">
          {devlog && (
            <a
              href={devlog}
              className="flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BookOpen size={16} /> Devlog
            </a>
          )}
          {source && (
            <a
              href={source}
              className="flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={16} /> Source
            </a>
          )}
          {!devlog && !source && (
            <span className="text-xs text-slate-500 italic">
              Links coming soon
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
