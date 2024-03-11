import { type CellValue } from '../App';
import { type Turn } from '../App';

type GameBoardProps = {
  onSelectSquare: (rowIndex: number, colIndex: number) => void;
  turns: Turn[];
};

const initialGameBoard: CellValue[][] = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function GameBoard({ onSelectSquare, turns }: GameBoardProps) {
  const gameBoard = initialGameBoard;

  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  //   const [gameBoard, setGameBoard] = useState<CellValue[][]>(initialGameBoard);

  //   function handleSelectSquare(rowIndex: number, colIndex: number) {
  //     setGameBoard((prevGameBoard) => {
  //       const updatedBoard = [
  //         ...prevGameBoard.map((innerArray) => [...innerArray]),
  //       ];
  //       console.log(updatedBoard);
  //       updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
  //       return updatedBoard;
  //     });

  //     onSelectSquare();
  //   }
  return (
    <ol id='game-board'>
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)}>
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
