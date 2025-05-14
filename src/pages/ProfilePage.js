import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabase } from '../context/SupabaseContext';
import Avatar from '../components/Avatar';

const ProfilePage = () => {
  const { user, signOut, updateWalletAddresses, supabase } = useSupabase(); // ✅ Hook at top level
  const navigate = useNavigate();

  const [evmWallet, setEvmWallet] = useState('');
  const [phantomWallet, setPhantomWallet] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      const loadUserData = async () => {
        try {
          const { data, error } = await supabase
            .from('users')
            .select('evm_wallet_address, phantom_wallet_address')
            .eq('id', user.id)
            .single();

          if (error) throw error;

          if (data) {
            setEvmWallet(data.evm_wallet_address || '');
            setPhantomWallet(data.phantom_wallet_address || '');
          }
        } catch (error) {
          console.error('Error loading user data:', error.message);
        }
      };

      loadUserData();
    }
  }, [user, navigate, supabase]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const result = await updateWalletAddresses(evmWallet, phantomWallet);

      if (result.success) {
        setMessage({ text: 'Wallet addresses updated successfully!', type: 'success' });
      } else {
        throw new Error(result.error || 'Failed to update wallet addresses');
      }
    } catch (error) {
      setMessage({ text: error.message, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Your Profile</h1>
          {user && (
            <div className="mt-2 flex flex-col items-center">
              <div className="mb-4">
                <Avatar
                  src={user.user_metadata?.profile_image_url || null}
                  alt={user.user_metadata?.name || 'User'}
                  size="xl"
                  status="online"
                />
              </div>
              <p className="text-gray-700 font-semibold text-xl">{user.user_metadata?.name || 'Twitter User'}</p>
              <p className="text-gray-500 text-sm">@{user.user_metadata?.screen_name || 'twitter_handle'}</p>
              <div className="mt-4 bg-gradient-to-r from-primary-100 to-secondary-100 px-6 py-3 rounded-2xl shadow-cartoon-sm inline-block">
                <p className="font-semibold flex items-center">
                  <span className="bg-gradient-to-r from-primary-600 to-secondary-600 text-transparent bg-clip-text font-bold mr-2">$PLUM:</span>
                  <span className="text-gray-800">100</span>
                </p>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h3 className="block text-gray-700 text-sm font-bold mb-2">
              Connect Your Wallets
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Connect your wallets to receive $PLUM tokens and make connections.
            </p>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="evmWallet">
                EVM Wallet Address
              </label>
              <div className="flex">
                <input
                  id="evmWallet"
                  type="text"
                  value={evmWallet}
                  onChange={(e) => setEvmWallet(e.target.value)}
                  className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="0x..."
                />
                <button
                  type="button"
                  onClick={() =>
                    window.ethereum &&
                    window.ethereum
                      .request({ method: 'eth_requestAccounts' })
                      .then((accounts) => setEvmWallet(accounts[0]))
                  }
                  className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-semibold py-2 px-4 rounded-r"
                >
                  Connect
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phantomWallet">
                Phantom Wallet Address
              </label>
              <div className="flex">
                <input
                  id="phantomWallet"
                  type="text"
                  value={phantomWallet}
                  onChange={(e) => setPhantomWallet(e.target.value)}
                  className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Phantom wallet address..."
                />
                <button
                  type="button"
                  onClick={() =>
                    window.solana &&
                    window.solana
                      .connect()
                      .then((resp) => setPhantomWallet(resp.publicKey.toString()))
                  }
                  className="bg-purple-100 hover:bg-purple-200 text-purple-700 font-semibold py-2 px-4 rounded-r"
                >
                  Connect
                </button>
              </div>
            </div>
          </div>

          {message.text && (
            <div
              className={`p-4 mb-6 rounded-md ${message.type === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
                }`}
            >
              {message.text}
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={signOut}
              className="inline-block align-baseline font-bold text-sm text-indigo-600 hover:text-indigo-800"
            >
              Sign Out
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
