import React from 'react';
import { useNavigate } from 'react-router-dom';

const CalculatorCard = ({ name = '', slug = '/' }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(slug)}
      className='px-3 py-4 rounded-lg shadow-sm shadow-primary w-auto cursor-pointer bg-white hover:bg-primary/80 hover:text-white transition-all'
      title={name}
    >
      <h5>{name}</h5>
    </div>
  );
};

export default CalculatorCard;
