
import React, { useState, useEffect } from 'react';
import { AppView, PlayerStats, AverageTimeStats } from '../types';
import { storageService } from '../services/storageService';
import { DIFFICULTIES } from '../constants';
import { ChartBarIcon, ClockIcon, TrophyIcon, SadFaceIcon, MineIcon, CurrencyCoinIcon } from './Icons';

interface StatisticsScreenProps {
  onNavigate: (view: AppView) => void;
}

const StatisticsScreen: React.FC<StatisticsScreenProps> = ({ onNavigate }) => {
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [highScores, setHighScores] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    setStats(storageService.loadPlayerStats());
    setHighScores(storageService.getHighScores());
  }, []);

  if (!stats) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-sky-400 text-xl">Loading statistics...</p>
      </div>
    );
  }

  const winLossRatio = stats.losses > 0 ? (stats.wins / stats.losses).toFixed(2) : (stats.wins > 0 ? 'N/A' : 'N/A');
  
  const calculateAverageTime = (avgStats: AverageTimeStats | undefined): string => {
    if (avgStats && avgStats.gamesCompleted > 0) {
      return (avgStats.totalTime / avgStats.gamesCompleted).toFixed(1) + 's';
    }
    return 'N/A';
  };

  const StatCard: React.FC<{ title: string; value: string | number; icon: React.ElementType; iconColor?: string }> = 
    ({ title, value, icon: Icon, iconColor = "text-sky-400" }) => (
    <div className="bg-slate-700 p-4 rounded-lg shadow flex flex-col items-center text-center">
      <Icon className={`w-8 h-8 mb-2 ${iconColor}`} />
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{title}</h3>
      <p className="text-2xl font-bold text-slate-100">{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center p-4 sm:p-6 font-sans text-slate-100 selection:bg-sky-500 selection:text-white">
      <header className="mb-6 sm:mb-8 text-center">
        <div className="flex items-center justify-center space-x-3 mb-1">
          <ChartBarIcon className="w-10 h-10 text-sky-400" />
          <h1 className="text-4xl sm:text-5xl font-bold text-sky-400 tracking-tight">Player Statistics</h1>
        </div>
      </header>

      <main className="bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-3xl space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <StatCard title="Games Played" value={stats.gamesPlayed} icon={ClockIcon} />
          <StatCard title="Wins" value={stats.wins} icon={TrophyIcon} iconColor="text-yellow-400"/>
          <StatCard title="Losses" value={stats.losses} icon={SadFaceIcon} iconColor="text-rose-400"/>
          <StatCard title="Win/Loss Ratio" value={winLossRatio} icon={ChartBarIcon} />
          <StatCard title="Mines Cleared" value={stats.totalMinesCleared} icon={MineIcon} iconColor="text-amber-400"/>
          <StatCard title="Current Coins" value={stats.coins} icon={CurrencyCoinIcon} iconColor="text-yellow-400"/>
          <StatCard title="Total Coins Earned" value={stats.totalCoinsEarned} icon={CurrencyCoinIcon} iconColor="text-yellow-500"/>
        </div>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-sky-300 mb-3 border-b border-slate-700 pb-2">Performance by Difficulty</h2>
          <div className="space-y-4">
            {DIFFICULTIES.map(diff => (
              <div key={diff.name} className="bg-slate-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-sky-400 mb-2">{diff.name}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <p><span className="font-medium text-slate-400">Fastest Time:</span> {highScores[diff.name] ? `${highScores[diff.name]}s` : 'N/A'}</p>
                  <p><span className="font-medium text-slate-400">Avg. Completion Time:</span> {calculateAverageTime(stats.averageCompletionTimes[diff.name])}</p>
                   <p><span className="font-medium text-slate-400">Wins on {diff.name}:</span> {stats.averageCompletionTimes[diff.name]?.gamesCompleted || 0}</p>
                </div>
              </div>
            ))}
          </div>
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
        Keep improving your stats!
      </footer>
    </div>
  );
};

export default StatisticsScreen;
