import React, { useState } from 'react';
import { Ticket } from '../types';
import { PlusCircle } from 'lucide-react';

interface TicketListProps {
  tickets: Ticket[];
  onCreateTicket: (title: string, description: string) => void;
}

const TicketList: React.FC<TicketListProps> = ({ tickets, onCreateTicket }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTicketTitle, setNewTicketTitle] = useState('');
  const [newTicketDescription, setNewTicketDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateTicket(newTicketTitle, newTicketDescription);
    setNewTicketTitle('');
    setNewTicketDescription('');
    setShowCreateForm(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Support Tickets</h2>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="text-blue-500 hover:text-blue-600"
        >
          <PlusCircle className="w-6 h-6" />
        </button>
      </div>
      {showCreateForm && (
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={newTicketTitle}
            onChange={(e) => setNewTicketTitle(e.target.value)}
            placeholder="Ticket Title"
            className="w-full px-3 py-2 border rounded-lg mb-2"
            required
          />
          <textarea
            value={newTicketDescription}
            onChange={(e) => setNewTicketDescription(e.target.value)}
            placeholder="Ticket Description"
            className="w-full px-3 py-2 border rounded-lg mb-2"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
            Create Ticket
          </button>
        </form>
      )}
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id} className="border-b py-2 last:border-b-0">
            <h3 className="font-semibold">{ticket.title}</h3>
            <p className="text-sm text-gray-600">{ticket.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;