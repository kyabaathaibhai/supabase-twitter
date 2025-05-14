import { useState, useEffect, useCallback } from 'react';
import { useSupabase } from '../context/SupabaseContext';
import { userApi } from '../services/api';

/**
 * Custom hook for managing authentication and user state
 */
const useAuth = () => {
  const { user: supabaseUser, signInWithTwitter, signOut: supabaseSignOut } = useSupabase();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile data from the API
  const fetchUserProfile = useCallback(async () => {
    if (!supabaseUser) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const profile = await userApi.getCurrentUser();
      setUser(profile);
      setError(null);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [supabaseUser]);

  // Update wallet addresses
  const updateWalletAddresses = async (evmAddress, phantomAddress) => {
    try {
      setLoading(true);
      await userApi.updateWalletAddresses(evmAddress, phantomAddress);
      
      // Update local user state
      setUser(prev => ({
        ...prev,
        evm_wallet_address: evmAddress,
        phantom_wallet_address: phantomAddress
      }));
      
      return { success: true };
    } catch (error) {
      console.error('Error updating wallet addresses:', error);
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Sign out and clear user data
  const signOut = async () => {
    try {
      await supabaseSignOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      setError(error.message);
    }
  };

  // Fetch user profile when Supabase user changes
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return {
    user,
    loading,
    error,
    signInWithTwitter,
    signOut,
    updateWalletAddresses,
    refreshProfile: fetchUserProfile,
  };
};

export default useAuth;
