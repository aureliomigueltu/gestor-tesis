import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Read from Vite environment variables (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY)
const envObj = (import.meta as any).env || {};
const envUrl = envObj.VITE_SUPABASE_URL || '';
const envKey = envObj.VITE_SUPABASE_ANON_KEY || '';

// Fallback to localStorage if previously configured
const storedUrl = typeof window !== 'undefined' ? localStorage.getItem('supabase_custom_url') || '' : '';
const storedKey = typeof window !== 'undefined' ? localStorage.getItem('supabase_custom_anon_key') || '' : '';

export const SUPABASE_URL = (envUrl || storedUrl).trim();
export const SUPABASE_ANON_KEY = (envKey || storedKey).trim();

export const isSupabaseConfigured = (): boolean => {
  return (
    Boolean(SUPABASE_URL) && 
    Boolean(SUPABASE_ANON_KEY) && 
    SUPABASE_URL.startsWith('https://') &&
    SUPABASE_ANON_KEY.length > 20
  );
};

// Create a single supabase client instance if configured
let clientInstance: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient | null => {
  if (!isSupabaseConfigured()) {
    return null;
  }
  if (!clientInstance) {
    try {
      clientInstance = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
        realtime: {
          params: {
            eventsPerSecond: 10,
          },
        },
      });
    } catch (err) {
      console.error('Error initializing Supabase client:', err);
      return null;
    }
  }
  return clientInstance;
};

export const resetSupabaseClient = () => {
  clientInstance = null;
};
