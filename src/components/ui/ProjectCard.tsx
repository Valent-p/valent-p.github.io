"use client";

import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

export default function ProjectCard({
  title,
  description,
  tags,
  link,
}: ProjectCardProps) {
  return (
    <div className="glass p-8 flex flex-col gap-4 group transition-all duration-300 hover:-translate-y-2 hover:border-primary/50">
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-slate-400 flex-grow">{description}</p>
      <div className="flex gap-2 flex-wrap">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20"
          >
            {tag}
          </span>
        ))}
      </div>
      <a
        href={link}
        className="mt-4 font-bold flex items-center gap-1 text-primary hover:gap-2 transition-all"
        target="_blank"
        rel="noopener noreferrer"
      >
        View Details <ExternalLink size={16} />
      </a>
    </div>
  );
}
