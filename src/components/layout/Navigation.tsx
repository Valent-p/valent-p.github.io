"use client";

import { useState, useEffect } from "react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl z-50 transition-all duration-300 ${isScrolled ? "py-3" : "py-5"}`}
    >
      <div className="glass px-8 py-4 flex justify-between items-center bg-slate-900/40 backdrop-blur-md border border-white/10 shadow-2xl">
        <div className="text-xl font-extrabold font-display">
          VP<span className="text-primary">.</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-semibold tracking-wide">
          <a href="#home" className="hover:text-primary transition-colors">
            Home
          </a>
          <a href="#projects" className="hover:text-primary transition-colors">
            Projects
          </a>
          <a href="#about" className="hover:text-primary transition-colors">
            About
          </a>
          <a href="#contact" className="hover:text-primary transition-colors">
            Contact
          </a>
        </div>
        <a
          href="https://veigatec.rf.gd"
          target="_blank"
          className="btn btn-primary px-4 py-2 text-xs"
        >
          Visit Veigatec
        </a>
      </div>
    </nav>
  );
}
