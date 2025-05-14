import React from 'react';

const Avatar = ({ src, alt, size = 'md', status }) => {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
    busy: 'bg-red-500',
  };

  return (
    <div className="relative">
      {src ? (
        <img
          src={src}
          alt={alt || 'User avatar'}
          className={`${sizeClasses[size]} rounded-full object-cover shadow-cartoon-sm border-2 border-white`}
        />
      ) : (
        <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-primary-200 to-primary-400 flex items-center justify-center shadow-cartoon-sm border-2 border-white`}>
          <span className="text-white font-bold">
            {alt ? alt.charAt(0).toUpperCase() : 'U'}
          </span>
        </div>
      )}
      
      {status && (
        <div className={`absolute bottom-0 right-0 rounded-full ${sizeClasses.xs} border-2 border-white ${statusColors[status]}`}></div>
      )}
    </div>
  );
};

export default Avatar;
