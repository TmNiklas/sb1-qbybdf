import React, { useState, useEffect } from 'react';
import { Server } from '../types';
import ServerStatus from './ServerStatus';
import PlayerList from './PlayerList';
import ServerControls from './ServerControls';
import { getServerStatus, getPlayers } from '../api/serverApi';

interface ServerDetailsProps {
  server: Server;
  isAdmin: boolean;
  onServerUpdate: (updatedServer: Server) => void;
}

const ServerDetails: React.FC<ServerDetailsProps> = ({ server, isAdmin, onServerUpdate }) => {
  const [status, setStatus] = useState('offline');
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);

  const fetchServerData = async () => {
    try {
      const fetchedStatus = await getServerStatus(server.id);
      if (fetchedStatus.error) {
        setError(fetchedStatus.error);
        setStatus('unknown');
      } else {
        setStatus(fetchedStatus);
        setError(null);
      }

      const fetchedPlayers = await getPlayers(server.id);
      if (fetchedPlayers.error) {
        setError(fetchedPlayers.error);
        setPlayers([]);
      } else {
        setPlayers(fetchedPlayers);
        setError(null);
      }
    } catch (error) {
      console.error('Error fetching server data:', error);
      setError('Failed to fetch server data');
      setStatus('unknown');
      setPlayers([]);
    }
  };

  useEffect(() => {
    fetchServerData();
    const interval = setInterval(fetchServerData, 5000);
    return () => clearInterval(interval);
  }, [server]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">{server.name}</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      <ServerStatus status={status} />
      <PlayerList players={players} />
      {isAdmin && (
        <ServerControls
          serverId={server.id}
          onServerAction={fetchServerData}
          onServerUpdate={onServerUpdate}
        />
      )}
    </div>
  );
};

export default ServerDetails;