
import { BoardModel, CellModel, DifficultyOption } from '../types';

export const createBoard = (rows: number, cols: number, mines: number): BoardModel => {
  let board: BoardModel = Array(rows)
    .fill(null)
    .map((_, r) =>
      Array(cols)
        .fill(null)
        .map((_, c) => ({
          x: c,
          y: r,
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          adjacentMines: 0,
        }))
    );

  // Place mines randomly
  let minesPlaced = 0;
  while (minesPlaced < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (!board[r][c].isMine) {
      board[r][c].isMine = true;
      minesPlaced++;
    }
  }

  // Calculate adjacent mines
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c].isMine) continue;
      let mineCount = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].isMine) {
            mineCount++;
          }
        }
      }
      board[r][c].adjacentMines = mineCount;
    }
  }
  return board;
};

export const revealCell = (
  board: BoardModel,
  row: number,
  col: number
): { newBoard: BoardModel; gameOver: boolean; cellsRevealedDelta: number } => {
  const newBoard = board.map(r => r.map(c => ({ ...c })));
  const cell = newBoard[row][col];

  // This function should ideally not be called if cell is already revealed or flagged.
  // The calling logic (e.g. in useMinesweeper) should prevent this.
  // However, if it is, we return 0 delta.
  if (cell.isRevealed || cell.isFlagged) {
    return { newBoard, gameOver: false, cellsRevealedDelta: 0 };
  }

  cell.isRevealed = true;
  let cellsRevealedDelta = 1; // Count the current cell

  if (cell.isMine) {
    cell.isExploded = true; // Mark the clicked mine
    // Reveal all mines
    newBoard.forEach(r => r.forEach(c => {
      if (c.isMine) c.isRevealed = true;
    }));
    return { newBoard, gameOver: true, cellsRevealedDelta }; // Delta is 1 for the exploded mine
  }

  if (cell.adjacentMines === 0) {
    // Flood fill for empty cells
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const nr = row + dr;
        const nc = col + dc;
        if (
          nr >= 0 &&
          nr < newBoard.length &&
          nc >= 0 &&
          nc < newBoard[0].length &&
          !newBoard[nr][nc].isRevealed && // Crucially, only recurse on unrevealed
          !newBoard[nr][nc].isFlagged    // and unflagged cells
        ) {
          // Important: Pass the current state of newBoard for recursive calls
          // to ensure modifications are chained correctly.
          const result = revealCell(newBoard, nr, nc);
          
          // Update the board state from the recursive call.
          // This direct assignment is okay because newBoard is a deep copy at this function's scope.
          // The recursive call works on its own copy and returns it.
          // We need to make sure we are using the board that was modified by the recursive call.
          // The simplest way is to re-assign the whole board from the result.
          // However, revealCell already modifies `newBoard` by reference if we pass it.
          // The main issue is `cellsRevealedDelta`. We need to accumulate it.

          // The current newBoard already reflects changes from deeper in the recursion
          // because objects are passed by reference-value.
          // If revealCell returned the modified cell or board portion, we'd merge.
          // Since revealCell itself modifies the `newBoard` it receives (or a copy of it from its caller's perspective),
          // we just need to aggregate `cellsRevealedDelta`.
          // Let's re-verify how the `newBoard` is being passed and mutated.
          // Each call to `revealCell` creates `const newBoard = board.map(...)`.
          // So, changes made in a recursive call are on a *copy* of the board from *that* call's perspective.
          // They are not directly reflected in the `newBoard` of the caller unless explicitly merged.

          // Correct approach: The `newBoard` from the recursive call IS the most up-to-date version.
          // We need to ensure the caller (`this` function scope) uses this updated board for subsequent iterations.
          // And accumulate cellsRevealedDelta.
          
          // Simple way to update board state from recursion:
          // `newBoard` is already a copy. The recursive `revealCell` works on its *own* copy.
          // We need to merge the changes from `result.newBoard` back into `this.newBoard`.
          // The most straightforward (though not most performant for huge boards) is to replace:
          // `newBoard = result.newBoard;` // This would lose parallel flood-fills.

          // The original loop through newBoard should be sufficient if newBoard[nr][nc] is updated.
          // Let's trace:
          // 1. `revealCell(board, r, c)` -> `newBoard1` (copy of `board`)
          // 2. Loop -> `revealCell(newBoard1, nr, nc)` -> `newBoard2` (copy of `newBoard1`)
          //    `newBoard2` is modified. `result.newBoard` is `newBoard2`.
          // 3. `cellsRevealedDelta += result.cellsRevealedDelta`
          // The `newBoard1` in the outer call is NOT `newBoard2`.
          // We MUST merge changes from `result.newBoard` back into the current scope's `newBoard`.
          // The previous nested loop for copying was trying to do this but could be simplified.

          // If `newBoard[nr][nc]` was modified by `result.newBoard`, and `newBoard` refers to the same object graph, it works.
          // The issue: `const newBoard = board.map(...)` creates a shallow copy of rows, and shallow copy of cells.
          // Let's ensure deep copy propagation or selective updates.

          // Simplest strategy that works for the recursive updates:
          // The `revealCell` function should operate on the board passed to it and return the modified board.
          // The caller then uses this returned board for its subsequent operations.

          // Correct accumulation of delta:
          cellsRevealedDelta += result.cellsRevealedDelta;
          // Correct board update from recursive call:
          // The `newBoard` in *this* scope must be updated with `result.newBoard`
          // for subsequent iterations of the loop to see the changes.
          // This is critical for the flood fill to propagate correctly across the grid.
          // Overwrite the current newBoard with the one returned from the recursive call.
          // This ensures that each step of the flood fill operates on the latest state.
          // This is not the most performant way if we were to optimize memory,
          // but it's correct for state propagation in this recursive algorithm.
          for(let i=0; i<newBoard.length; i++) {
            for(let j=0; j<newBoard[0].length; j++) {
                // Only update cells that the recursive call might have changed
                // (i.e., the ones it processed).
                // The `result.newBoard` contains the fully updated state from that branch.
                // We need to "merge" `result.newBoard` into our current `newBoard`.
                // The easiest correct way is to take `result.newBoard` as the new state.
                 if (result.newBoard[i][j].isRevealed && !newBoard[i][j].isRevealed) {
                     newBoard[i][j] = result.newBoard[i][j];
                 } else if (result.newBoard[i][j].isFlagged !== newBoard[i][j].isFlagged) {
                     newBoard[i][j].isFlagged = result.newBoard[i][j].isFlagged; // Though flagging isn't part of reveal
                 }
            }
          }
          // A more robust way: just use the board returned by the recursive call for subsequent operations within the loop.
          // However, the loop iterates based on the original dimensions, and `revealCell` is called for neighbors.
          // The `newBoard` variable in the current scope is what gets modified.
          // The `newBoard[nr][nc].isRevealed` check correctly prevents re-processing.
          // The original simple accumulation of `cellsRevealedDelta` and modification of `newBoard` *within* the
          // `revealCell` function (since it's a copy for that call stack) is standard for flood fill.
          // The key is that `newBoard[nr][nc].isRevealed` is checked *before* the recursive call.
        }
      }
    }
  }
  return { newBoard, gameOver: false, cellsRevealedDelta };
};


export const toggleFlag = (
  board: BoardModel,
  row: number,
  col: number
): { newBoard: BoardModel, flagAdded: boolean } => {
  const newBoard = board.map(r => r.map(c => ({ ...c })));
  const cell = newBoard[row][col];
  let flagAdded = false;

  if (!cell.isRevealed) {
    cell.isFlagged = !cell.isFlagged;
    flagAdded = cell.isFlagged;
  }
  return { newBoard, flagAdded };
};

export const checkWinCondition = (board: BoardModel, totalMines: number): boolean => {
  let revealedNonMines = 0;
  // let correctlyFlaggedMines = 0; // Not strictly needed for win if checking revealedNonMines
  const rows = board.length;
  const cols = board[0].length;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = board[r][c];
      if (cell.isRevealed && !cell.isMine) {
        revealedNonMines++;
      }
      // if (cell.isFlagged && cell.isMine) { // This is for an alternative win condition or scoring
      //   correctlyFlaggedMines++;
      // }
    }
  }
  // Win if all non-mine cells are revealed
  const totalNonMineCells = rows * cols - totalMines;
  return revealedNonMines === totalNonMineCells;
};
