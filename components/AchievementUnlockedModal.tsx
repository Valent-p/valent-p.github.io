
import React, { useState, useEffect } from 'react';
import { Achievement } from '../types';
import { StarIcon } from './Icons'; 
import Confetti from './Confetti';

interface AchievementUnlockedModalProps {
  achievements: Achievement[] | null; 
  onDismiss: () => void;
  isVisible: boolean; 
}

const AchievementUnlockedModal: React.FC<AchievementUnlockedModalProps> = ({ achievements, onDismiss, isVisible }) => {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isVisible && achievements && achievements.length > 0) { 
      setShowConfetti(true);
      setIsAnimatingOut(false); 
    } else if (!isVisible || !achievements || achievements.length === 0) { 
      if (!isAnimatingOut) { 
          setTimeout(() => setShowConfetti(false), 200); 
      }
    }
  }, [isVisible, achievements, isAnimatingOut]);


  if (!isVisible && !isAnimatingOut) return null;
  if (!achievements || achievements.length === 0) return null; 

  const animationClass = isAnimatingOut ? 'animate-modalHide' : 'animate-modalShow';

  const handleDismissClick = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      onDismiss();
    }, 180); 
  };
  
  const DefaultIcon: React.FC<{ className?: string }> = ({ className }) => <StarIcon className={className} />;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4" aria-modal="true" role="dialog">
      <Confetti active={showConfetti && isVisible && !isAnimatingOut && !!achievements && achievements.length > 0} />
      <div className={`bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl text-center max-w-md w-full relative ${animationClass}`}>
        <div className="flex justify-center mb-4 sm:mb-6">
           <StarIcon className="w-16 h-16 text-yellow-400 animate-pulse" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-yellow-400">
          Achievement{achievements.length > 1 ? 's' : ''} Unlocked!
        </h2>
        
        <div className="space-y-4 mb-6 max-h-[50vh] overflow-y-auto pr-2 
                        [&::-webkit-scrollbar]:w-1.5 
                        [&::-webkit-scrollbar-track]:bg-slate-600 
                        [&::-webkit-scrollbar-thumb]:bg-sky-500 
                        [&::-webkit-scrollbar-thumb]:rounded-full">
            {achievements.map((achievement) => {
                const IconComponent = achievement.icon || DefaultIcon;
                const isCoinAchievement = achievement.id.includes('COIN') || achievement.id.includes('WEALTHY') || achievement.id.includes('POCKET');
                return (
                    <div key={achievement.id} className="bg-slate-700 p-4 rounded-lg text-left flex items-center space-x-4">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${isCoinAchievement ? 'bg-yellow-500' : 'bg-sky-500'}`}>
                            <IconComponent className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h3 className={`text-lg font-semibold ${isCoinAchievement ? 'text-yellow-300' : 'text-sky-300'}`}>{achievement.name}</h3>
                            <p className="text-sm text-slate-300">{achievement.description}</p>
                        </div>
                    </div>
                );
            })}
        </div>
        
        <button
          onClick={handleDismissClick}
          className="w-full bg-sky-600 hover:bg-sky-500 text-white font-semibold py-3 px-6 rounded-lg text-base sm:text-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-opacity-75 focus:ring-sky-400"
        >
          Awesome!
        </button>
      </div>
    </div>
  );
};

export default AchievementUnlockedModal;
