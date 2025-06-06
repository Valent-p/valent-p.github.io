
import { DifficultyOption, PlayerStats, AchievementID, Achievement, PowerUpID, PowerUp } from './types';
import { FlagIcon, MineIcon, TrophyIcon, ShieldIcon, EyeIcon, CurrencyCoinIcon } from './components/Icons';

export const DIFFICULTIES: DifficultyOption[] = [
  { name: 'Easy', rows: 9, cols: 9, mines: 10 },
  { name: 'Medium', rows: 16, cols: 16, mines: 40 },
  { name: 'Hard', rows: 16, cols: 30, mines: 99 },
];

export const CELL_COLORS: { [key: number]: string } = {
  1: 'text-sky-500',
  2: 'text-emerald-500',
  3: 'text-rose-500',
  4: 'text-violet-500',
  5: 'text-amber-700', 
  6: 'text-teal-500',
  7: 'text-pink-500',
  8: 'text-slate-400',
};

export const INITIAL_PLAYER_STATS: PlayerStats = {
  gamesPlayed: 0,
  wins: 0,
  losses: 0,
  totalMinesCleared: 0,
  averageCompletionTimes: {
    [DIFFICULTIES[0].name]: { totalTime: 0, gamesCompleted: 0 },
    [DIFFICULTIES[1].name]: { totalTime: 0, gamesCompleted: 0 },
    [DIFFICULTIES[2].name]: { totalTime: 0, gamesCompleted: 0 },
  },
  coins: 0, 
  totalCoinsEarned: 0, // Initial total coins earned
};

export const ACHIEVEMENTS_CONFIG: { [key in AchievementID]: Omit<Achievement, 'isUnlocked' | 'unlockDate'> } = {
  [AchievementID.FIRST_VICTORY]: {
    id: AchievementID.FIRST_VICTORY,
    name: "First Victory!",
    description: "Win your first game of Minesweeper on any difficulty.",
    icon: TrophyIcon,
  },
  [AchievementID.NOVICE_SWEEPER]: {
    id: AchievementID.NOVICE_SWEEPER,
    name: "Novice Sweeper",
    description: "Complete 5 games (win or lose).",
    icon: FlagIcon,
  },
  [AchievementID.MINE_HUNTER_BRONZE]: {
    id: AchievementID.MINE_HUNTER_BRONZE,
    name: "Mine Hunter: Bronze",
    description: "Successfully clear a total of 100 mines across all games.",
    icon: MineIcon,
  },
  [AchievementID.MEDIUM_MASTER]: {
    id: AchievementID.MEDIUM_MASTER,
    name: "Medium Well Done",
    description: "Win a game on Medium difficulty.",
    icon: TrophyIcon,
  },
  [AchievementID.HARD_CONQUEROR]: {
    id: AchievementID.HARD_CONQUEROR,
    name: "Hard Mode Hero",
    description: "Conquer the board on Hard difficulty.",
    icon: TrophyIcon,
  },
  [AchievementID.COIN_NOVICE]: {
    id: AchievementID.COIN_NOVICE,
    name: "Coin Novice",
    description: "Earn a total of 100 coins across all games.",
    icon: CurrencyCoinIcon,
  },
  [AchievementID.POCKET_MONEY]: {
    id: AchievementID.POCKET_MONEY,
    name: "Pocket Money",
    description: "Have 50 coins in your balance at one time.",
    icon: CurrencyCoinIcon,
  },
  [AchievementID.COIN_COLLECTOR]: {
    id: AchievementID.COIN_COLLECTOR,
    name: "Coin Collector",
    description: "Earn a total of 500 coins across all games.",
    icon: CurrencyCoinIcon,
  },
  [AchievementID.WEALTHY_SWEEPER]: {
    id: AchievementID.WEALTHY_SWEEPER,
    name: "Wealthy Sweeper",
    description: "Have 200 coins in your balance at one time.",
    icon: CurrencyCoinIcon,
  },
};

export const POWER_UPS_CONFIG: { [key in PowerUpID]: PowerUp } = {
  [PowerUpID.SHIELD]: {
    id: PowerUpID.SHIELD,
    name: "Shield",
    description: "Protects you from one mine. Activates immediately once bought and then activated.",
    icon: ShieldIcon,
    disabledTooltip: "Shield used or game not active",
    cost: 20, 
  },
  [PowerUpID.REVEAL_ONE_SAFE]: {
    id: PowerUpID.REVEAL_ONE_SAFE,
    name: "Reveal Safe Cell",
    description: "Reveals one random, safe, unrevealed cell.",
    icon: EyeIcon,
    disabledTooltip: "Safe Cell Reveal used or game not active",
    cost: 15, 
  },
};

export const COIN_REWARDS: { [difficultyName: string]: number } = {
  [DIFFICULTIES[0].name]: 10, // Easy
  [DIFFICULTIES[1].name]: 25, // Medium
  [DIFFICULTIES[2].name]: 50, // Hard
};
