import { WINNING_COMBINATIONS } from './winning-combinations';

export interface Players {
  X: string;
  O: string;
}

export const PLAYERS: Players = {
  X: 'Player 1',
  O: 'Player 2',
};

export const INITIAL_GAMING_BOARD: CellValue[][] = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export type CellValue = 'X' | 'O' | null;

export type Turn = {
  square: {
    row: number;
    col: number;
  };
  player: CellValue;
};

export function deriveActivePlayer(gameTurns: Turn[]): CellValue {
  let currentPlayer: CellValue = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

export function deriveWinner(
  gameBoard: CellValue[][],
  players: Players
): string | null {
  let winner: string | null = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];

    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];

    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

export function deriveGameBoard(turns: Turn[]) {
  const gameBoard = [...INITIAL_GAMING_BOARD.map((array) => [...array])];

  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}
