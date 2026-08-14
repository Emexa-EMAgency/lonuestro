import { createClient } from '@supabase/supabase-js';

// Hostinger inyecta automáticamente las variables de entorno de Supabase al conectar.
// Usamos NEXT_PUBLIC_ por si necesitamos acceder desde componentes del lado del cliente,
// o caemos en las estándar de Hostinger.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn('¡Aviso!: Faltan las credenciales de Supabase en las variables de entorno.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
