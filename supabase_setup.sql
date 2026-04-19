-- supabase_setup.sql

-- 1. Create the contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  message TEXT NOT NULL
);

-- 2. Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- 3. Create Policy: Allow anonymous users to insert data
CREATE POLICY "Allow anonymous insert" ON contacts
  FOR INSERT
  WITH CHECK (true);

-- (Optional) If you want ONLY inserts and strictly no selects, 
-- you don't need to add any SELECT policy here since RLS defaults to denying without a policy.
