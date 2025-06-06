
import React from 'react';
import { PowerUpID, PlayerPowerUpsState, PowerUp } from '../types';
import { POWER_UPS_CONFIG } from '../constants';
import { GameStatus } from '../types';
import { CurrencyCoinIcon } from './Icons'; // Import the coin icon

interface PowerUpControlsProps {
  powerUpsState: PlayerPowerUpsState;
  onActivatePowerUp: (id: PowerUpID) => void;
  gameStatus: GameStatus;
  isShieldActive: boolean;
  playerCoins: number; // Added
  onPurchasePowerUp: (id: PowerUpID) => void; // Added
}

const PowerUpControls: React.FC<PowerUpControlsProps> = ({ 
  powerUpsState, 
  onActivatePowerUp, 
  gameStatus,
  isShieldActive,
  playerCoins,
  onPurchasePowerUp,
}) => {
  const availablePowerUps = Object.values(POWER_UPS_CONFIG);

  if (availablePowerUps.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center justify-center space-x-2 my-3">
      {availablePowerUps.map((powerUp: PowerUp) => {
        const powerUpConfig = POWER_UPS_CONFIG[powerUp.id];
        const state = powerUpsState[powerUp.id];
        const isAvailable = state?.isAvailable || false;
        const isUsed = state?.usedInCurrentGame || false;
        const canAfford = playerCoins >= powerUpConfig.cost;

        let buttonContent: React.ReactNode;
        let buttonAction: () => void;
        let isDisabled: boolean;
        let title: string;
        let buttonClass = "p-2 rounded-lg text-white transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-opacity-75 flex flex-col items-center space-y-1 text-xs min-w-[70px] h-[60px] justify-center";

        if (!isAvailable) { // BUY MODE
          buttonContent = (
            <>
              <powerUp.icon className="w-5 h-5" />
              <span className="font-semibold flex items-center">
                {powerUpConfig.cost}
                <CurrencyCoinIcon className="inline-block w-3 h-3 ml-0.5 text-yellow-300" />
              </span>
            </>
          );
          buttonAction = () => onPurchasePowerUp(powerUp.id);
          // Can buy if game is Ready or Playing, and player can afford.
          isDisabled = !canAfford || !(gameStatus === GameStatus.Ready || gameStatus === GameStatus.Playing);
          title = isDisabled 
            ? (!canAfford ? `Not enough coins (Need ${powerUpConfig.cost})` : "Cannot buy now") 
            : `Buy ${powerUp.name} for ${powerUpConfig.cost} coins`;
          buttonClass += isDisabled ? " bg-slate-500 cursor-not-allowed opacity-60" : " bg-green-600 hover:bg-green-500 focus:ring-green-400";
        } else { // ACTIVATE MODE (already bought)
          buttonContent = <powerUp.icon className="w-5 h-5 sm:w-6 sm:h-6" />;
          buttonAction = () => onActivatePowerUp(powerUp.id);
          isDisabled = isUsed || gameStatus !== GameStatus.Playing || (powerUp.id === PowerUpID.SHIELD && isShieldActive);
          
          title = powerUp.description; // Default title
          if (isUsed) title = `${powerUp.name} already used this game`;
          if (powerUp.id === PowerUpID.SHIELD && isShieldActive && !isUsed) title = "Shield is currently active!";
          if (isDisabled && !isUsed && !(powerUp.id === PowerUpID.SHIELD && isShieldActive)) title = powerUp.disabledTooltip || title;


          buttonClass += isDisabled 
            ? " bg-slate-600 cursor-not-allowed opacity-50" 
            : (powerUp.id === PowerUpID.SHIELD ? " bg-sky-500 hover:bg-sky-400 focus:ring-sky-300" 
                                             : " bg-emerald-500 hover:bg-emerald-400 focus:ring-emerald-300");
          
          if (powerUp.id === PowerUpID.SHIELD && isShieldActive && !isUsed) {
              buttonClass = "p-2 rounded-lg text-white transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-opacity-75 flex flex-col items-center space-y-1 text-xs min-w-[70px] h-[60px] justify-center bg-sky-700 ring-2 ring-sky-400 animate-pulse";
          }
        }

        return (
          <button
            key={powerUp.id}
            onClick={buttonAction}
            disabled={isDisabled}
            className={buttonClass}
            title={title}
            aria-label={title}
          >
            {buttonContent}
          </button>
        );
      })}
    </div>
  );
};

export default PowerUpControls;