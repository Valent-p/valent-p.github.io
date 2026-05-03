"use client";

import achievementsData from "@/data/achievements.json";

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  date: string;
  category: "milestone" | "skill" | "community";
}

export default function Achievements() {
  const achievements = achievementsData as Achievement[];

  const grouped = achievements.reduce(
    (acc, achievement) => {
      if (!acc[achievement.category]) {
        acc[achievement.category] = [];
      }
      acc[achievement.category].push(achievement);
      return acc;
    },
    {} as Record<string, Achievement[]>
  );

  const categoryLabels: Record<string, string> = {
    milestone: "Milestones",
    skill: "Skills & Expertise",
    community: "Community",
  };

  return (
    <section id="achievements" className="py-24 bg-slate-900/30">
      <div className="container mx-auto px-8">
        <h2 className="section-title mb-16">
          Achievements & <span>Badges</span>
        </h2>

        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-slate-300">{categoryLabels[category]}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((achievement) => (
                <div key={achievement.id} className="glass p-8 text-center hover:border-primary/50 transition-all">
                  <div className="text-6xl mb-4">{achievement.icon}</div>
                  <h4 className="text-xl font-bold mb-2">{achievement.title}</h4>
                  <p className="text-slate-400 text-sm mb-4">{achievement.description}</p>
                  <p className="text-xs text-slate-500">
                    {new Date(achievement.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
