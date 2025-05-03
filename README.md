# Kitchen Design Tool

![Kitchen Design Tool](screen01.png)

## 🏠 Live Demo

Explore the live application at [kitchen-design-tool.windsurf.build](https://kitchen-design-tool.windsurf.build)

## 📋 Overview

Kitchen Design Tool is a comprehensive web application that helps homeowners, designers, and retailers visualize, plan, and configure kitchen spaces. The tool features an intuitive interface for designing kitchens with real-time 3D previews, material selection, and pricing calculations.

## ✨ Key Features

### User Management
- Multi-role authentication (homeowner, designer, retailer)
- User registration and login
- Password reset functionality
- Guest access options

### Project Management
- Save and load kitchen design projects
- Dashboard view of all projects
- Project deletion and editing

### Kitchen Design
- Interactive design canvas
- Cabinet library with various cabinet types
- Material selection for cabinet surfaces
- Hardware options for customization

### Visualization
- Real-time 3D preview of kitchen design
- Different viewpoints and perspectives
- Material and texture visualization

### Pricing & Planning
- Dynamic pricing based on selected components
- Cost breakdown by categories
- Budget planning features

### Marketing Pages
- Comprehensive features page
- Pricing plans with monthly/annual options
- Responsive landing page

## 🛠️ Technology Stack

### Frontend
- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: CSS modules with Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router v6

### Backend & Data
- **Database**: Supabase PostgreSQL
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **APIs**: Supabase REST API

### Deployment
- **Hosting**: Netlify
- **CI/CD**: Automatic deployment via Git

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.x or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd kitchen-tool
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   - Create a `.env` file in the root directory based on `.env.example`
   ```bash
   cp .env.example .env
   ```
   - Fill in your Supabase URL and anon key

4. Start the development server
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## 📂 Project Structure

```
/
├── public/              # Static files
├── src/
│   ├── components/      # Reusable React components
│   │   ├── auth/        # Authentication components
│   │   ├── common/      # Shared components
│   │   ├── configurator/# Kitchen configurator components
│   │   ├── layout/      # Layout components
│   │   └── projects/    # Project management components
│   ├── contexts/        # React context providers
│   ├── data/            # Static data (cabinets, materials, etc.)
│   ├── lib/             # Utility libraries
│   ├── pages/           # Page components
│   ├── styles/          # CSS styles
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── supabase/            # Supabase migrations and configurations
├── .env.example         # Example environment variables
├── netlify.toml         # Netlify configuration
└── package.json         # Project dependencies
```

## 🔐 Authentication & Database Setup

The application uses Supabase for authentication and database storage. To set up the database schema, run the following SQL commands in your Supabase SQL editor:

```sql
-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create user profiles table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role TEXT CHECK (role IN ('homeowner', 'designer', 'retailer')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  configuration JSONB NOT NULL,
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create security policies
CREATE POLICY "Users can insert their own profile" ON public.users FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can view their own profile" ON public.users FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.users FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can manage their own projects" ON public.projects FOR ALL TO authenticated USING (auth.uid() = user_id);
```

## 🖥️ Usage Guide

### User Registration
1. Navigate to the registration page
2. Enter your full name, email, and password
3. Select your role (homeowner, designer, or retailer)
4. Click "Create Account"

### Designing a Kitchen
1. From the dashboard, click "New Project"
2. Use the cabinet library to add cabinets to your design
3. Customize materials and hardware through the configurator toolbar
4. View the 3D preview to visualize your design
5. Check the pricing panel for cost estimates
6. Save your project by clicking "Save"

### Project Management
1. View all your projects on the dashboard
2. Click any project to continue editing
3. Delete projects using the delete button on the project card

## 🔄 Deployment

The application is configured for easy deployment on Netlify:

```bash
# Build the project
npm run build

# Deploy using Netlify CLI
npx netlify deploy --prod
```

Alternatively, connect your GitHub repository to Netlify for automatic deployments.

## 🚧 Future Enhancements

- Collaborative design features
- Export designs to CAD formats
- Augmented reality visualization
- Material and cabinet inventory integration
- Measurement tools and space planning
- Professional design consultation integration

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Kitchen imagery from [Unsplash](https://unsplash.com)
- UI component inspiration from [Tailwind UI](https://tailwindui.com)
- 3D rendering based on [Three.js](https://threejs.org)

---

Developed with ❤️ by Saman [saman@karomigiri.com]
