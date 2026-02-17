import ProjectCard from "../ui/ProjectCard";

const projects = [
  {
    title: "GitCard",
    description:
      "GitCard is a sleek, interactive web application that generates a beautiful, shareable card summarizing your GitHub profile. It's built with modern web technologies and features fluid animations to present your stats in an engaging way ;)",
    tags: ["React", "FastAPI", "PostgreSQL", "Cloud"],
    devlog: "https://veigatec.rf.gd/project/gitcard",
    source: "https://github.com/Valent-p/gitcard",
    image:
      "https://github.com/Valent-p/gitcard/blob/master/docs/gitcard-logo.png?raw=true",
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
  },
  /*
  {
    title: "System Guard CLI",
    description:
      "A low-level system monitoring tool designed for performance optimization and threat detection.",
    tags: ["C++", "Systems", "Linux", "Optimization"],
    devlog: "#",
    source: "#",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800",
  },*/
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
