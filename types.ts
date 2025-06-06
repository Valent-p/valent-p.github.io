
export interface CellModel {
  x: number;
  y: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
  isExploded?: boolean; // To mark the mine that was clicked
  isShieldProtected?: boolean; // If a shield saved this mine cell
}

export type BoardModel = CellModel[][];

export enum GameStatus {
  Ready = 'ready', // Initial state, or after reset, before first move
  Playing = 'playing', // Game is active, timer running
  Won = 'won',
  Lost = 'lost',
}

export interface DifficultyOption {
  name: string;
  rows: number;
  cols: number;
  mines: number;
}

export enum AppView {
  Menu = 'menu',
  Game = 'game',
  Help = 'help',
  About = 'about',
  Statistics = 'statistics', 
  Achievements = 'achievements',
}

export interface SavedGameState {
  difficulty: DifficultyOption;
  board: BoardModel;
  gameStatus: GameStatus;
  minesLeft: number;
  timer: number;
  revealedCellsCount: number;
  powerUpsState: PlayerPowerUpsState; 
  isShieldActive: boolean;
  playerCoins?: number; // Current coins at time of save, primarily for reference if needed. Global coins are in PlayerStats.
}

// For Statistics
export interface AverageTimeStats {
  totalTime: number;
  gamesCompleted: number;
}

export interface PlayerStats {
  gamesPlayed: number;
  wins: number;
  losses: number;
  totalMinesCleared: number;
  averageCompletionTimes: {
    [difficultyName: string]: AverageTimeStats;
  };
  coins: number; 
  totalCoinsEarned: number; // Added: Tracks all coins ever earned
}

// For Achievements
export enum AchievementID {
  NOVICE_SWEEPER = 'NOVICE_SWEEPER', 
  FIRST_VICTORY = 'FIRST_VICTORY',   
  MINE_HUNTER_BRONZE = 'MINE_HUNTER_BRONZE', 
  MEDIUM_MASTER = 'MEDIUM_MASTER', 
  HARD_CONQUEROR = 'HARD_CONQUEROR', 
  COIN_NOVICE = 'COIN_NOVICE',         // Earn 100 total
  POCKET_MONEY = 'POCKET_MONEY',       // Possess 50
  COIN_COLLECTOR = 'COIN_COLLECTOR',   // Earn 500 total
  WEALTHY_SWEEPER = 'WEALTHY_SWEEPER', // Possess 200
}

export interface Achievement {
  id: AchievementID;
  name: string;
  description: string;
  isUnlocked: boolean;
  unlockDate?: number; 
  icon?: React.FC<{className?: string}>; 
}

export type PlayerAchievements = {
  [key in AchievementID]?: { 
    isUnlocked: boolean;
    unlockDate?: number;
  };
};

// For Power-ups
export enum PowerUpID {
  SHIELD = 'SHIELD',
  REVEAL_ONE_SAFE = 'REVEAL_ONE_SAFE',
}

export interface PowerUp {
  id: PowerUpID;
  name: string;
  description: string;
  icon: React.FC<{ className?: string; title?: string }>;
  disabledTooltip?: string; 
  cost: number; // Added cost for the power-up
}

export type PlayerPowerUpsState = {
  [key in PowerUpID]?: {
    isAvailable: boolean; // True if bought for this game session
    usedInCurrentGame: boolean; // True if activated in the current game attempt
  };
};
