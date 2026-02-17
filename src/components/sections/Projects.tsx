import ProjectCard from "../ui/ProjectCard";

const projects = [
  {
    title: "Veigatec Dashboard",
    description:
      "A comprehensive cloud management platform for business automation and data visualization.",
    tags: ["React", "FastAPI", "PostgreSQL", "Cloud"],
    link: "https://veigatec.rf.gd",
  },
  {
    title: "Stellar Drift",
    description:
      "A high-octane 2D space exploration and combat game built with a custom physics engine.",
    tags: ["Godot", "GDScript", "C#", "Game Dev"],
    link: "#",
  },
  {
    title: "System Guard CLI",
    description:
      "A low-level system monitoring tool designed for performance optimization and threat detection.",
    tags: ["C++", "Systems", "Linux", "Optimization"],
    link: "#",
  },
  {
    title: "E-Commerce API",
    description:
      "Scalable backend architecture supporting high-concurrency transactions and inventory management.",
    tags: ["Go", "Redis", "Docker", "Microservices"],
    link: "#",
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
