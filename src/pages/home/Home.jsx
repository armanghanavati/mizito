import React from 'react';
import { Row, Col } from 'react-bootstrap'

const Home = () => {
  return (
    <>
      <Row className="justify-content-center">
        <Col md="6" lg="6" xl="4" xxl="3" className="shadow-sm bg-white p-3 my-2 rounded-3">
          <div className=" ">my tasks assigned </div>
        </Col>
        <Col md="6" lg="6" xl="4" xxl="3" className="shadow-sm bg-white p-3 my-2 rounded-3">
          <div className=" "> tasks from all </div>
        </Col>
        <Col md="6" lg="6" xl="4" xxl="3" className="shadow-sm bg-white p-3 my-2 rounded-3">
          <div className=" ">سالامنتبیس نمسیتبس اب ستن اسیام ب </div>
        </Col>
      </Row>
    </>
  );
};

export default Home;
