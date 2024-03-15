import { CellValue } from '../App';

type GameOverProps = {
  winner: CellValue;
};

function GameOver({ winner }: GameOverProps) {
  return (
    <div id='game-over'>
      <h2>Game Over!</h2>
      {winner && <p>{winner} won!</p>}
      {!winner && <p>It's a draw!</p>}
      <p>
        <button>Rematch!</button>
      </p>
    </div>
  );
}

export default GameOver;
