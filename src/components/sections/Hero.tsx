"use client";

import Image from "next/image";
import { ArrowRight, Github } from "lucide-react";
import Typewriter from "../ui/Typewriter";
import ParticleCanvas from "../ui/ParticleCanvas";

export default function Hero() {
  const titles = [
    "Software Developer",
    "Game Programmer",
    "Founder of Veigatec",
    "Low-Level Enthusiast",
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden pt-20"
    >
      <ParticleCanvas />
      <div className="container mx-auto px-8 text-center">
        <div className="mb-12 relative w-40 h-40 mx-auto group">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary to-transparent rounded-full animate-spin-slow opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute inset-[3px] bg-slate-900 rounded-full"></div>
          <div className="absolute inset-[6px] overflow-hidden rounded-full">
            <Image
              src="/images/valentino-phiri-programmer.jpg"
              alt="Valentino Phiri"
              width={160}
              height={160}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              priority
            />
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter">
          Valentino <span className="text-primary italic">Phiri</span>
        </h1>

        <div className="text-2xl md:text-3xl text-slate-400 font-medium mb-12">
          <Typewriter texts={titles} />
        </div>

        <div className="flex flex-wrap gap-6 justify-center">
          <a href="#projects" className="btn btn-primary group">
            View Projects{" "}
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="https://github.com/Valent-p"
            target="_blank"
            className="btn btn-outline"
          >
            <Github size={20} /> GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
