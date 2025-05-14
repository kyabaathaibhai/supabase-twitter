import React, { useState } from 'react';
import { callApi } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const CallInitiator = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [callInitiated, setCallInitiated] = useState(false);

  const startCall = async () => {
    if (!userId) {
      setError('You must be logged in to start a call');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await callApi.startCall(userId);
      setCallInitiated(true);
      
      // In a real implementation, this would redirect to a call interface
      // or trigger the Vapi voice integration
      console.log('Call initiated:', result);
    } catch (error) {
      console.error('Error starting call:', error);
      setError(error.message || 'Failed to start call');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md mx-auto">
      {callInitiated ? (
        <div className="space-y-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Call Initiated!</h2>
          <p className="text-gray-600">Your call has been successfully initiated. We'll connect you with the right people soon.</p>
          <button
            onClick={() => setCallInitiated(false)}
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full"
          >
            Start Another Call
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Ready to Connect?</h2>
          <p className="text-gray-600">
            Make sure you have at least 100 $PLUM tokens in your wallet before starting a call.
            We'll connect you with the best people in our network based on your needs.
          </p>
          
          {error && (
            <div className="p-4 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <button
            onClick={startCall}
            disabled={loading}
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full flex items-center justify-center space-x-2 w-full"
          >
            {loading ? (
              <>
                <LoadingSpinner size="sm" color="white" />
                <span>Initiating Call...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <span>Start Call Now</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default CallInitiator;
