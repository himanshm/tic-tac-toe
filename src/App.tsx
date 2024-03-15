import { useState } from 'react';
import GameBoard from './components/GameBoard';
import Player from './components/Player';
import Log from './components/Log';

export type CellValue = 'X' | 'O' | null;

export type Turn = {
  square: {
    row: number;
    col: number;
  };
  player: CellValue;
};

function App() {
  const [gameTurns, setGameTurns] = useState<Turn[]>([]);
  const [activePlayer, setActivePlayer] = useState<CellValue>('X');

  function handleSelectSquare(rowIndex: number, colIndex: number) {
    setActivePlayer((curActivePlayer) => (curActivePlayer === 'X' ? 'O' : 'X'));

    setGameTurns((prevTurns) => {
      let currentPlayer: CellValue = 'X';

      if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
        currentPlayer = 'O';
      }

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

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player
            initialName='Player1'
            symbol='X'
            isActive={activePlayer === 'X'}
          />
          <Player
            initialName='Player2'
            symbol='O'
            isActive={activePlayer === 'O'}
          />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
