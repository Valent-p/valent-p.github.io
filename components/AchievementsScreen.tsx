
import React, { useState, useEffect } from 'react';
import { AppView, PlayerAchievements, Achievement, AchievementID } from '../types';
import { storageService } from '../services/storageService';
import { ACHIEVEMENTS_CONFIG } from '../constants';
import { StarIcon, TrophyIcon, FlagIcon, MineIcon, CurrencyCoinIcon } from './Icons'; // Added CurrencyCoinIcon

interface AchievementsScreenProps {
  onNavigate: (view: AppView) => void;
}

const AchievementsScreen: React.FC<AchievementsScreenProps> = ({ onNavigate }) => {
  const [playerAchievements, setPlayerAchievements] = useState<PlayerAchievements>({});

  useEffect(() => {
    setPlayerAchievements(storageService.loadAchievements());
  }, []);

  const allAchievementDetails: Achievement[] = Object.values(ACHIEVEMENTS_CONFIG).map(config => {
    const playerData = playerAchievements[config.id];
    return {
      ...config,
      isUnlocked: playerData?.isUnlocked || false,
      unlockDate: playerData?.unlockDate,
    };
  });

  const unlockedCount = allAchievementDetails.filter(ach => ach.isUnlocked).length;
  const totalAchievements = allAchievementDetails.length;

  const DefaultIcon: React.FC<{ className?: string }> = ({ className }) => <StarIcon className={className} />;


  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center p-4 sm:p-6 font-sans text-slate-100 selection:bg-sky-500 selection:text-white">
      <header className="mb-6 sm:mb-8 text-center">
        <div className="flex items-center justify-center space-x-3 mb-1">
          <StarIcon className="w-10 h-10 text-yellow-400" />
          <h1 className="text-4xl sm:text-5xl font-bold text-sky-400 tracking-tight">Achievements</h1>
        </div>
        <p className="text-slate-400 text-sm">Unlocked: {unlockedCount} / {totalAchievements}</p>
      </header>

      <main className="bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-3xl space-y-6">
        {allAchievementDetails.length === 0 ? (
          <p className="text-center text-slate-400">No achievements configured yet.</p>
        ) : (
          <ul className="space-y-4">
            {allAchievementDetails.map((ach) => {
              const IconComponent = ach.icon || DefaultIcon;
              return (
                <li 
                  key={ach.id}
                  className={`p-4 rounded-lg flex items-start space-x-4 transition-all duration-300 ${
                    ach.isUnlocked ? 'bg-slate-700 shadow-md' : 'bg-slate-700 opacity-60'
                  }`}
                >
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${ach.isUnlocked ? (ach.id.includes('COIN') || ach.id.includes('WEALTHY') || ach.id.includes('POCKET') ? 'bg-yellow-500' : 'bg-sky-500') : 'bg-slate-600'}`}>
                    <IconComponent className={`w-7 h-7 ${ach.isUnlocked ? 'text-white' : 'text-slate-400'}`} />
                  </div>
                  <div className="flex-grow">
                    <h3 className={`text-lg font-semibold ${ach.isUnlocked ? (ach.id.includes('COIN') || ach.id.includes('WEALTHY') || ach.id.includes('POCKET') ? 'text-yellow-300' : 'text-sky-300') : 'text-slate-300'}`}>
                      {ach.name}
                    </h3>
                    <p className={`text-sm ${ach.isUnlocked ? 'text-slate-300' : 'text-slate-400'}`}>
                      {ach.description}
                    </p>
                    {ach.isUnlocked && ach.unlockDate && (
                      <p className="text-xs text-slate-500 mt-1">
                        Unlocked: {new Date(ach.unlockDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  {ach.isUnlocked && (
                     <StarIcon className="w-6 h-6 text-yellow-400 flex-shrink-0 opacity-90" title="Unlocked!" />
                  )}
                </li>
              );
            })}
          </ul>
        )}
        
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
        Unlock them all!
      </footer>
    </div>
  );
};

export default AchievementsScreen;
