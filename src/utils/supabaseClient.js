import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rpdbsplwnyqjmcdujidp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwZGJzcGx3bnlxam1jZHVqaWRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NDc3NjMsImV4cCI6MjA2MTIyMzc2M30.5PphPCn-JZXPBNSI5jIMTgRHTtxFgjjxvwrWNl86Ybc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
