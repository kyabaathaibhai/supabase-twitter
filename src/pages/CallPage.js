import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSupabase } from '../context/SupabaseContext';
import { useVapi, CALL_STATUS } from '../hooks/useVapi';
import Alert from '../components/Alert';

const CallPage = () => {
  const { user } = useSupabase();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(true);
  // Get auth token from localStorage (since we store it there for API)
  const authToken = localStorage.getItem('auth_token');
  const vapi = useVapi(authToken, user);

  useEffect(() => {
    // Redirect to home if not logged in
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Page header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-indigo-600 mb-4">Connect With The Right People</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI-powered system will match you with the best people in our network based on your needs and interests.
          </p>
        </div>

        {/* Development alert */}
        {showAlert && (
          <div className="mb-8">
            <Alert
              type="info"
              message="This is a placeholder for the future Vapi voice conversation feature. The actual voice functionality will be implemented in a future update."
              onClose={() => setShowAlert(false)}
            />
          </div>
        )}

        {/* Vapi call controls */}
        <div className="mb-12 flex flex-col items-center">
          <button
            onClick={vapi.callStatus === CALL_STATUS.ACTIVE ? vapi.stop : vapi.start}
            className={`px-8 py-4 rounded-full font-bold text-lg shadow transition-colors duration-200 ${vapi.callStatus === CALL_STATUS.ACTIVE ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
            disabled={vapi.callStatus === CALL_STATUS.LOADING}
          >
            {vapi.callStatus === CALL_STATUS.ACTIVE ? 'End Call' : vapi.callStatus === CALL_STATUS.LOADING ? 'Connecting...' : 'Start Call'}
          </button>
          {vapi.isSpeechActive && (
            <div className="mt-4 text-green-600 font-semibold">AI is listening...</div>
          )}
          {/* Show transcript/messages if desired */}
          {vapi.activeTranscript && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg text-gray-800 max-w-xl w-full">
              <span className="font-semibold">Partial Transcript:</span> {vapi.activeTranscript.text}
            </div>
          )}
          {vapi.messages.length > 0 && (
            <div className="mt-6 w-full max-w-xl">
              <div className="font-semibold mb-2 text-indigo-700">Transcript:</div>
              <ul className="space-y-2">
                {vapi.messages.map((msg, i) => (
                  <li key={i} className="bg-white rounded p-2 border text-gray-700">
                    {msg.text || JSON.stringify(msg)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full text-center"
          >
            Return to Home
          </Link>
          <Link
            to="/profile"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-full text-center"
          >
            Manage Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CallPage;
