
import React from 'react';
import { BoardModel, GameStatus } from '../types';
import Cell from './Cell';

interface BoardProps {
  board: BoardModel;
  onCellClick: (row: number, col: number) => void;
  onCellContextMenu: (row: number, col: number, e: React.MouseEvent) => void;
  gameStatus: GameStatus;
}

const Board: React.FC<BoardProps> = ({ board, onCellClick, onCellContextMenu, gameStatus }) => {
  if (!board || board.length === 0) {
    return <div className="text-center p-4">Loading board...</div>;
  }

  const isGameOver = gameStatus === GameStatus.Lost || gameStatus === GameStatus.Won;

  return (
    <div 
        className="grid gap-0.5 bg-slate-600 p-1 shadow-lg rounded-md overflow-x-auto 
                   [&::-webkit-scrollbar]:h-2.5 
                   [&::-webkit-scrollbar-track]:bg-slate-700 
                   [&::-webkit-scrollbar-thumb]:bg-sky-600 
                   [&::-webkit-scrollbar-thumb]:rounded-full 
                   [&::-webkit-scrollbar-thumb:hover]:bg-sky-500"
        style={{ 
            gridTemplateColumns: `repeat(${board[0].length}, minmax(1.5rem, auto))`,
        }}
        role="grid"
        aria-label={`Minesweeper board with ${board.length} rows and ${board[0].length} columns`}
    >
      {board.map((row, rIndex) =>
        row.map((cell, cIndex) => (
          <Cell
            key={`${rIndex}-${cIndex}`}
            cellData={cell}
            onClick={() => (gameStatus === GameStatus.Playing || gameStatus === GameStatus.Ready) && !cell.isFlagged && !cell.isRevealed ? onCellClick(rIndex, cIndex) : undefined}
            onContextMenu={(e) => (gameStatus === GameStatus.Playing || gameStatus === GameStatus.Ready) && !cell.isRevealed ? onCellContextMenu(rIndex, cIndex, e) : undefined}
            isGameOver={isGameOver}
          />
        ))
      )}
    </div>
  );
};

export default Board;
