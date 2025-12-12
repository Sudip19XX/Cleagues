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

export const supabase = createClient(supabaseUrl || '', supabaseKey || '');
