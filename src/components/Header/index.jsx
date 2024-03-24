import React from 'react';
import Logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header
      onClick={() => navigate('/')}
      className='w-full flex justify-center items-center shadow-lg bg-white cursor-pointer'
    >
      <img
        src={Logo}
        className='h-24'
      />
    </header>
  );
};

export default Header;
