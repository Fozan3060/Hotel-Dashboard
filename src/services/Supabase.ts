
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://sblyvrfczozmwgqdqrvd.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNibHl2cmZjem96bXdncWRxcnZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5Njk2ODksImV4cCI6MjA1MjU0NTY4OX0.d4v4F30vMQ1dKpFVt5sTTv2k9W5wp4G19RBudlN76jQ"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase