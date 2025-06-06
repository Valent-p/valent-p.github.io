
import React from 'react';
import { CellModel } from '../types';
import { CELL_COLORS } from '../constants';
import { FlagIcon, MineIcon, ShieldIcon } from './Icons'; // Added ShieldIcon

interface CellProps {
  cellData: CellModel;
  onClick: () => void;
  onContextMenu: (event: React.MouseEvent) => void;
  isGameOver: boolean;
}

const Cell: React.FC<CellProps> = ({ cellData, onClick, onContextMenu, isGameOver }) => {
  const { isRevealed, isMine, isFlagged, adjacentMines, isExploded, isShieldProtected } = cellData;

  let content: React.ReactNode = null;
  let cellClasses = 'w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 flex items-center justify-center font-bold border transition-all duration-150 ease-in-out';
  const iconBaseClasses = 'w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-5 lg:h-5'; 

  if (isRevealed) {
    cellClasses += ' bg-slate-700 border-slate-600';
    if (isMine) {
      if (isShieldProtected) {
        content = <ShieldIcon className={`text-sky-400 ${iconBaseClasses}`} title="Mine blocked by shield!" />;
        cellClasses += ' bg-sky-800 border-sky-700'; // Special background for shielded mine
      } else {
        content = <MineIcon className={`text-rose-500 ${iconBaseClasses} ${isExploded ? 'animate-ping' : ''}`} />;
        if(isExploded) cellClasses += ' bg-rose-600';
      }
    } else if (adjacentMines > 0) {
      content = <span className={`${CELL_COLORS[adjacentMines]} text-xs sm:text-sm md:text-base lg:text-lg`}>{adjacentMines}</span>;
    }
  } else { // Hidden cell
    cellClasses += ' bg-slate-800 border-slate-700 hover:bg-sky-700 cursor-pointer';
    if (isFlagged) {
      content = <FlagIcon className={`text-amber-400 animate-flag ${iconBaseClasses}`} />;
      cellClasses += ' bg-slate-700'; 
    }
    if(isGameOver && isMine && !isFlagged && !isShieldProtected){ // Don't show unflagged mine if it was shield-protected
        content = <MineIcon className={`text-slate-500 ${iconBaseClasses}`} />;
        cellClasses += ' bg-slate-700 border-slate-600'; 
    }
  }
  
  if (isRevealed && !isMine && !isFlagged && cellData.adjacentMines >= 0) {
    cellClasses += ' animate-reveal';
  }


  return (
    <div
      className={cellClasses}
      onClick={onClick}
      onContextMenu={onContextMenu}
      aria-label={
        isRevealed 
          ? (isMine ? (isShieldProtected ? "Mine (shielded)" : "Mine (exploded)") : `Cell with ${adjacentMines} adjacent mines`) 
          : (isFlagged ? "Flagged cell" : "Hidden cell")
      }
      role="button"
      tabIndex={isRevealed ? -1 : 0} // Make unrevealed cells focusable
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
    >
      {content}
    </div>
  );
};

export default React.memo(Cell);
