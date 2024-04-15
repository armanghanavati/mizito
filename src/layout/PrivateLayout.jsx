import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Col } from 'react-bootstrap';

const PrivateLayout = ({ children }) => {
  return (
    <>
      <div className="d-flex">
        <Col className="sideCount vh-100 shadow-lg" md="2">
          <Sidebar />
        </Col>
        <Col className="bg-whit-100">
          <Header />
          {/* <Bords /> */}
          <div className="position-relative">{children}</div>
        </Col>
      </div>
    </>
  );
};

export default PrivateLayout;
