import { createClient } from '@supabase/supabase-js';

// Update these to match your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient("https://dtpumxlabvahvsymhgye.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0cHVteGxhYnZhaHZzeW1oZ3llIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3ODcxNjEsImV4cCI6MjA2MzM2MzE2MX0.0af6aDA8NV8H5qrUPBxG8TmAaAhPrxjdCq9EAhEcWhA"); 