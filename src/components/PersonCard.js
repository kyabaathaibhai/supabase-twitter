import React from 'react';
import Avatar from './Avatar';

const PersonCard = ({ person }) => {
  const { name, role, company, image } = person;
  
  return (
    <div className="bg-white p-4 rounded-2xl shadow-cartoon hover:shadow-cartoon-lg transition-shadow duration-300 transform hover:-translate-y-1 text-center">
      <div className="mb-3 flex justify-center">
        <Avatar src={image} alt={name} size="lg" />
      </div>
      <h3 className="font-semibold text-lg">{name}</h3>
      <p className="text-primary-600 text-sm">{role}</p>
      <p className="text-gray-500 text-sm">{company}</p>
    </div>
  );
};

export default PersonCard;
