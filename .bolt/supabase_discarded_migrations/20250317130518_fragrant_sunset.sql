/*
  # Fix chat history table and policies

  1. Changes
    - Drop existing table and policies for clean slate
    - Recreate table with proper structure
    - Set up proper RLS policies
  
  2. Security
    - Enable RLS on chat_history table
    - Add policies for authenticated users to manage their own chat history
*/

-- Drop existing table and its policies
DROP TABLE IF EXISTS chat_history CASCADE;

-- Create the chat_history table
CREATE TABLE chat_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  messages jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
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

-- Create index for faster lookups
CREATE INDEX chat_history_user_id_idx ON chat_history(user_id);