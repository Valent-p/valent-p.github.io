"use client";

import { Mail, MessageSquare, Send } from "lucide-react";
import SafeEmail from "../ui/SafeEmail";

export default function Contact() {
  return (
    <section id="contact" className="py-24 container mx-auto px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="section-title">
          Get In <span>Touch</span>
        </h2>
        <p className="text-slate-400 text-lg mb-12">
          I'm always open to discussing new projects, creative ideas or
          opportunities to be part of your visions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="glass p-8 flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg text-primary">
              <Mail size={24} />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-1">Email Me</h4>
              <p className="text-slate-400 mb-4">
                Direct safe communication link for inquiries.
              </p>
              <SafeEmail />
            </div>
          </div>

          <div className="glass p-8 flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg text-primary">
              <MessageSquare size={24} />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-1">Let's Connect</h4>
              <p className="text-slate-400 mb-4">
                Find me on professional networks.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/valentino-phiri-74263237b/"
                  target="_blank"
                  className="text-primary font-semibold hover:underline"
                >
                  LinkedIn
                </a>
                <span className="text-slate-700">|</span>
                <a
                  href="https://github.com/Valent-p"
                  target="_blank"
                  className="text-primary font-semibold hover:underline"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          {/* Note: In a real environment, this might also use the safe email hook if it was a button action */}
          <a
            href="mailto:valent.phiri@gmail.com"
            className="btn btn-primary px-12 py-4 text-lg"
          >
            Say Hello <Send size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
