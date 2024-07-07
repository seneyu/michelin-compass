import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// console.log('Supabase URL:', supabaseUrl);
// console.log('Supabase Key:', supabaseKey);

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
