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
    image:
      "https://github.com/Valent-p/suborbit/blob/main/docs/suborbit-overview.png?raw=true",
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
