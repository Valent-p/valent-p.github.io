import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Blog from "@/components/sections/Blog";
import Testimonials from "@/components/sections/Testimonials";
import OpenSource from "@/components/sections/OpenSource";
import Achievements from "@/components/sections/Achievements";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Blog />
      <Achievements />
      <Testimonials />
      <OpenSource />
      <Contact />
      <Footer />
    </main>
  );
}
