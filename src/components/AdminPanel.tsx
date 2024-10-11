import React, { useState, useEffect } from 'react';
import { getTickets, updateTicketStatus } from '../api/ticketApi';
import { getUsers, updateUserRole } from '../api/userApi';
import { Ticket, User } from '../types';

const AdminPanel: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchTickets();
    fetchUsers();
  }, []);

  const fetchTickets = async () => {
    const fetchedTickets = await getTickets();
    setTickets(fetchedTickets);
  };

  const fetchUsers = async () => {
    const fetchedUsers = await getUsers();
    setUsers(fetchedUsers);
  };

  const handleTicketStatusUpdate = async (ticketId: number, newStatus: string) => {
    await updateTicketStatus(ticketId, newStatus);
    fetchTickets();
  };

  const handleUserRoleUpdate = async (userId: number, newRole: 'user' | 'admin') => {
    await updateUserRole(userId, newRole);
    fetchUsers();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Tickets</h2>
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="border-b">
                <td className="p-3">{ticket.id}</td>
                <td className="p-3">{ticket.title}</td>
                <td className="p-3">{ticket.status}</td>
                <td className="p-3">
                  <select
                    value={ticket.status}
                    onChange={(e) => handleTicketStatusUpdate(ticket.id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Username</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-3">{user.id}</td>
                <td className="p-3">{user.username}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">
                  <select
                    value={user.role}
                    onChange={(e) => handleUserRoleUpdate(user.id, e.target.value as 'user' | 'admin')}
                    className="border rounded px-2 py-1"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;