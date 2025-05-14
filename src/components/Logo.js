import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ size = 'md', showText = true }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <Link to="/" className="flex items-center">
      <div className={`flex-shrink-0 ${sizeClasses[size]} rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 shadow-cartoon-sm flex items-center justify-center text-white font-bold relative`}>
        <span className="absolute">CP</span>
        {/* Add simple animated dots to represent connections */}
        <div className="absolute w-2 h-2 bg-white rounded-full animate-ping top-1 right-1 opacity-75"></div>
        <div className="absolute w-2 h-2 bg-white rounded-full animate-ping bottom-1 left-1 opacity-75 animation-delay-1000"></div>
      </div>
      {showText && (
        <div className="ml-3 text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 text-transparent bg-clip-text">
          ConnectPlum
        </div>
      )}
    </Link>
  );
};

export default Logo;
