import React from 'react';
import { Power } from 'lucide-react';
import { startServer, stopServer, restartServer } from '../api/serverApi';

interface ServerControlsProps {
  onServerAction: () => void;
}

const ServerControls: React.FC<ServerControlsProps> = ({ onServerAction }) => {
  const handleStartServer = async () => {
    try {
      await startServer();
      onServerAction();
    } catch (error) {
      console.error('Error starting server:', error);
    }
  };

  const handleStopServer = async () => {
    try {
      await stopServer();
      onServerAction();
    } catch (error) {
      console.error('Error stopping server:', error);
    }
  };

  const handleRestartServer = async () => {
    try {
      await restartServer();
      onServerAction();
    } catch (error) {
      console.error('Error restarting server:', error);
    }
  };

  return (
    <div>
      <div className="flex items-center mb-2">
        <Power className="w-6 h-6 mr-2 text-blue-500" />
        <h2 className="text-xl font-semibold">Server Controls</h2>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleStartServer}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Start
        </button>
        <button
          onClick={handleStopServer}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Stop
        </button>
        <button
          onClick={handleRestartServer}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default ServerControls;