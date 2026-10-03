import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

// Content lives in the Bangla Tools Supabase project (org_ tables) and is
// edited there; this site only displays it. Every query is scoped to one
// organization, VITE_ORG_ID (the organization's IAM realm id).
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const ORG_ID: string = import.meta.env.VITE_ORG_ID;

if (!supabaseUrl || !supabaseAnonKey || !ORG_ID) {
  throw new Error('Missing VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY or VITE_ORG_ID');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

/** Public bucket for files (CVs from the job form go under `<org>/applications/`). */
export const ORG_BUCKET = 'org';
