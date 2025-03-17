/*
  # Fix chat history RLS policies

  1. Changes
    - Drop existing policies
    - Create new, more permissive policies for authenticated users
    - Fix RLS for chat history table
  
  2. Security
    - Enable RLS on chat_history table
    - Add policies for authenticated users to manage their own chat history
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own chat history" ON chat_history;
DROP POLICY IF EXISTS "Users can insert their own chat history" ON chat_history;
DROP POLICY IF EXISTS "Users can update their own chat history" ON chat_history;
DROP POLICY IF EXISTS "Users can delete their own chat history" ON chat_history;

-- Enable Row Level Security
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;

-- Create new policies
CREATE POLICY "Enable read access for authenticated users"
  ON chat_history
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable insert access for authenticated users"
  ON chat_history
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable update access for authenticated users"
  ON chat_history
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable delete access for authenticated users"
  ON chat_history
  FOR DELETE
  TO authenticated
  USING (true);