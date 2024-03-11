import { ChangeEvent, useState } from 'react';

type PlayerProps = {
  initialName: string;
  symbol: string;
  isActive: boolean;
};

function Player({ initialName, symbol, isActive }: PlayerProps) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing((editing) => !editing);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value);
  };

  let player = <span className='player-name'>{playerName}</span>;
  let btnCaption = 'Edit';

  if (isEditing) {
    player = (
      <input
        type='text'
        value={playerName}
        onChange={handleChange}
        required
      />
    );
    btnCaption = 'Save';
  }
  return (
    <li className={isActive ? 'active' : undefined}>
      <span className='player'>
        {player}
        <span className='player-symbol'>{symbol}</span>
      </span>
      <button onClick={handleEdit}>{btnCaption}</button>
    </li>
  );
}

export default Player;
