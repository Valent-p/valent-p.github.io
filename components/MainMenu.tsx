
import React, { useState, useEffect } from 'react';
import { AppView, DifficultyOption } from '../types';
import { DIFFICULTIES } from '../constants';
import { storageService } from '../services/storageService'; // For high scores
import { FlagIcon, MineIcon, ClockIcon, TrophyIcon, ChartBarIcon, StarIcon } from './Icons'; // Added ChartBarIcon, StarIcon

// Assuming ChartBarIcon and StarIcon are defined in Icons.tsx or here for simplicity
const ChartBarIconLocal: React.FC<{ className?: string }> = ({ className }) => ( // Placeholder
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${className}`}>
    <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h1.5c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.035-.84-1.875-1.875-1.875h-1.5ZM12.75 8.625c-1.035 0-1.875.84-1.875 1.875v9.375c0 1.035.84 1.875 1.875 1.875h1.5c1.035 0 1.875-.84 1.875-1.875V10.5c0-1.035-.84-1.875-1.875-1.875h-1.5ZM7.125 15c-1.035 0-1.875.84-1.875 1.875V19.5c0 1.035.84 1.875 1.875 1.875h1.5c1.035 0 1.875-.84 1.875-1.875v-2.625c0-1.035-.84-1.875-1.875-1.875h-1.5Z" />
  </svg>
);

const StarIconLocal: React.FC<{ className?: string }> = ({ className }) => ( // Placeholder
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${className}`}>
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354l-4.543 2.833c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
  </svg>
);


interface MainMenuProps {
  onNavigate: (view: AppView, difficulty?: DifficultyOption, resume?: boolean) => void;
  hasResumableGame: boolean;
}

const MainMenu: React.FC<MainMenuProps> = ({ onNavigate, hasResumableGame }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyOption>(DIFFICULTIES[0]);
  const [highScores, setHighScores] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    setHighScores(storageService.getHighScores());
  }, [hasResumableGame]); // Re-check high scores if resumable game status changes (e.g. after a game)

  const handleStartNewGame = () => {
    onNavigate(AppView.Game, selectedDifficulty, false);
  };

  const handleResumeGame = () => {
    onNavigate(AppView.Game, undefined, true);
  };
  
  const handleHelp = () => onNavigate(AppView.Help);
  const handleAbout = () => onNavigate(AppView.About);
  const handleStatistics = () => onNavigate(AppView.Statistics);
  const handleAchievements = () => onNavigate(AppView.Achievements);


  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 font-sans text-slate-100 selection:bg-sky-500 selection:text-white">
      <header className="mb-8 sm:mb-12 text-center">
        <div className="flex items-center justify-center space-x-3 mb-2">
          <FlagIcon className="w-10 h-10 text-amber-400" />
          <h1 className="text-5xl sm:text-6xl font-bold text-sky-400 tracking-tight">Vibrant Minesweeper</h1>
          <MineIcon className="w-10 h-10 text-rose-500" />
        </div>
        <p className="text-slate-400 text-sm sm:text-base">A Modern Classic Reimagined</p>
      </header>

      <main className="bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md space-y-5">
        {hasResumableGame && (
          <button
            onClick={handleResumeGame}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 sm:py-4 px-6 rounded-lg text-lg sm:text-xl transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75 shadow-lg"
          >
            Resume Game
          </button>
        )}

        <div className="space-y-3">
          <label htmlFor="difficulty-select" className="block text-sm font-medium text-slate-300">
            {hasResumableGame ? 'Or Start New Game:' : 'Select Difficulty:'}
          </label>
          <select
            id="difficulty-select"
            value={selectedDifficulty.name}
            onChange={(e) => {
              const diff = DIFFICULTIES.find(d => d.name === e.target.value);
              if (diff) setSelectedDifficulty(diff);
            }}
            className="w-full bg-slate-700 border border-slate-600 text-slate-100 text-base sm:text-lg rounded-lg focus:ring-sky-500 focus:border-sky-500 p-3 sm:p-3.5"
          >
            {DIFFICULTIES.map(diff => (
              <option key={diff.name} value={diff.name}>{diff.name}</option>
            ))}
          </select>
          <button
            onClick={handleStartNewGame}
            className="w-full bg-sky-600 hover:bg-sky-500 text-white font-semibold py-3 sm:py-4 px-6 rounded-lg text-lg sm:text-xl transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75 shadow-lg"
          >
            Start New Game
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-700">
           <button
            onClick={handleStatistics}
            className="flex items-center justify-center space-x-2 bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium py-2.5 sm:py-3 px-4 rounded-lg text-base sm:text-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            <ChartBarIconLocal className="w-5 h-5" /> <span>Statistics</span>
          </button>
           <button
            onClick={handleAchievements}
            className="flex items-center justify-center space-x-2 bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium py-2.5 sm:py-3 px-4 rounded-lg text-base sm:text-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
             <StarIconLocal className="w-5 h-5" /> <span>Achievements</span>
          </button>
           <button
            onClick={handleHelp}
            className="bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium py-2.5 sm:py-3 px-4 rounded-lg text-base sm:text-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            Help
          </button>
           <button
            onClick={handleAbout}
            className="bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium py-2.5 sm:py-3 px-4 rounded-lg text-base sm:text-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            About
          </button>
        </div>
      </main>
      
      {Object.keys(highScores).length > 0 && (
        <section className="mt-8 sm:mt-10 w-full max-w-md bg-slate-800 p-5 rounded-xl shadow-xl">
          <h2 className="text-xl sm:text-2xl font-semibold text-sky-400 mb-4 text-center flex items-center justify-center">
            <TrophyIcon className="w-7 h-7 mr-2 text-yellow-400" /> Best Times
          </h2>
          <ul className="space-y-2">
            {DIFFICULTIES.map(diff => highScores[diff.name] ? (
              <li key={diff.name} className="flex justify-between items-center text-slate-300 p-2.5 bg-slate-700 rounded-md text-sm sm:text-base">
                <span className="font-medium">{diff.name}:</span>
                <div className="flex items-center">
                  <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 text-sky-400" />
                  <span className="font-mono">{String(highScores[diff.name]).padStart(3, '0')}s</span>
                </div>
              </li>
            ) : null)}
          </ul>
        </section>
      )}

      <footer className="mt-8 sm:mt-10 text-center text-slate-500 text-xs">
        &copy; {new Date().getFullYear()} Veigatec Games. Minesweeper Enhanced.
      </footer>
    </div>
  );
};

export default MainMenu;
