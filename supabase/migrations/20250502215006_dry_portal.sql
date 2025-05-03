/*
  # Initial Schema Setup for Kitchen Configuration Tool

  1. New Tables
    - `users` - Extended user profile data
    - `projects` - Kitchen design projects
    - `project_cabinets` - Cabinets placed in projects
    - `materials` - Available materials and finishes
    - `hardware` - Available hardware options

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for viewing shared projects
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text,
  role text CHECK (role IN ('homeowner', 'designer', 'retailer', 'admin')),
  company_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  name text NOT NULL,
  description text,
  room_dimensions jsonb,
  shared_with text[] DEFAULT '{}',
  is_template boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create project_cabinets table
CREATE TABLE IF NOT EXISTS project_cabinets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  cabinet_type text NOT NULL,
  name text NOT NULL,
  dimensions jsonb NOT NULL,
  position jsonb NOT NULL,
  material_id uuid,
  hardware_ids uuid[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create materials table
CREATE TABLE IF NOT EXISTS materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  finish text NOT NULL,
  color text,
  price_multiplier numeric(4,2) DEFAULT 1.00,
  image_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create hardware table
CREATE TABLE IF NOT EXISTS hardware (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  finish text NOT NULL,
  price numeric(10,2) NOT NULL,
  image_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_cabinets ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE hardware ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Projects policies
CREATE POLICY "Users can read own projects"
  ON projects
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id OR 
    auth.uid()::text = ANY(shared_with) OR
    is_template = true
  );

CREATE POLICY "Users can create projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects"
  ON projects
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Project cabinets policies
CREATE POLICY "Users can read project cabinets"
  ON project_cabinets
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_cabinets.project_id
      AND (
        projects.user_id = auth.uid() OR
        auth.uid()::text = ANY(projects.shared_with) OR
        projects.is_template = true
      )
    )
  );

CREATE POLICY "Users can manage project cabinets"
  ON project_cabinets
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_cabinets.project_id
      AND projects.user_id = auth.uid()
    )
  );

-- Materials policies
CREATE POLICY "Everyone can view active materials"
  ON materials
  FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Hardware policies
CREATE POLICY "Everyone can view active hardware"
  ON hardware
  FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS projects_user_id_idx ON projects(user_id);
CREATE INDEX IF NOT EXISTS project_cabinets_project_id_idx ON project_cabinets(project_id);
CREATE INDEX IF NOT EXISTS materials_type_idx ON materials(type) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS hardware_type_idx ON hardware(type) WHERE is_active = true;