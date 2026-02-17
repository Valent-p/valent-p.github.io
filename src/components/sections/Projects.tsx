import ProjectCard from "../ui/ProjectCard";

const projects = [
  {
    title: "Veigatec Dashboard",
    description:
      "A comprehensive cloud management platform for business automation and data visualization.",
    tags: ["React", "FastAPI", "PostgreSQL", "Cloud"],
    devlog: "https://veigatec.rf.gd",
    source: "https://github.com/Valent-p",
    image:
      "https://images.unsplash.com/photo-1551288049-bbbda536ad8a?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Stellar Drift",
    description:
      "A high-octane 2D space exploration and combat game built with a custom physics engine.",
    tags: ["Godot", "GDScript", "C#", "Game Dev"],
    devlog: "#",
    source: "https://github.com/Valent-p",
    image:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "System Guard CLI",
    description:
      "A low-level system monitoring tool designed for performance optimization and threat detection.",
    tags: ["C++", "Systems", "Linux", "Optimization"],
    devlog: "#",
    source: "#",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 container mx-auto px-8">
      <h2 className="section-title">
        Featured <span>Projects</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((p, i) => (
          <ProjectCard key={i} {...p} />
        ))}
      </div>
    </section>
  );
}
