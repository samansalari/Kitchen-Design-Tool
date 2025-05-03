import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthError } from '@supabase/supabase-js';
import { PostgrestError } from '@supabase/postgrest-js';
import { supabase } from '../lib/supabase';

// Custom error type that can handle both auth and database errors
type AppError = AuthError | PostgrestError | Error | null;

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUp: (email: string, password: string, fullName: string, role: string) => Promise<{ error: AppError }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting login with email:', email);
      
      // Try to sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Login error:', error);
        
        // Provide more helpful error messages
        if (error.message === 'Invalid login credentials') {
          console.log('Invalid credentials - either email or password is incorrect');
        }
      } else {
        console.log('Login successful:', data.user?.id);
      }
      
      return { error };
    } catch (err) {
      console.error('Unexpected login error:', err);
      return { error: err as AuthError };
    }
  };

  const signUp = async (email: string, password: string, fullName: string, role: string) => {
    try {
      // Create the user with Supabase Auth only
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role,
          },
          // Redirect to our auth callback route after email confirmation
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) {
        console.error('Authentication error:', error);
        return { error };
      }
      
      // Successful signup
      console.log('User registration successful');
      
      // Auto-login after signup successful
      if (data?.user) {
        console.log('Auto-login after signup');
        await supabase.auth.signInWithPassword({
          email,
          password,
        });
      }
      
      return { error: null as AppError };
    } catch (err) {
      console.error('Signup process error:', err);
      return { error: err as AuthError };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { error };
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};