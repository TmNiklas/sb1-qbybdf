import React from 'react';
import { Server } from '../types';

interface ServerListProps {
  servers: Server[];
  selectedServer: Server | null;
  onSelectServer: (server: Server) => void;
}

const ServerList: React.FC<ServerListProps> = ({ servers, selectedServer, onSelectServer }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Servers</h2>
      <ul>
        {servers.map((server) => (
          <li
            key={server.id}
            className={`cursor-pointer p-2 rounded ${
              selectedServer?.id === server.id ? 'bg-blue-100' : 'hover:bg-gray-100'
            }`}
            onClick={() => onSelectServer(server)}
          >
            {server.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServerList;