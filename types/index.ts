import { Database } from '@/types/supabase'
import type { SupabaseClient } from '@supabase/supabase-js'

export type Supabase = SupabaseClient<Database>
