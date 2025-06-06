import React from 'react';
import { AppView } from '../types';
import { MineIcon, FlagIcon } from './Icons'; // Assuming icons are available and relevant

interface AboutScreenProps {
  onNavigate: (view: AppView) => void;
}

const AboutScreen: React.FC<AboutScreenProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 sm:p-6 font-sans text-slate-100 selection:bg-sky-500 selection:text-white">
      <header className="mb-6 sm:mb-8 text-center">
        <div className="flex items-center justify-center space-x-3 mb-2">
            <FlagIcon className="w-8 h-8 text-amber-400" />
            <h1 className="text-4xl sm:text-5xl font-bold text-sky-400 tracking-tight">About Vibrant Minesweeper</h1>
            <MineIcon className="w-8 h-8 text-rose-500" />
        </div>
      </header>

      <main className="bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-2xl space-y-6">
        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold text-sky-300 mb-3">The Game</h2>
          <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
            Vibrant Minesweeper is a modern take on the classic puzzle game. Our goal was to create a visually appealing,
            smooth, and enjoyable Minesweeper experience that respects the core mechanics loved by millions, while
            enhancing it with a fresh interface, responsive design, and subtle auditory feedback.
          </p>
          <p className="text-slate-300 leading-relaxed mt-3 text-sm sm:text-base">
            Uncover all the cells that don't contain mines, and flag the ones that do! Use the numbers as clues to deduce
            the locations of hidden mines. Challenge yourself with various difficulty levels and aim for the best times.
          </p>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold text-sky-300 mb-3">Veigatec Games</h2>
          <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
            Veigatec Games is a passionate endeavor focused on creating engaging and well-crafted gaming experiences.
            We believe in the power of simple, elegant design combined with solid gameplay. Vibrant Minesweeper is
            one of our projects aimed at bringing classic fun to modern platforms.
          </p>
          <p className="text-slate-300 leading-relaxed mt-3 text-sm sm:text-base">
            Thank you for playing! We hope you enjoy your time with Vibrant Minesweeper.
          </p>
        </section>
        
        <div className="pt-6 border-t border-slate-700">
          <button
            onClick={() => onNavigate(AppView.Menu)}
            className="w-full bg-sky-600 hover:bg-sky-500 text-white font-semibold py-3 px-6 rounded-lg text-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75"
          >
            Back to Menu
          </button>
        </div>
      </main>

      <footer className="mt-8 text-center text-slate-500 text-xs">
        &copy; {new Date().getFullYear()} Veigatec Games.
      </footer>
    </div>
  );
};

export default AboutScreen;