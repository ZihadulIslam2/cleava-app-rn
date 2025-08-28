// services/bookingApi.ts
import axios from "axios";
import NetInfo from '@react-native-community/netinfo';

const API_BASE = (process.env.EXPO_PUBLIC_API_BASE ||
  "http://localhost:5001") as string;

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
});

// Network connectivity check utility
export const checkNetworkConnection = async (): Promise<boolean> => {
  try {
    const state = await NetInfo.fetch();
    return state.isConnected ?? false;
  } catch (error) {
    console.error('Error checking network connection:', error);
    return false;
  }
};

export const createBooking = async (payload: any) => {
  try {
    // Check network connectivity first
    const isConnected = await checkNetworkConnection();
    
    if (!isConnected) {
      throw new Error('No internet connection. Please check your network settings and try again.');
    }

    const response = await api.post("/api/v1/booking/create-booking", payload);
    return response;
  } catch (error: any) {
    if (error.message.includes('No internet connection')) {
      // Re-throw the network error with user-friendly message
      throw new Error('No internet connection. Please check your network settings and try again.');
    }
    
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      throw new Error('Request timeout. Please check your internet connection and try again.');
    }
    
    if (error.response) {
      // Server responded with error status
      throw new Error(error.response.data?.message || 'Server error occurred');
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Network error. Please check your connection and try again.');
    }
    
    // Other errors
    throw new Error('An unexpected error occurred. Please try again.');
  }
};

// Optional: Add retry mechanism with exponential backoff
export const createBookingWithRetry = async (payload: any, maxRetries = 3) => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await createBooking(payload);
    } catch (error: any) {
      lastError = error;
      
      // Don't retry on certain errors
      if (error.message.includes('No internet connection') || 
          error.message.includes('Server error')) {
        break;
      }
      
      // Wait before retrying (exponential backoff)
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s, etc.
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
};