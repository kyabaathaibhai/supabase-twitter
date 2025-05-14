import React, { useState } from 'react';
import { ethers } from 'ethers';
import LoadingSpinner from './LoadingSpinner';

const WalletConnect = ({ onWalletConnect, initialAddress = '' }) => {
  const [address, setAddress] = useState(initialAddress);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');

  const connectEVMWallet = async () => {
    setIsConnecting(true);
    setError('');
    
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed. Please install MetaMask to connect your wallet.');
      }

      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const address = accounts[0];
      
      // Validate address
      if (ethers.utils.isAddress(address)) {
        setAddress(address);
        onWalletConnect(address);
      } else {
        throw new Error('Invalid Ethereum address');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setError(error.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  // For Phantom wallet, we'd implement a similar function
  const connectPhantomWallet = async () => {
    setIsConnecting(true);
    setError('');
    
    try {
      // Check if Phantom is installed
      const { solana } = window;
      
      if (!solana?.isPhantom) {
        throw new Error('Phantom wallet is not installed. Please install Phantom to connect your wallet.');
      }

      // Connect to Phantom
      const response = await solana.connect();
      const address = response.publicKey.toString();
      
      setAddress(address);
      onWalletConnect(null, address); // null for EVM, address for Phantom
    } catch (error) {
      console.error('Error connecting Phantom wallet:', error);
      setError(error.message || 'Failed to connect Phantom wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
      <h3 className="text-lg font-semibold mb-3">Connect Wallet</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={connectEVMWallet}
          disabled={isConnecting}
          className="flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md transition-colors"
        >
          {isConnecting ? (
            <LoadingSpinner size="sm" color="gray" />
          ) : (
            <>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" 
                alt="MetaMask" 
                className="w-5 h-5" 
              />
              <span>Connect EVM Wallet</span>
            </>
          )}
        </button>
        
        <button
          onClick={connectPhantomWallet}
          disabled={isConnecting}
          className="flex items-center justify-center space-x-2 bg-purple-100 hover:bg-purple-200 text-purple-800 px-4 py-2 rounded-md transition-colors"
        >
          {isConnecting ? (
            <LoadingSpinner size="sm" color="gray" />
          ) : (
            <>
              <img 
                src="https://www.phantom.app/img/logo.png" 
                alt="Phantom" 
                className="w-5 h-5" 
              />
              <span>Connect Phantom Wallet</span>
            </>
          )}
        </button>
      </div>
      
      {address && (
        <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md text-sm break-words">
          <p><strong>Connected:</strong> {address}</p>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
