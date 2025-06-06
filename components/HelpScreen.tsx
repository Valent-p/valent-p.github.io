import React from 'react';
import { AppView } from '../types';
import { MineIcon, FlagIcon, ClockIcon } from './Icons';

interface HelpScreenProps {
  onNavigate: (view: AppView) => void;
}

const HelpScreen: React.FC<HelpScreenProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 sm:p-6 font-sans text-slate-100 selection:bg-sky-500 selection:text-white">
      <header className="mb-6 sm:mb-8 text-center">
         <h1 className="text-4xl sm:text-5xl font-bold text-sky-400 tracking-tight">How to Play</h1>
      </header>

      <main className="bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-2xl space-y-6">
        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold text-sky-300 mb-3 flex items-center">
            <MineIcon className="w-7 h-7 mr-2 text-rose-500" /> Objective
          </h2>
          <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
            The goal of Minesweeper is to uncover all the cells on the board that do not contain mines without detonating any of them.
            If you click on a cell containing a mine, you lose. If you uncover all safe cells, you win!
          </p>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold text-sky-300 mb-3">Game Elements</h2>
          <ul className="list-disc list-inside text-slate-300 space-y-2 pl-1 text-sm sm:text-base">
            <li><strong>Hidden Cells:</strong> These are the cells you need to interact with. They can be empty, contain a number, or hide a mine.</li>
            <li><strong>Numbers:</strong> When you reveal a cell that isn't a mine, it might display a number. This number indicates how many mines are directly adjacent (horizontally, vertically, or diagonally) to that cell.</li>
            <li><strong>Mines <MineIcon className="inline-block w-4 h-4 text-rose-500" />:</strong> Hidden dangers! Clicking on a mine ends the game.</li>
            <li><strong>Flags <FlagIcon className="inline-block w-4 h-4 text-amber-400" />:</strong> You can place flags on cells you suspect contain mines. This helps you keep track and avoid accidentally clicking them.</li>
            <li><strong>Timer <ClockIcon className="inline-block w-4 h-4 text-sky-400" />:</strong> Tracks how long your current game has been active.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold text-sky-300 mb-3">Controls</h2>
          <div className="space-y-4 text-sm sm:text-base">
            <div>
              <h3 className="text-xl font-medium text-slate-200 mb-1">Desktop (Mouse):</h3>
              <ul className="list-disc list-inside text-slate-300 space-y-1 pl-4">
                <li><strong>Left Click:</strong> Reveal a cell.</li>
                <li><strong>Right Click:</strong> Toggle a flag on a hidden cell.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-medium text-slate-200 mb-1">Mobile / Touchscreen:</h3>
              <ul className="list-disc list-inside text-slate-300 space-y-1 pl-4">
                <li><strong>Tap:</strong> Reveal a cell.</li>
                <li><strong>Long Press (Tap and Hold):</strong> Toggle a flag on a hidden cell.</li>
              </ul>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold text-sky-300 mb-3">Tips for Success</h2>
          <ul className="list-disc list-inside text-slate-300 space-y-2 pl-1 text-sm sm:text-base">
            <li>Start by clicking a few random cells. If you hit an empty area (no adjacent mines), many cells might be revealed at once, giving you a good starting point.</li>
            <li>Use the numbers wisely. If a cell shows '1' and there's only one unrevealed adjacent cell, that cell MUST be a mine. Flag it!</li>
            <li>Conversely, if a cell shows '1' and an adjacent cell is already flagged as a mine, other adjacent unrevealed cells are safe to click.</li>
            <li>Sometimes you'll have to make educated guesses, especially on harder levels. Good luck!</li>
          </ul>
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
        Happy Sweeping!
      </footer>
    </div>
  );
};

export default HelpScreen;