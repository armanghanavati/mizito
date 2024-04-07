import React from 'react';
import Header from './Header';

const GeneralLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default GeneralLayout;
