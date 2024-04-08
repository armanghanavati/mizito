import React from 'react';
import Sidebar from '../layout/Sidebar';
import Bords from './Bords';
import { Col, Container, Row } from 'react-bootstrap';
import Header from '../layout/Header';

const Dashbord = () => {
  return (
    <div className="d-flex">
      {/* content */}
      <Col className="bg-whit-100">
        <Header />
        <Bords />
      </Col>
      {/* side bar */}
      <Col className="sideCount" md="2">
        <Sidebar />
      </Col>
    </div>
  );
};

export default Dashbord;
