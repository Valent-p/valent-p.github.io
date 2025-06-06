
import React, { useState, useEffect, useCallback } from 'react';
import { useMinesweeper } from './hooks/useMinesweeper';
import Board from './components/Board';
import GameControls from './components/GameControls';
import GameOverModal from './components/GameOverModal';
import MainMenu from './components/MainMenu';
import AboutScreen from './components/AboutScreen';
import HelpScreen from './components/HelpScreen';
import StatisticsScreen from './components/StatisticsScreen'; 
import AchievementsScreen from './components/AchievementsScreen'; 
import AchievementUnlockedModal from './components/AchievementUnlockedModal';
import { GameStatus, DifficultyOption, AppView, Achievement } from './types';
import { DIFFICULTIES, COIN_REWARDS } from './constants';
import { storageService } from './services/storageService';

interface GameWrapperProps {
  initialDifficulty: DifficultyOption;
  isResuming: boolean;
  onGoToMenu: () => void;
  key?: number; // React key for re-mounting
}

const GameWrapper: React.FC<GameWrapperProps> = ({ initialDifficulty, isResuming, onGoToMenu }) => {
  const {
    difficulty, 
    board,
    gameStatus,
    minesLeft,
    timer,
    showGameOverModal, 
    isPaused,
    powerUpsState,
    isShieldActive,
    playerCoins,
    achievementsInModal, // Changed from currentAchievementInModal
    handleDifficultyChangeAndReset,
    handleReset,
    handleCellClick,
    handleCellContextMenu,
    handleDismissGameOverModal, 
    togglePause,
    handleActivatePowerUp,
    handlePurchasePowerUp,
    handleAcknowledgeNewAchievements, 
  } = useMinesweeper(initialDifficulty, isResuming);

  if (!board) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
        <div className="text-2xl text-sky-400">Loading Game...</div>
      </div>
    );
  }
  
  const effectiveGameStatus = isPaused && gameStatus === GameStatus.Playing ? GameStatus.Playing : gameStatus;

  let coinsEarnedForModal = 0;
  if (gameStatus === GameStatus.Won) {
    coinsEarnedForModal = COIN_REWARDS[difficulty.name] || 0;
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 font-sans text-slate-100 selection:bg-sky-500 selection:text-white">
      <header className="mb-6 sm:mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-sky-400 tracking-tight">Vibrant Minesweeper</h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">Playing: {difficulty.name}</p>
      </header>

      <main className="bg-slate-800 p-3 sm:p-4 md:p-6 rounded-xl shadow-2xl w-full max-w-max relative">
        {isPaused && gameStatus === GameStatus.Playing && (!achievementsInModal || achievementsInModal.length === 0) && ( 
          <div className="absolute inset-0 bg-slate-900 bg-opacity-80 flex flex-col items-center justify-center z-40 rounded-xl">
            <h2 className="text-3xl text-yellow-400 font-bold mb-4">Paused</h2>
            <button 
              onClick={togglePause}
              className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold py-2 px-6 rounded-lg text-lg transition-colors"
            >
              Resume
            </button>
          </div>
        )}
        <GameControls
          selectedDifficulty={difficulty}
          onDifficultyChangeAndReset={handleDifficultyChangeAndReset}
          minesLeft={minesLeft}
          timer={timer}
          onReset={handleReset}
          gameStatus={effectiveGameStatus}
          onGoToMenu={onGoToMenu}
          isPaused={isPaused}
          onTogglePause={togglePause}
          powerUpsState={powerUpsState} 
          onActivatePowerUp={handleActivatePowerUp} 
          isShieldActive={isShieldActive}
          playerCoins={playerCoins} 
          onPurchasePowerUp={handlePurchasePowerUp} 
        />
        <Board 
          board={board} 
          onCellClick={handleCellClick} 
          onCellContextMenu={handleCellContextMenu}
          gameStatus={effectiveGameStatus} 
        />
      </main>
      
      <footer className="mt-6 sm:mt-8 text-center text-slate-500 text-xs">
        &copy; {new Date().getFullYear()} Veigatec Games. All rights reserved.
      </footer>

      
      {achievementsInModal && achievementsInModal.length > 0 && (
        <AchievementUnlockedModal
          isVisible={true} 
          achievements={achievementsInModal}
          onDismiss={handleAcknowledgeNewAchievements}
        />
      )}

      
      {(!achievementsInModal || achievementsInModal.length === 0) && (gameStatus === GameStatus.Won || gameStatus === GameStatus.Lost) && (
          <GameOverModal 
            status={gameStatus as GameStatus.Won | GameStatus.Lost}
            onPlayAgain={handleReset} 
            onDismiss={handleDismissGameOverModal}
            isVisible={showGameOverModal}
            coinsEarned={coinsEarnedForModal} 
          />
      )}
    </div>
  );
};


const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.Menu);
  const [gameInstanceKey, setGameInstanceKey] = useState(0); 
  const [isResumingGame, setIsResumingGame] = useState(false);
  const [difficultyForNewGame, setDifficultyForNewGame] = useState<DifficultyOption>(DIFFICULTIES[0]);
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  useEffect(() => {
    storageService.loadPlayerStats(); 
    storageService.loadAchievements();

    const savedGame = storageService.loadGameState();
    if (savedGame && (savedGame.gameStatus === GameStatus.Playing || (savedGame.gameStatus === GameStatus.Ready && savedGame.board?.length > 0))) {
      setIsResumingGame(true); 
      setDifficultyForNewGame(savedGame.difficulty); 
    } else {
      setIsResumingGame(false);
      storageService.clearGameState(); 
    }
    setInitialCheckDone(true); 
    setCurrentView(AppView.Menu); 
  }, []);

  const handleNavigate = useCallback((view: AppView, difficultyConfig?: DifficultyOption, resume?: boolean) => {
    if (view === AppView.Game) {
      setIsResumingGame(resume || false);
      if (!resume && difficultyConfig) {
        setDifficultyForNewGame(difficultyConfig);
      } else if (resume) {
        const saved = storageService.loadGameState();
        if (saved) setDifficultyForNewGame(saved.difficulty);
        else { 
            setDifficultyForNewGame(DIFFICULTIES[0]); 
            setIsResumingGame(false);
        }
      }
      setGameInstanceKey(prevKey => prevKey + 1); 
    } else if (view === AppView.Menu) {
        const savedGame = storageService.loadGameState();
        if (savedGame && (savedGame.gameStatus === GameStatus.Playing || (savedGame.gameStatus === GameStatus.Ready && savedGame.board?.length > 0))) {
            setIsResumingGame(true);
        } else {
            setIsResumingGame(false);
        }
    }
    setCurrentView(view);
  }, []);

  if (!initialCheckDone) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-sky-400 text-xl">Loading Vibrant Minesweeper...</p>
      </div>
    );
  }

  switch (currentView) {
    case AppView.Menu:
      return <MainMenu onNavigate={handleNavigate} hasResumableGame={isResumingGame} />;
    case AppView.Game:
      return (
        <GameWrapper
          key={gameInstanceKey}
          initialDifficulty={difficultyForNewGame}
          isResuming={isResumingGame}
          onGoToMenu={() => handleNavigate(AppView.Menu)}
        />
      );
    case AppView.Help:
      return <HelpScreen onNavigate={handleNavigate} />;
    case AppView.About:
      return <AboutScreen onNavigate={handleNavigate} />;
    case AppView.Statistics:
      return <StatisticsScreen onNavigate={handleNavigate} />;
    case AppView.Achievements:
      return <AchievementsScreen onNavigate={handleNavigate} />;
    default:
      return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Error: Unknown view. Please return to Menu.</div>;
  }
};

export default App;
