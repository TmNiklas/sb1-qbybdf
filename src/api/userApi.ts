import axios from 'axios';
import { User } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

export const loginUser = async (username: string, password: string): Promise<User> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
    return response.data;
  } catch (error) {
    throw new Error('Invalid username or password');
  }
};

export const registerUser = async (username: string, password: string, email: string): Promise<User> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, { username, password, email });
    return response.data;
  } catch (error) {
    throw new Error('Registration failed');
  }
};

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

export const updateUserRole = async (userId: number, newRole: 'user' | 'admin'): Promise<User> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/users/${userId}/role`, { role: newRole });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update user role');
  }
};