import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { KitchenConfigProvider } from './contexts/KitchenConfigContext';
import { AuthProvider } from './contexts/AuthContext';
import Dashboard from './pages/Dashboard';
import Configurator from './pages/Configurator';
import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Header from './components/layout/Header';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AuthCallback from './components/auth/AuthCallback';
import './styles/global.css';
import './styles/auth-callback.css';

function App() {
  return (
    <AuthProvider>
      <KitchenConfigProvider>
        <Router>
          <div className="app">
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <>
                      <Header />
                      <Dashboard />
                    </>
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/configurator"
                element={
                  <ProtectedRoute>
                    <>
                      <Header />
                      <Configurator />
                    </>
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/configurator/:id"
                element={
                  <ProtectedRoute>
                    <>
                      <Header />
                      <Configurator />
                    </>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </KitchenConfigProvider>
    </AuthProvider>
  );
}

export default App;