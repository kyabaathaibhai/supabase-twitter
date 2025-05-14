import { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const siteUrl = process.env.REACT_APP_SITE_URL || 'https://supabase-twitter-ruby.vercel.app';

// Use actual values to ensure it works in production
const supabase = createClient(
  supabaseUrl || 'https://ibtaasxzfehegiuuyxkg.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlidGFhc3h6ZmVoZWdpdXV5eGtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMDgxMTYsImV4cCI6MjA2Mjc4NDExNn0.NHHIU3mDKRR26Pv1QolnMFiMk3LOTQKkEOe-2eIy_m4'
);

const SupabaseContext = createContext();

export function useSupabase() {
  return useContext(SupabaseContext);
}

export function SupabaseProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for active session on load
    const session = supabase.auth.getSession();

    setUser(session?.user || null);
    setLoading(false);

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Twitter sign-in function
  const signInWithTwitter = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'twitter',
        options: {
          redirectTo: siteUrl,
          scopes: 'tweet.read users.read',
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in with Twitter:', error.message);
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  // Update wallet addresses
  const updateWalletAddresses = async (evmAddress, phantomAddress) => {
    try {
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('users')
        .update({
          evm_wallet_address: evmAddress,
          phantom_wallet_address: phantomAddress
        })
        .eq('id', user.id);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error updating wallet addresses:', error.message);
      return { success: false, error: error.message };
    }
  };

  const value = {
    supabase,
    user,
    loading,
    signInWithTwitter,
    signOut,
    updateWalletAddresses,
  };

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
}
