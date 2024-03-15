import { useState } from 'react';
import GameBoard from './components/GameBoard';
import Player from './components/Player';
import Log from './components/Log';
// import { WINNING_COMBINATIONS } from './util/winning-combinations';
import GameOver from './components/GameOver';
import {
  Players,
  PLAYERS,
  Turn,
  deriveActivePlayer,
  deriveGameBoard,
  deriveWinner,
} from './util/helpers';

// interface Players {
//   X: string;
//   O: string;
// }

// const PLAYERS: Players = {
//   X: 'Player 1',
//   O: 'Player 2',
// };

// const INITIAL_GAMING_BOARD: CellValue[][] = [
//   [null, null, null],
//   [null, null, null],
//   [null, null, null],
// ];

// export type CellValue = 'X' | 'O' | null;

// export type Turn = {
//   square: {
//     row: number;
//     col: number;
//   };
//   player: CellValue;
// };

// function deriveActivePlayer(gameTurns: Turn[]): CellValue {
//   let currentPlayer: CellValue = 'X';

//   if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
//     currentPlayer = 'O';
//   }

//   return currentPlayer;
// }

// function deriveWinner(
//   gameBoard: CellValue[][],
//   players: Players
// ): string | null {
//   let winner: string | null = null;

//   for (const combination of WINNING_COMBINATIONS) {
//     const firstSquareSymbol =
//       gameBoard[combination[0].row][combination[0].column];

//     const secondSquareSymbol =
//       gameBoard[combination[1].row][combination[1].column];

//     const thirdSquareSymbol =
//       gameBoard[combination[2].row][combination[2].column];

//     if (
//       firstSquareSymbol &&
//       firstSquareSymbol === secondSquareSymbol &&
//       firstSquareSymbol === thirdSquareSymbol
//     ) {
//       winner = players[firstSquareSymbol];
//     }
//   }

//   return winner;
// }

// function deriveGameBoard(turns: Turn[]) {
//   const gameBoard = [...INITIAL_GAMING_BOARD.map((array) => [...array])];

//   for (const turn of turns) {
//     const { square, player } = turn;
//     const { row, col } = square;

//     gameBoard[row][col] = player;
//   }

//   return gameBoard;
// }

function App() {
  const [players, setPlayers] = useState<Players>(PLAYERS);
  const [gameTurns, setGameTurns] = useState<Turn[]>([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  // const gameBoard = initialGameBoard; // This is a bug as array are stored as reference values so we point to same array always
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex: number, colIndex: number) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        {
          square: {
            row: rowIndex,
            col: colIndex,
          },
          player: currentPlayer,
        },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol: 'X' | 'O', newName: string) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player
            initialName={PLAYERS.X}
            symbol='X'
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol='O'
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
