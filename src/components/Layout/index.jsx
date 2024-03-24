import React from 'react';
import Header from '../Header';

const Layout = ({ children }) => {
  return (
    <div className='bg-secondary/20 min-h-screen'>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
