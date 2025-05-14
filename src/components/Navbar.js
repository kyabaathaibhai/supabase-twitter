import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSupabase } from '../context/SupabaseContext';
import Logo from './Logo';

const Navbar = () => {
  const { user, signInWithTwitter, signOut } = useSupabase();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (user) {
      signOut();
    } else {
      signInWithTwitter();
    }
  };

  return (
    <nav className="bg-white shadow-sm py-4 px-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div>
          <Logo size="md" showText={true} />
        </div>
        
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-indigo-600">Home</Link>
          
          {user && (
            <>
              <Link 
                to="/profile" 
                className="text-gray-700 hover:text-indigo-600"
              >
                Profile
              </Link>
              <div className="bg-indigo-100 px-3 py-1 rounded text-indigo-700 font-medium text-sm">
                100 $PLUM
              </div>
            </>
          )}
          
          <button
            onClick={handleAuthClick}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              user ? 'bg-gray-200 text-gray-800' : 'bg-indigo-600 text-white'
            }`}
          >
            {user ? 'Sign Out' : 'Sign In with Twitter'}
          </button>
          
          {user && (
            <button
              onClick={() => window.open('/call', '_blank')}
              className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium"
            >
              Start Call
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
