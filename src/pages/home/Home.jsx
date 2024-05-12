import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Home = () => {
  return (
    <>
      <div className="vh-100 justify-content-center">
        <div className='mx-4' >
          <h3 className='fw-bold' > میزکار </h3>
        </div>
        <div className="d-flex m-4 bg-danger">
          <Col className="p-1 bg-info" xl="4">
            <h6 className="d-flex justify-content-center rounded-top-4 py-2 fw-bold bg-danger">
              وظایف
            </h6>
          </Col>
          <Col className="p-1 bg-info" xl="4">
            <h6 className="d-flex justify-content-center rounded-top-4 py-2 fw-bold bg-danger">
              پیگیری از دیگران
            </h6>
          </Col>
          <Col className="p-1 bg-info" xl="4  ">
            <h6 className="d-flex justify-content-center rounded-top-4 py-2 fw-bold bg-danger">
              جریان فعالیت
            </h6>
          </Col>
        </div>
        {/* <Col md="6" lg="6" xl="4" xxl="3" className="shadow-sm bg-white p-3 my-2 rounded-3">
          <div className=" ">my tasks assigned </div>
        </Col>
        <Col md="6" lg="6" xl="4" xxl="3" className="shadow-sm bg-white p-3 my-2 rounded-3">
          <div className=" "> tasks from all </div>
        </Col>
        <Col md="6" lg="6" xl="4" xxl="3" className="shadow-sm bg-white p-3 my-2 rounded-3">
          <div className=" ">سالامنتبیس نمسیتبس اب ستن اسیام ب </div>
        </Col> */}
      </div>
    </>
  );
};

export default Home;
