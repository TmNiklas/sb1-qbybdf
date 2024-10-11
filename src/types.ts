export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user';
}

export interface Server {
  id: number;
  name: string;
}

export interface Player {
  id: number;
  name: string;
}

export interface Ticket {
  id: number;
  userId: number;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'closed';
  createdAt: string;
  updatedAt: string;
}