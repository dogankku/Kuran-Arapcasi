import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = url && key ? createClient(url, key) : null;
export const isConfigured = !!(url && key);

export interface DbProgress {
  id: string;
  progress: Record<string, unknown>;
  streak: Record<string, unknown>;
  updated_at: string;
}
