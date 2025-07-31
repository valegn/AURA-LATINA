import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://pbsunpwldgnmzosqypkr.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBic3VucHdsZGdubXpvc3F5cGtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MjA0MjksImV4cCI6MjA2OTM5NjQyOX0.vV95pNWHtkqmce3BymNezz7wSyXb8q3hqQqjpO3Vc44';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Supabase environment variables not configured. Please set up your Supabase connection.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);