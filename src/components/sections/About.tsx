export default function About() {
  const profile = {
    bio: `I'm a programmer and game developer from Malawi, fluent across the full stack—from kernel-level systems to dynamic web applications. My journey started with Python, but evolved into mastering compiler design, building game engines, and architecting elegant solutions to complex problems. Founder of Veigatec, currently shaping the future at NACIT. Whether it's designing custom programming languages, optimizing memory-critical systems, or deploying scalable APIs, I write code that performs at every layer.`,
    quote: "I command code, not armies.",
    skills: {
      languages: [
        "Python",
        "JavaScript",
        "Java",
        "C#",
        "C++",
        "C",
        "Rust",
        "Go",
        "PHP",
        "TypeScript",
        "SQL",
      ],
      web: [
        "Next.js",
        "FastAPI",
        "React",
        "Laravel",
        "Tailwind CSS",
        "Node.js",
        "Wordpress",
        "Joomla",
      ],
      games: ["Godot Engine", "Unity", "GameMaker Studio", "Pygame", "OpenGL"],
    },
  };

  return (
    <section id="about" className="py-24 bg-slate-900/30">
      <div className="container mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8">
            About <span className="text-primary italic">Me</span>
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed mb-6">
            {profile.bio}
          </p>
          <p className="text-xl font-display font-semibold text-primary italic">
            &quot;{profile.quote}&quot;
          </p>
        </div>

        <div className="glass p-10 space-y-8">
          <h3 className="text-2xl font-bold border-b border-white/5 pb-4">
            Technical Arsenal
          </h3>

          <div className="space-y-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-slate-500 mb-3 font-bold">
                Fluent Languages
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.skills.languages.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 bg-slate-800 text-sm rounded-md border border-white/5"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-widest text-slate-500 mb-3 font-bold">
                Web Ecosystem
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.skills.web.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 bg-slate-800 text-sm rounded-md border border-white/5"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-widest text-slate-500 mb-3 font-bold">
                Game Engines
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.skills.games.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 bg-slate-800 text-sm rounded-md border border-white/5"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
