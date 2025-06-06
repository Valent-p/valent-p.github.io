
import { useState, useEffect, useCallback } from 'react';
import { BoardModel, CellModel, DifficultyOption, GameStatus, PlayerPowerUpsState, PowerUpID, PlayerStats, PlayerAchievements, AchievementID, Achievement } from '../types';
import { DIFFICULTIES, ACHIEVEMENTS_CONFIG, POWER_UPS_CONFIG, COIN_REWARDS } from '../constants';
import { createBoard, revealCell, toggleFlag, checkWinCondition } from '../utils/gameLogic';
import * as realtimeAudioService from '../services/realtimeAudioService';
import { storageService } from '../services/storageService';

const checkAndUnlockAchievements = (stats: PlayerStats, difficultyWon?: DifficultyOption): Achievement[] => {
  const currentAchievements = storageService.loadAchievements();
  const newlyUnlocked: Achievement[] = [];

  Object.values(ACHIEVEMENTS_CONFIG).forEach(achConfig => {
    if (!currentAchievements[achConfig.id]?.isUnlocked) {
      let shouldUnlock = false;
      switch (achConfig.id) {
        case AchievementID.FIRST_VICTORY:
          if (stats.wins >= 1) shouldUnlock = true;
          break;
        case AchievementID.NOVICE_SWEEPER:
          if (stats.gamesPlayed >= 5) shouldUnlock = true;
          break;
        case AchievementID.MINE_HUNTER_BRONZE:
          if (stats.totalMinesCleared >= 100) shouldUnlock = true;
          break;
        case AchievementID.MEDIUM_MASTER:
          if (difficultyWon?.name === DIFFICULTIES[1].name && stats.averageCompletionTimes[DIFFICULTIES[1].name]?.gamesCompleted > 0) {
            shouldUnlock = true;
          }
          break;
        case AchievementID.HARD_CONQUEROR:
          if (difficultyWon?.name === DIFFICULTIES[2].name && stats.averageCompletionTimes[DIFFICULTIES[2].name]?.gamesCompleted > 0) {
            shouldUnlock = true;
          }
          break;
        case AchievementID.COIN_NOVICE:
          if (stats.totalCoinsEarned >= 100) shouldUnlock = true;
          break;
        case AchievementID.POCKET_MONEY:
          if (stats.coins >= 50) shouldUnlock = true;
          break;
        case AchievementID.COIN_COLLECTOR:
          if (stats.totalCoinsEarned >= 500) shouldUnlock = true;
          break;
        case AchievementID.WEALTHY_SWEEPER:
          if (stats.coins >= 200) shouldUnlock = true;
          break;
      }

      if (shouldUnlock) {
        storageService.unlockAchievement(achConfig.id);
        newlyUnlocked.push({ ...achConfig, isUnlocked: true, unlockDate: Date.now() });
      }
    }
  });
  return newlyUnlocked;
};


const initialPowerUpsState = (): PlayerPowerUpsState => {
  const state: PlayerPowerUpsState = {};
  Object.keys(POWER_UPS_CONFIG).forEach(id => {
    state[id as PowerUpID] = { isAvailable: false, usedInCurrentGame: false };
  });
  return state;
};

// Define a constant for game statuses where pausing for an achievement modal is appropriate
const PAUSABLE_GAME_STATUSES_FOR_ACHIEVEMENT_MODAL: GameStatus[] = [GameStatus.Playing, GameStatus.Ready];

export const useMinesweeper = (
  initialConfigDifficulty: DifficultyOption,
  shouldAttemptResume: boolean
) => {
  const [difficulty, setDifficulty] = useState<DifficultyOption>(initialConfigDifficulty);
  const [board, setBoard] = useState<BoardModel | null>(null);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Ready);
  const [minesLeft, setMinesLeft] = useState<number>(initialConfigDifficulty.mines);
  const [timer, setTimer] = useState<number>(0);
  const [revealedCellsCount, setRevealedCellsCount] = useState<number>(0);
  const [showGameOverModal, setShowGameOverModal] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const [powerUpsState, setPowerUpsState] = useState<PlayerPowerUpsState>(initialPowerUpsState());
  const [isShieldActive, setIsShieldActive] = useState<boolean>(false);
  const [playerCoins, setPlayerCoins] = useState<number>(storageService.loadPlayerStats().coins);

  const [achievementsInModal, setAchievementsInModal] = useState<Achievement[] | null>(null);
  const [pausedForAchievement, setPausedForAchievement] = useState<boolean>(false);
  const [isGameOutcomeProcessed, setIsGameOutcomeProcessed] = useState<boolean>(false);


  const resetPowerUps = useCallback(() => {
    setPowerUpsState(initialPowerUpsState());
    setIsShieldActive(false);
  }, []);

  const processAchievements = useCallback((stats: PlayerStats, difficultyWon?: DifficultyOption) => {
    const justUnlocked = checkAndUnlockAchievements(stats, difficultyWon);
    if (justUnlocked.length > 0) {
        setAchievementsInModal(justUnlocked);
        // Only pause if game is ongoing and not already paused for other reasons,
        // and game over modal is not about to be shown.
        if (PAUSABLE_GAME_STATUSES_FOR_ACHIEVEMENT_MODAL.includes(gameStatus) && !isPaused && !showGameOverModal) {
            setIsPaused(true);
            setPausedForAchievement(true);
        }
    }
  }, [gameStatus, isPaused, showGameOverModal]); 

  const initializeNewGame = useCallback((configDifficulty: DifficultyOption, isContinuation: boolean = false) => {
    const newBoard = createBoard(configDifficulty.rows, configDifficulty.cols, configDifficulty.mines);
    setBoard(newBoard);
    setDifficulty(configDifficulty);
    setGameStatus(GameStatus.Ready);
    setMinesLeft(configDifficulty.mines);
    setTimer(0);
    setRevealedCellsCount(0);
    setShowGameOverModal(false);
    setIsPaused(false);
    setPausedForAchievement(false);
    setAchievementsInModal(null);
    setIsGameOutcomeProcessed(false); // Reset outcome processing flag
    resetPowerUps();
    
    if (!isContinuation) {
        const updatedStats = storageService.updateGamesPlayed();
        setPlayerCoins(updatedStats.coins);
        processAchievements(updatedStats);
    }
  }, [resetPowerUps, processAchievements]);
  
  useEffect(() => {
    let resumed = false;
    const initialStats = storageService.loadPlayerStats();
    setPlayerCoins(initialStats.coins);
    // Process achievements on initial load for any pending ones based on loaded stats
    // This is deferred slightly by being in initializeNewGame or after resume logic.


    if (shouldAttemptResume) {
      const savedState = storageService.loadGameState();
      if (savedState && (savedState.gameStatus === GameStatus.Playing || (savedState.gameStatus === GameStatus.Ready && savedState.board?.length > 0))) {
        setDifficulty(savedState.difficulty);
        setBoard(savedState.board);
        setGameStatus(savedState.gameStatus);
        setMinesLeft(savedState.minesLeft);
        setTimer(savedState.timer);
        setRevealedCellsCount(savedState.revealedCellsCount);
        setPowerUpsState(savedState.powerUpsState || initialPowerUpsState());
        setIsShieldActive(savedState.isShieldActive || false);
        if (savedState.playerCoins !== undefined) setPlayerCoins(savedState.playerCoins);
        else setPlayerCoins(initialStats.coins);
        
        setShowGameOverModal(false);
        setIsGameOutcomeProcessed(false); // Ensure fresh processing if game was saved mid-state
        resumed = true;
        // Process achievements with current stats upon successful resume
        processAchievements(storageService.loadPlayerStats(), savedState.gameStatus === GameStatus.Won ? savedState.difficulty : undefined);

      } else {
        storageService.clearGameState();
      }
    }

    if (!resumed) {
      initializeNewGame(initialConfigDifficulty, false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialConfigDifficulty, shouldAttemptResume]); // initializeNewGame and processAchievements are stable or handled by their own effects

  // Effect for saving game state
   useEffect(() => {
    if (gameStatus === GameStatus.Playing && board && !isPaused) {
      storageService.saveGameState({
        difficulty,
        board,
        gameStatus,
        minesLeft,
        timer,
        revealedCellsCount,
        powerUpsState,
        isShieldActive,
        playerCoins,
      });
    } else if (gameStatus === GameStatus.Won || gameStatus === GameStatus.Lost) {
      // Only clear game state here. The stat updates are handled by the other useEffect
      storageService.clearGameState();
    }
  }, [gameStatus, board, difficulty, minesLeft, timer, revealedCellsCount, powerUpsState, isShieldActive, playerCoins, isPaused]);


  // Effect for processing game win/loss outcomes ONCE
  useEffect(() => {
    if ((gameStatus === GameStatus.Won || gameStatus === GameStatus.Lost) && !isGameOutcomeProcessed) {
      let finalStats: PlayerStats;
      if (gameStatus === GameStatus.Won) {
        storageService.updateHighScore(difficulty.name, timer);
        finalStats = storageService.updateWinStats(difficulty.name, timer, difficulty.mines);
      } else {
        finalStats = storageService.updateLossStats();
      }
      setPlayerCoins(finalStats.coins); // Update local state for UI
      processAchievements(finalStats, gameStatus === GameStatus.Won ? difficulty : undefined);
      setIsGameOutcomeProcessed(true); // Mark as processed
    }
  }, [gameStatus, difficulty, timer, isGameOutcomeProcessed, processAchievements]);


  // Effect for timer and showing Game Over Modal
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;
    let modalTimerId: ReturnType<typeof setTimeout> | undefined;

    if (gameStatus === GameStatus.Playing && !isPaused) {
      intervalId = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    } else if ((gameStatus === GameStatus.Won || gameStatus === GameStatus.Lost) && isGameOutcomeProcessed) { // Ensure outcome is processed before showing modal
      if (intervalId) clearInterval(intervalId);
      // Only show game over modal if achievement modal isn't up
      if (!achievementsInModal) {
        modalTimerId = setTimeout(() => setShowGameOverModal(true), 750);
      }
      if (gameStatus === GameStatus.Won) realtimeAudioService.playWinSound();
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
      if (modalTimerId) clearTimeout(modalTimerId);
    };
  }, [gameStatus, isPaused, achievementsInModal, isGameOutcomeProcessed]);

  // Effect for checking win condition
  useEffect(() => {
    if (!board || gameStatus !== GameStatus.Playing || isPaused || !difficulty) return;

    if (checkWinCondition(board, difficulty.mines)) {
      setGameStatus(GameStatus.Won);
      const finalBoard = board.map(row => row.map(cell => 
        cell.isMine && !cell.isFlagged ? { ...cell, isFlagged: true, isRevealed: false } : cell
      ));
      setBoard(finalBoard);
    }
  }, [revealedCellsCount, board, difficulty, gameStatus, isPaused]);


  const handleAcknowledgeNewAchievements = () => {
    setAchievementsInModal(null);
    if (pausedForAchievement) {
        setIsPaused(false);
        setPausedForAchievement(false);
    }
    // If game ended while achievement modal(s) were up, show game over modal now
    if ((gameStatus === GameStatus.Won || gameStatus === GameStatus.Lost) && !showGameOverModal && isGameOutcomeProcessed) {
        setShowGameOverModal(true);
    }
  };

  const handleDifficultyChangeAndReset = (newDifficulty: DifficultyOption) => {
    storageService.clearGameState();
    initializeNewGame(newDifficulty, false);
    realtimeAudioService.playStartSound();
  };
  
  const handleReset = () => {
    storageService.clearGameState();
    initializeNewGame(difficulty, true); // Pass true for isContinuation as it's a reset of current, not new session
    realtimeAudioService.playStartSound();
  };

  const handleCellClick = (row: number, col: number) => {
    if (isPaused || gameStatus === GameStatus.Won || gameStatus === GameStatus.Lost || !board || board[row][col].isRevealed || board[row][col].isFlagged) {
      return;
    }

    let currentBoard = board;
    const isFirstActionOfGame = gameStatus === GameStatus.Ready;

    if (isFirstActionOfGame) {
      let tempBoard = currentBoard;
      if (tempBoard[row][col].isMine) {
        let attempts = 0;
        const maxAttempts = difficulty.rows * difficulty.cols;
        do {
          tempBoard = createBoard(difficulty.rows, difficulty.cols, difficulty.mines);
          attempts++;
        } while (tempBoard[row][col].isMine && attempts < maxAttempts);
         if (tempBoard[row][col].isMine && attempts >= maxAttempts) {
             console.warn("Could not ensure first click is not a mine.");
        }
      }
      currentBoard = tempBoard;
      setBoard(currentBoard);
      setGameStatus(GameStatus.Playing);
      setIsGameOutcomeProcessed(false); // Reset for the new game attempt
    }
    
    const clickedCell = currentBoard[row][col];

    if (clickedCell.isMine && isShieldActive) {
      setIsShieldActive(false);
      const newBoard = currentBoard.map((r, rIdx) => r.map((c, cIdx) => {
        if (rIdx === row && cIdx === col) {
          return { ...c, isRevealed: true, isShieldProtected: true, isExploded: false };
        }
        return c;
      }));
      setBoard(newBoard);
      setRevealedCellsCount(prev => prev + 1);
      realtimeAudioService.playShieldBlockSound();
      
      setPowerUpsState(prev => ({ ...prev, [PowerUpID.SHIELD]: { ...prev[PowerUpID.SHIELD]!, isAvailable: true, usedInCurrentGame: true } }));
      processAchievements(storageService.loadPlayerStats());
      return;
    }
    
    if(gameStatus === GameStatus.Playing || isFirstActionOfGame){
      if (isFirstActionOfGame && !(clickedCell.isMine && isShieldActive)) realtimeAudioService.playStartSound();
      
      const { newBoard, gameOver, cellsRevealedDelta } = revealCell(currentBoard, row, col);
      setBoard(newBoard);
      setRevealedCellsCount(prev => prev + cellsRevealedDelta);
      
      if (gameOver) {
        setGameStatus(GameStatus.Lost);
        realtimeAudioService.playExplosionSound();
      } else if (cellsRevealedDelta > 0) {
        const revealedClickedCell = newBoard[row][col];
        if (revealedClickedCell.isRevealed && revealedClickedCell.adjacentMines === 0 && cellsRevealedDelta > 1) {
            realtimeAudioService.playEmptyRevealSound();
        } else {
            realtimeAudioService.playSingleRevealSound();
        }
        processAchievements(storageService.loadPlayerStats());
      }
    }
  };

  const handleCellContextMenu = (row: number, col: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (isPaused || !board || gameStatus === GameStatus.Won || gameStatus === GameStatus.Lost || board[row][col].isRevealed) {
      return;
    }

    if (gameStatus === GameStatus.Ready) {
      setGameStatus(GameStatus.Playing);
      setIsGameOutcomeProcessed(false); // Reset for the new game attempt
      realtimeAudioService.playStartSound();
    }
    
    const { newBoard, flagAdded } = toggleFlag(board, row, col);
    setBoard(newBoard);
    setMinesLeft(prevMines => prevMines + (flagAdded ? -1 : 1));
    realtimeAudioService.playFlagSound();
    processAchievements(storageService.loadPlayerStats());
  };

  const handleDismissGameOverModal = () => setShowGameOverModal(false);

  const togglePause = () => {
    if (isPaused && pausedForAchievement) return;
    
    if (gameStatus === GameStatus.Playing || (isPaused && gameStatus !== GameStatus.Won && gameStatus !== GameStatus.Lost) ) {
      setIsPaused(!isPaused);
    }
  };

  const handlePurchasePowerUp = (id: PowerUpID) => {
    const powerUpConfig = POWER_UPS_CONFIG[id];
    if (!powerUpConfig || !board || gameStatus === GameStatus.Won || gameStatus === GameStatus.Lost) {
        realtimeAudioService.playErrorSound();
        return;
    }

    if (powerUpsState[id]?.isAvailable) {
        return;
    }

    if (playerCoins >= powerUpConfig.cost) {
        const newCoins = playerCoins - powerUpConfig.cost;
        setPlayerCoins(newCoins);

        const stats = storageService.loadPlayerStats();
        stats.coins = newCoins;
        storageService.savePlayerStats(stats);

        setPowerUpsState(prev => ({
            ...prev,
            [id]: { isAvailable: true, usedInCurrentGame: false }
        }));
        realtimeAudioService.playPurchaseSound();
        processAchievements(stats);
    } else {
        realtimeAudioService.playNotEnoughCoinsSound();
    }
  };

  const handleActivatePowerUp = (id: PowerUpID) => {
    if (gameStatus !== GameStatus.Playing || isPaused || !powerUpsState[id]?.isAvailable || powerUpsState[id]?.usedInCurrentGame) {
      return;
    }

    setPowerUpsState(prev => ({ ...prev, [id]: { ...prev[id]!, usedInCurrentGame: true } }));
    realtimeAudioService.playPowerUpActivateSound();

    if (id === PowerUpID.SHIELD) {
      setIsShieldActive(true);
    } else if (id === PowerUpID.REVEAL_ONE_SAFE && board) {
      const safeUnrevealedCells: { r: number, c: number }[] = [];
      board.forEach((rowItems, r) => {
        rowItems.forEach((cell, c) => {
          if (!cell.isMine && !cell.isRevealed && !cell.isFlagged) {
            safeUnrevealedCells.push({ r, c });
          }
        });
      });

      if (safeUnrevealedCells.length > 0) {
        const randomIdx = Math.floor(Math.random() * safeUnrevealedCells.length);
        const cellToReveal = safeUnrevealedCells[randomIdx];
        const { newBoard, cellsRevealedDelta } = revealCell(board, cellToReveal.r, cellToReveal.c);
        setBoard(newBoard);
        setRevealedCellsCount(prev => prev + cellsRevealedDelta);
        
        const revealedCellData = newBoard[cellToReveal.r][cellToReveal.c];
        if (revealedCellData.isRevealed && revealedCellData.adjacentMines === 0 && cellsRevealedDelta > 1) {
            realtimeAudioService.playEmptyRevealSound();
        } else if (revealedCellData.isRevealed) {
            realtimeAudioService.playSingleRevealSound();
        }
      } else {
        console.warn("Reveal Safe Cell: No safe unrevealed cells found.");
      }
    }
    processAchievements(storageService.loadPlayerStats());
  };

  return {
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
  };
};
