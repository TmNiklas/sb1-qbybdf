import axios from 'axios';
import { Ticket } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

export const getTickets = async (): Promise<Ticket[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tickets`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch tickets');
  }
};

export const getTicketsByUser = async (userId: number): Promise<Ticket[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}/tickets`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user tickets');
  }
};

export const createTicket = async (userId: number, title: string, description: string): Promise<Ticket> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tickets`, { userId, title, description });
    return response.data;
  } catch (error) {
    throw new Error('Failed to create ticket');
  }
};

export const updateTicketStatus = async (ticketId: number, newStatus: string): Promise<Ticket> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/tickets/${ticketId}/status`, { status: newStatus });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update ticket status');
  }
};