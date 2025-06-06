
import React, { useState, useEffect } from 'react';
import { GameStatus } from '../types';
import { TrophyIcon, SadFaceIcon, CurrencyCoinIcon } from './Icons'; // Added CurrencyCoinIcon
import Confetti from './Confetti'; 

interface GameOverModalProps {
  status: GameStatus.Won | GameStatus.Lost;
  onPlayAgain: () => void;
  onDismiss: () => void; 
  isVisible: boolean;
  coinsEarned: number; // Added
}

const GameOverModal: React.FC<GameOverModalProps> = ({ status, onPlayAgain, onDismiss, isVisible, coinsEarned }) => {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    if (!isVisible && isAnimatingOut) {
      setIsAnimatingOut(false);
    }
  }, [isVisible, isAnimatingOut]);

  if (!isVisible && !isAnimatingOut) return null;

  const isWin = status === GameStatus.Won;
  const title = isWin ? "You Won!" : "Game Over!";
  const Icon = isWin ? TrophyIcon : SadFaceIcon;
  const iconColor = isWin ? "text-yellow-400" : "text-rose-400";
  const playAgainButtonColor = isWin ? "bg-sky-600 hover:bg-sky-500" : "bg-slate-600 hover:bg-slate-500";
  const playAgainFocusColor = isWin ? "focus:ring-sky-400" : "focus:ring-slate-400";

  const animationClass = isAnimatingOut ? 'animate-modalHide' : 'animate-modalShow';

  const handleDismissClick = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      onDismiss(); 
    }, 180); 
  };
  
  const handlePlayAgainClick = () => {
    onPlayAgain();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" aria-modal="true" role="dialog">
      {isWin && <Confetti active={isVisible && !isAnimatingOut} />}
      <div className={`bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl text-center max-w-sm w-full relative ${animationClass}`}>
        <div className="flex justify-center mb-4 sm:mb-6">
          <Icon className={`${iconColor} w-12 h-12 sm:w-16 sm:h-16`} />
        </div>
        <h2 className={`text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 ${isWin ? 'text-sky-400' : 'text-rose-400'}`}>{title}</h2>
        <p className="text-slate-300 mb-2 text-sm sm:text-base">
          {isWin ? "Congratulations, you cleared the board!" : "Better luck next time!"}
        </p>
        {isWin && coinsEarned > 0 && (
           <p className="text-lg text-yellow-500 font-semibold mb-4 sm:mb-6 flex items-center justify-center">
              + {coinsEarned} <CurrencyCoinIcon className="w-5 h-5 ml-1.5 text-yellow-400" /> Coins Earned!
            </p>
        )}
         {isWin && coinsEarned === 0 && (
           <p className="text-sm text-slate-400 mb-4 sm:mb-6">
              (No coins earned for this win - rewards may vary)
            </p>
        )}
        <div className="space-y-3">
          <button
            onClick={handlePlayAgainClick}
            className={`w-full ${playAgainButtonColor} text-white font-semibold py-3 px-6 rounded-lg text-base sm:text-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-opacity-75 ${playAgainFocusColor}`}
          >
            Play Again
          </button>
          <button
            onClick={handleDismissClick}
            className="w-full bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold py-3 px-6 rounded-lg text-base sm:text-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-opacity-75 focus:ring-slate-500"
          >
            View Board
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;