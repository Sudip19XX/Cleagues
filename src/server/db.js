import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables if running in Node.js context (like Express)
if (typeof process !== 'undefined' && process.env) {
    dotenv.config();
}

const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase credentials not found. Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.');
}

// Fallback to placeholder values to prevent build-time crashes
// when this file is imported by vite.config.js via api.js
const url = supabaseUrl || 'https://placeholder.supabase.co';
const key = supabaseKey || 'placeholder-key';

export const supabase = createClient(url, key);
