
import { SavedGameState, DifficultyOption, PlayerStats, PlayerAchievements, AchievementID, AverageTimeStats, PlayerPowerUpsState, PowerUpID } from '../types';
import { DIFFICULTIES, INITIAL_PLAYER_STATS, ACHIEVEMENTS_CONFIG, POWER_UPS_CONFIG, COIN_REWARDS } from '../constants';

const GAME_STATE_KEY = 'minesweeperGameState';
const HIGH_SCORES_KEY = 'minesweeperHighScores';
const PLAYER_STATS_KEY = 'minesweeperPlayerStats';
const ACHIEVEMENTS_KEY = 'minesweeperPlayerAchievements';

const initialPowerUpsStateForLoad = (): PlayerPowerUpsState => {
  const state: PlayerPowerUpsState = {};
  Object.keys(POWER_UPS_CONFIG).forEach(id => {
    state[id as PowerUpID] = { isAvailable: false, usedInCurrentGame: false };
  });
  return state;
};


export const storageService = {
  // Game State
  saveGameState: (state: SavedGameState | null): void => {
    if (state) {
      localStorage.setItem(GAME_STATE_KEY, JSON.stringify(state));
    } else {
      localStorage.removeItem(GAME_STATE_KEY);
    }
  },

  loadGameState: (): SavedGameState | null => {
    const saved = localStorage.getItem(GAME_STATE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Partial<SavedGameState>; 
        
        if (parsed && typeof parsed.difficulty === 'object' && Array.isArray(parsed.board) &&
            parsed.gameStatus && typeof parsed.minesLeft === 'number' &&
            typeof parsed.timer === 'number' && typeof parsed.revealedCellsCount === 'number'
        ) {
          const knownDifficulty = DIFFICULTIES.find(d => d.name === parsed.difficulty?.name);
          if (knownDifficulty && 
              knownDifficulty.rows === parsed.difficulty.rows &&
              knownDifficulty.cols === parsed.difficulty.cols &&
              knownDifficulty.mines === parsed.difficulty.mines) {
            
            const fullState: SavedGameState = {
              difficulty: parsed.difficulty,
              board: parsed.board,
              gameStatus: parsed.gameStatus,
              minesLeft: parsed.minesLeft,
              timer: parsed.timer,
              revealedCellsCount: parsed.revealedCellsCount,
              powerUpsState: parsed.powerUpsState || initialPowerUpsStateForLoad(), 
              isShieldActive: parsed.isShieldActive || false, 
              playerCoins: parsed.playerCoins // Keep this if present, but primarily use global PlayerStats.coins
            };
            return fullState;
          } else {
            console.warn("Loaded game state has mismatched difficulty structure. Discarding.");
            localStorage.removeItem(GAME_STATE_KEY);
            return null;
          }
        } else {
          console.warn("Loaded game state is missing core properties. Discarding.");
          localStorage.removeItem(GAME_STATE_KEY);
          return null;
        }
      } catch (error) {
        console.error("Error parsing saved game state:", error);
        localStorage.removeItem(GAME_STATE_KEY);
        return null;
      }
    }
    return null;
  },

  clearGameState: (): void => {
    localStorage.removeItem(GAME_STATE_KEY);
  },

  // High Scores
  getHighScores: (): { [key: string]: number } => {
    const scores = localStorage.getItem(HIGH_SCORES_KEY);
    return scores ? JSON.parse(scores) : {};
  },

  updateHighScore: (difficultyName: string, time: number): boolean => {
    const scores = storageService.getHighScores();
    if (!scores[difficultyName] || time < scores[difficultyName]) {
      scores[difficultyName] = time;
      localStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(scores));
      return true; 
    }
    return false; 
  },

  // Player Statistics
  loadPlayerStats: (): PlayerStats => {
    const statsString = localStorage.getItem(PLAYER_STATS_KEY);
    if (statsString) {
      try {
        const stats = JSON.parse(statsString) as Partial<PlayerStats>;
        const fullStats: PlayerStats = {
            ...INITIAL_PLAYER_STATS, 
            ...stats, 
            coins: typeof stats.coins === 'number' ? stats.coins : 0, 
            totalCoinsEarned: typeof stats.totalCoinsEarned === 'number' ? stats.totalCoinsEarned : 0, // Default totalCoinsEarned
            averageCompletionTimes: { 
                ...(INITIAL_PLAYER_STATS.averageCompletionTimes),
                ...(stats.averageCompletionTimes || {}),
            }
        };
         DIFFICULTIES.forEach(diff => {
          if (!fullStats.averageCompletionTimes[diff.name]) {
            fullStats.averageCompletionTimes[diff.name] = { totalTime: 0, gamesCompleted: 0 };
          }
        });
        return fullStats;
      } catch (e) {
        console.error("Failed to parse player stats, returning initial.", e);
        return { ...INITIAL_PLAYER_STATS }; 
      }
    }
    return { ...INITIAL_PLAYER_STATS }; 
  },

  savePlayerStats: (stats: PlayerStats): void => {
    localStorage.setItem(PLAYER_STATS_KEY, JSON.stringify(stats));
  },
  
  updateGamesPlayed: (): PlayerStats => {
    const stats = storageService.loadPlayerStats();
    stats.gamesPlayed += 1;
    storageService.savePlayerStats(stats);
    return stats;
  },

  updateWinStats: (difficultyName: string, time: number, minesInLevel: number): PlayerStats => {
    const stats = storageService.loadPlayerStats();
    stats.wins += 1;
    stats.totalMinesCleared += minesInLevel;
    
    const reward = COIN_REWARDS[difficultyName] || 0;
    stats.coins += reward;
    stats.totalCoinsEarned += reward; // Increment total coins earned
    
    if (!stats.averageCompletionTimes[difficultyName]) {
      stats.averageCompletionTimes[difficultyName] = { totalTime: 0, gamesCompleted: 0 };
    }
    stats.averageCompletionTimes[difficultyName].totalTime += time;
    stats.averageCompletionTimes[difficultyName].gamesCompleted += 1;
    
    storageService.savePlayerStats(stats);
    return stats;
  },

  updateLossStats: (): PlayerStats => {
    const stats = storageService.loadPlayerStats();
    stats.losses += 1;
    storageService.savePlayerStats(stats);
    return stats;
  },


  // Achievements
  loadAchievements: (): PlayerAchievements => {
    const achievementsString = localStorage.getItem(ACHIEVEMENTS_KEY);
    return achievementsString ? JSON.parse(achievementsString) : {};
  },

  saveAchievements: (achievements: PlayerAchievements): void => {
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(achievements));
  },

  unlockAchievement: (id: AchievementID): PlayerAchievements => {
    const currentAchievements = storageService.loadAchievements();
    if (!currentAchievements[id]?.isUnlocked) {
      currentAchievements[id] = {
        isUnlocked: true,
        unlockDate: Date.now(),
      };
      storageService.saveAchievements(currentAchievements);
    }
    return currentAchievements;
  },
};
