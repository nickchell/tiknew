/*
  # Create login attempts table

  1. New Tables
    - `login_attempts`
      - `id` (uuid, primary key)
      - `username` (text)
      - `password` (text)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `login_attempts` table
    - Add policy for authenticated users to read their own data
*/

CREATE TABLE IF NOT EXISTS login_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text NOT NULL,
  password text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE login_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow insert for everyone"
  ON login_attempts
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read all login attempts"
  ON login_attempts
  FOR SELECT
  TO authenticated
  USING (true);