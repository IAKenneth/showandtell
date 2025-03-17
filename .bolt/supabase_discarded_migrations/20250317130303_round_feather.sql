/*
  # Fix chat history table and policies

  1. Changes
    - Drop existing policies to avoid conflicts
    - Recreate table if it doesn't exist
    - Set up proper RLS policies
  
  2. Security
    - Enable RLS on chat_history table
    - Add policies for authenticated users to manage their own chat history
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can view their own chat history" ON chat_history;
  DROP POLICY IF EXISTS "Users can insert their own chat history" ON chat_history;
  DROP POLICY IF EXISTS "Users can update their own chat history" ON chat_history;
  DROP POLICY IF EXISTS "Users can delete their own chat history" ON chat_history;
EXCEPTION
  WHEN undefined_object THEN
    NULL;
END $$;

-- Create or update the table
CREATE TABLE IF NOT EXISTS chat_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  messages jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;

-- Create new policies with unique names to avoid conflicts
CREATE POLICY "chat_history_select_policy" 
  ON chat_history
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = user_id);

CREATE POLICY "chat_history_insert_policy"
  ON chat_history
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "chat_history_update_policy"
  ON chat_history
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "chat_history_delete_policy"
  ON chat_history
  FOR DELETE
  TO authenticated
  USING (auth.uid()::text = user_id);