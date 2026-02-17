import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-16 border-t border-white/5 text-center">
      <div className="container mx-auto px-8">
        <div className="text-2xl font-extrabold font-display mb-8">
          VP<span className="text-primary">.</span>
        </div>
        <div className="flex justify-center gap-8 mb-8">
          <a
            href="https://github.com/Valent-p"
            target="_blank"
            className="text-slate-400 hover:text-primary transition-colors"
          >
            <Github size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/valentino-phiri-74263237b/"
            target="_blank"
            className="text-slate-400 hover:text-primary transition-colors"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="mailto:contact@veigatec.rf.gd"
            className="text-slate-400 hover:text-primary transition-colors"
          >
            <Mail size={24} />
          </a>
        </div>
        <p className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Valentino Phiri. Built with passion
          in Malawi 🇲🇼
        </p>
      </div>
    </footer>
  );
}
