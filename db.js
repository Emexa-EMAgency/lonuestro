const { createClient } = require('@supabase/supabase-js');

// Este archivo (db.js) está aquí para cumplir con la integración automática de Hostinger.
// El cliente principal que usa la app Next.js está en /src/lib/supabase.js
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = { supabase };
