import React from 'react';
import { Server } from 'lucide-react';

interface ServerStatusProps {
  status: string;
}

const ServerStatus: React.FC<ServerStatusProps> = ({ status }) => {
  return (
    <div className="flex items-center mb-6">
      <Server className="w-8 h-8 mr-2 text-blue-500" />
      <h2 className="text-2xl font-semibold">Server Status:</h2>
      <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
        status === 'online' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {status.toUpperCase()}
      </span>
    </div>
  );
};

export default ServerStatus;