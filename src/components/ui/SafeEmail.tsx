"use client";

import { useState, useEffect } from "react";

export default function SafeEmail() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Reconstruct email address on the client side to evade simple bots
    const user = "valent.phiri";
    const domain = "gmail.com";

    const timeout = setTimeout(() => {
      setEmail(`${user}@${domain}`);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  if (!email) {
    return <div className="animate-pulse h-6 w-48 bg-slate-800 rounded"></div>;
  }

  return (
    <a
      href={`mailto:${email}`}
      className="text-primary font-semibold hover:underline flex items-center gap-2"
    >
      {email}
    </a>
  );
}
