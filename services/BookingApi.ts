// services/bookingApi.ts
import NetInfo from '@react-native-community/netinfo'
import axios from 'axios'
import Constants from 'expo-constants'
import { Platform } from 'react-native'

const API_BASE = process.env.EXPO_PUBLIC_API_BASE as string

console.log('API_BASE', API_BASE)

const resolveApiBase = (): string => {
  const raw = (API_BASE || '').trim()
  if (!raw) return ''

  try {
    const parsed = new URL(raw)
    const isLocalhost =
      parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1'

    if (!isLocalhost) return raw

    const expoHostUri = Constants.expoConfig?.hostUri
    const expoHost = expoHostUri?.split(':')[0]
    if (expoHost) {
      return `${parsed.protocol}//${expoHost}:${parsed.port || '5001'}`
    }

    // Android emulator cannot reach localhost on host machine.
    if (Platform.OS === 'android') {
      return `${parsed.protocol}//10.0.2.2:${parsed.port || '5001'}`
    }

    return raw
  } catch {
    return raw
  }
}

const RESOLVED_API_BASE = resolveApiBase()

console.log('RESOLVED_API_BASE', RESOLVED_API_BASE)

export const api = axios.create({
  baseURL: RESOLVED_API_BASE,
  timeout: 15000,
})

// Network connectivity check utility
export const checkNetworkConnection = async (): Promise<boolean> => {
  try {
    const state = await NetInfo.fetch()
    return state.isConnected ?? false
  } catch (error) {
    console.error('Error checking network connection:', error)
    return false
  }
}

export const createBooking = async (payload: any) => {
  try {
    console.log('payload BookingApi.ts', payload)
    if (!RESOLVED_API_BASE) {
      throw new Error(
        'API base URL is missing. Set EXPO_PUBLIC_API_BASE in your .env file.'
      )
    }

    // Check network connectivity first
    const isConnected = await checkNetworkConnection()

    if (!isConnected) {
      throw new Error(
        'No internet connection. Please check your network settings and try again.'
      )
    }
    console.log('booking request url', `${RESOLVED_API_BASE}/api/v1/booking/create-booking`)
    const response = await api.post('/api/v1/booking/create-booking', payload)
    return response
  } catch (error: any) {
    if (error?.message?.includes('No internet connection')) {
      // Re-throw the network error with user-friendly message
      console.log('error No Internet', error)
      throw new Error(
        'No internet connection. Please check your network settings and try again.'
      )
    }

    if (
      error?.code === 'ECONNABORTED' ||
      error?.message?.includes('timeout')
    ) {
      console.log('error timeout', error)
      throw new Error(
        'Request timeout. Please check your internet connection and try again.'
      )
    }

    if (error.response) {
      console.log('error response', error)
      // Server responded with error status
      const apiMessage = error.response.data?.message
      const firstValidationMessage = error.response.data?.errorSource?.[0]?.message
      throw new Error(
        firstValidationMessage || apiMessage || 'Server error occurred'
      )
    } else if (error.request) {
      console.log('error Server error', {
        message: error?.message,
        code: error?.code,
        url: error?.config?.url,
        baseURL: error?.config?.baseURL,
      })
      // Request was made but no response received
      throw new Error(
        'Network error. Please check your connection and try again.'
      )
    }

    console.log('error other', error)
    // Other errors
    throw new Error(error?.message || 'An unexpected error occurred. Please try again.')
  }
}

// Optional: Add retry mechanism with exponential backoff
export const createBookingWithRetry = async (payload: any, maxRetries = 3) => {
  let lastError

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await createBooking(payload)
    } catch (error: any) {
      lastError = error

      // Don't retry on certain errors
      if (
        error.message.includes('No internet connection') ||
        error.message.includes('Server error')
      ) {
        break
      }

      // Wait before retrying (exponential backoff)
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000 // 2s, 4s, 8s, etc.
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }
  }

  throw lastError
}
