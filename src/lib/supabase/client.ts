import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.SUPABASE_PROJECT_URL!,
    process.env.SUPABASE_PROJECT_PUBLISHABLE_KEY!
  )
}