import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import ServerList from './ServerList';
import ServerDetails from './ServerDetails';
import TicketList from './TicketList';
import { getServers } from '../api/serverApi';
import { getTicketsByUser, createTicket } from '../api/ticketApi';
import { Server, Ticket } from '../types';

const Dashboard: React.FC = () => {
  const { user } = useContext(UserContext);
  const [servers, setServers] = useState<Server[]>([]);
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    fetchServers();
    fetchTickets();
  }, [user]);

  const fetchServers = async () => {
    const fetchedServers = await getServers();
    setServers(fetchedServers);
    if (fetchedServers.length > 0) {
      setSelectedServer(fetchedServers[0]);
    }
  };

  const fetchTickets = async () => {
    if (user) {
      const fetchedTickets = await getTicketsByUser(user.id);
      setTickets(fetchedTickets);
    }
  };

  const handleCreateTicket = async (title: string, description: string) => {
    if (user) {
      await createTicket(user.id, title, description);
      fetchTickets();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Minecraft Server Dashboard</h1>
      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/4 px-2 mb-4">
          <ServerList
            servers={servers}
            selectedServer={selectedServer}
            onSelectServer={setSelectedServer}
          />
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
          {selectedServer && (
            <ServerDetails
              server={selectedServer}
              isAdmin={user?.role === 'admin'}
              onServerUpdate={(updatedServer) => {
                setServers(servers.map(s => s.id === updatedServer.id ? updatedServer : s));
                setSelectedServer(updatedServer);
              }}
            />
          )}
        </div>
        <div className="w-full md:w-1/4 px-2 mb-4">
          <TicketList
            tickets={tickets}
            onCreateTicket={handleCreateTicket}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;