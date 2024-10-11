import axios from 'axios';
import { Server } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

const handleApiError = (error: any) => {
  if (error.response) {
    console.error('API Error:', error.response.data);
    return { error: 'Server error', details: error.response.data };
  } else if (error.request) {
    console.error('Network Error:', error.request);
    return { error: 'Network error', details: 'Unable to connect to the server' };
  } else {
    console.error('Error:', error.message);
    return { error: 'Unknown error', details: error.message };
  }
};

export const getServers = async (): Promise<Server[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/servers`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getServerStatus = async (serverId: number): Promise<string> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/servers/${serverId}/status`);
    return response.data.status;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getPlayers = async (serverId: number): Promise<any[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/servers/${serverId}/players`);
    return response.data.players;
  } catch (error) {
    return handleApiError(error);
  }
};

export const startServer = async (serverId: number): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/servers/${serverId}/start`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const stopServer = async (serverId: number): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/servers/${serverId}/stop`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const restartServer = async (serverId: number): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/servers/${serverId}/restart`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};