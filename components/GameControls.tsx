
import React from 'react';
import { DifficultyOption, GameStatus, PowerUpID, PlayerPowerUpsState } from '../types';
import { DIFFICULTIES } from '../constants';
import { ClockIcon, FlagIcon, RefreshIcon, CurrencyCoinIcon } from './Icons'; 
import PowerUpControls from './PowerUpControls';

const PauseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${className}`}>
    <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 00-.75.75V18a.75.75 0 00.75.75h1.5a.75.75 0 00.75-.75V6a.75.75 0 00-.75-.75h-1.5zm7.5 0a.75.75 0 00-.75.75V18a.75.75 0 00.75.75h1.5a.75.75 0 00.75-.75V6a.75.75 0 00-.75-.75h-1.5z" clipRule="evenodd" />
  </svg>
);

const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${className}`}>
    <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
  </svg>
);


interface GameControlsProps {
  selectedDifficulty: DifficultyOption;
  onDifficultyChangeAndReset: (difficulty: DifficultyOption) => void;
  minesLeft: number;
  timer: number;
  onReset: () => void;
  gameStatus: GameStatus;
  onGoToMenu: () => void;
  isPaused: boolean;
  onTogglePause: () => void;
  powerUpsState: PlayerPowerUpsState;
  onActivatePowerUp: (id: PowerUpID) => void; 
  isShieldActive: boolean;
  playerCoins: number; // Added
  onPurchasePowerUp: (id: PowerUpID) => void; // Added
}

const GameControls: React.FC<GameControlsProps> = ({
  selectedDifficulty,
  onDifficultyChangeAndReset,
  minesLeft,
  timer,
  onReset,
  gameStatus,
  onGoToMenu,
  isPaused,
  onTogglePause,
  powerUpsState,
  onActivatePowerUp,
  isShieldActive,
  playerCoins,
  onPurchasePowerUp,
}) => {

  return (
    <div className="flex flex-col items-center justify-between p-4 bg-slate-800 rounded-lg shadow-md mb-1 space-y-4 sm:space-y-0">
      <div className="w-full flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-2">
        <div className="flex items-center space-x-2">
          <button
            onClick={onGoToMenu}
            className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            Menu
          </button>
          <select
            id="difficulty-game"
            value={selectedDifficulty.name}
            onChange={(e) => {
              const newDifficulty = DIFFICULTIES.find(d => d.name === e.target.value);
              if (newDifficulty) onDifficultyChangeAndReset(newDifficulty);
            }}
            disabled={gameStatus === GameStatus.Won || gameStatus === GameStatus.Lost || (gameStatus === GameStatus.Playing && !isPaused)}
            className="bg-slate-700 border border-slate-600 text-slate-100 text-xs sm:text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 p-2 sm:p-2.5"
            title="Change difficulty (will reset game)"
          >
            {DIFFICULTIES.map(diff => (
              <option key={diff.name} value={diff.name}>{diff.name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2">
           <div className="flex items-center space-x-1 p-1.5 sm:p-2 bg-slate-700 rounded-md" title="Your Coins">
              <CurrencyCoinIcon className="text-yellow-400 w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-base sm:text-lg font-mono text-slate-200 w-10 sm:w-12 text-center">{String(playerCoins).padStart(3, '0')}</span>
            </div>
          <div className="flex items-center space-x-1 p-1.5 sm:p-2 bg-slate-700 rounded-md" title="Mines Left">
            <FlagIcon className="text-amber-400 w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-base sm:text-lg font-mono text-slate-200 w-7 sm:w-8 text-center">{String(minesLeft).padStart(2, '0')}</span>
          </div>
          
          <button
            onClick={onTogglePause}
            className={`p-1.5 sm:p-2 rounded-full text-white transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-opacity-75 ${
              isPaused 
                ? 'bg-emerald-500 hover:bg-emerald-400 focus:ring-emerald-300' 
                : 'bg-yellow-500 hover:bg-yellow-400 focus:ring-yellow-300'
            }`}
            title={isPaused ? "Resume Game" : "Pause Game"}
            disabled={gameStatus === GameStatus.Won || gameStatus === GameStatus.Lost || gameStatus === GameStatus.Ready}
          >
            {isPaused ? <PlayIcon className="w-5 h-5 sm:w-6 sm:h-6"/> : <PauseIcon className="w-5 h-5 sm:w-6 sm:h-6"/>}
          </button>

          <button
            onClick={onReset}
            className="p-1.5 sm:p-2 bg-sky-600 hover:bg-sky-500 rounded-full text-white transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75"
            title="Reset Game"
          >
            <RefreshIcon className="w-5 h-5 sm:w-6 sm:h-6"/>
          </button>
          <div className="flex items-center space-x-1 p-1.5 sm:p-2 bg-slate-700 rounded-md" title="Time Elapsed">
            <ClockIcon className="text-sky-400 w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-base sm:text-lg font-mono text-slate-200 w-8 sm:w-10 text-center">{String(timer).padStart(3, '0')}</span>
          </div>
        </div>
      </div>
      
      <PowerUpControls 
        powerUpsState={powerUpsState}
        onActivatePowerUp={onActivatePowerUp}
        gameStatus={gameStatus}
        isShieldActive={isShieldActive}
        playerCoins={playerCoins}
        onPurchasePowerUp={onPurchasePowerUp}
      />
    </div>
  );
};

export default GameControls;