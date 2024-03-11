import { useState } from 'react';

type CellValue = 'X' | 'O' | null;

const initialGameBoard: CellValue[][] = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function GameBoard() {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  function handleSelectSquare(rowIndex: number, colIndex: number) {
    setGameBoard((prevGameBoard) => {
      const updatedBoard = [
        ...prevGameBoard.map((innerArray) => [...innerArray]),
      ];
      console.log(updatedBoard);
      updatedBoard[rowIndex][colIndex] = 'X';
      return updatedBoard;
    });
  }
  return (
    <ol id='game-board'>
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}

export default GameBoard;
