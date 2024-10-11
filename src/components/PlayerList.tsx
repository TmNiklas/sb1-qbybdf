import React from 'react';
import { Users } from 'lucide-react';

interface Player {
  id: number;
  name: string;
}

interface PlayerListProps {
  players: Player[];
}

const PlayerList: React.FC<PlayerListProps> = ({ players }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <Users className="w-6 h-6 mr-2 text-blue-500" />
        <h2 className="text-xl font-semibold">Online Players</h2>
      </div>
      <ul className="bg-gray-50 rounded-lg p-3">
        {players.map((player) => (
          <li key={player.id} className="py-2 border-b last:border-b-0">
            {player.name}
          </li>
        ))}
        {players.length === 0 && (
          <li className="py-2 text-gray-500">No players online</li>
        )}
      </ul>
    </div>
  );
};

export default PlayerList;