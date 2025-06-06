
import React, { useEffect, useState, useMemo } from 'react';

interface ConfettiParticle {
  id: string; // Use string for more robust unique IDs
  style: React.CSSProperties;
  animationDuration: string;
  animationDelay: string;
}

const Confetti: React.FC<{ active: boolean; count?: number }> = ({ active, count = 60 }) => {
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);

  // Memoize the keyframes string to prevent re-declaration on every render unless count changes (which it doesn't here)
  const keyframesStyle = useMemo(() => `
    @keyframes fall-rotate {
      0% {
        transform: translateY(0vh) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translateY(110vh) rotate(720deg);
        opacity: 0;
      }
    }
  `, []);


  useEffect(() => {
    if (active) {
      const newParticles = Array.from({ length: count }).map((_, i) => {
        const duration = Math.random() * 2 + 2.5; // 2.5s to 4.5s
        const delay = Math.random() * 1.5;     // Stagger start times up to 1.5s
        const size = Math.random() * 8 + 6;   // Size from 6px to 14px
        return {
          id: `particle-${i}-${Date.now()}-${Math.random()}`, // Unique key
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          style: {
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * -15 - 5}%`, // Start above viewport, more spread
            width: `${size}px`,
            height: `${size * (Math.random() * 0.5 + 0.75)}px`, // rectangularish
            backgroundColor: `hsl(${Math.random() * 360}, 90%, 65%)`,
            transform: `rotate(${Math.random() * 360}deg)`,
            opacity: 0, // Will be set to 1 by animation start
            animationName: 'fall-rotate',
            animationTimingFunction: 'linear', // Use 'ease-out' for more natural fall end
            animationIterationCount: '1',
            animationFillMode: 'forwards', // Keep final state (opacity 0)
          } as React.CSSProperties,
        };
      });
      setParticles(newParticles);
    } else if (!active && particles.length > 0) {
      // If active becomes false, and there are particles,
      // we let them finish their animation.
      // To clear them after animation, one might use onAnimationEnd,
      // or simply let them be removed if active becomes true again (new set).
      // For now, they just complete and stay hidden.
      // If we want them to be removed from DOM after animation:
      // setTimeout(() => setParticles([]), MAX_ANIMATION_DURATION_MS);
    }
  }, [active, count, particles.length]); // particles.length to avoid re-triggering if active is false

  // Only render if there are particles to show (they might be animating out)
  if (particles.length === 0 && !active) return null;

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden', zIndex: 10 }}>
      <style>{keyframesStyle}</style>
      {particles.map(p => (
        <div key={p.id} style={{
            ...p.style,
            animationDuration: p.animationDuration,
            animationDelay: p.animationDelay,
        }}></div>
      ))}
    </div>
  );
};

export default React.memo(Confetti); // Memoize if props don't change often
