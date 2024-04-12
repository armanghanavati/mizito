import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Col } from 'react-bootstrap';

const GeneralLayout = ({ children }) => {
  return (
    <>
      <div className="d-flex">
        <Col className="bg-whit-100">
          <Header />
          {/* <Bords /> */}
          <div className="position-relative bg-danger">
            <div className="">
              <div className="">{children}</div>
            </div>
          </div>
        </Col>
        <Col className="sideCount shadow-lg" md="2">
          <Sidebar />
        </Col>
      </div>
    </>
  );
};

export default GeneralLayout;
