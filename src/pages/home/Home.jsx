import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Home = () => {
  const { main } = useSelector((state) => state);

  return (
    <>
      <Container fluid className="d-flex">
        <Col xxl="9" className='' >
          <div className='my-4' >
            <h3 className='fw-bold' > میزکار </h3>
          </div>
          <Col className='d-flex gap-3 px-2' >
            <Col xl="2" xxl="2" className='rounded-4' >
              <div className='p-3 rounded-3 border shadow-sm bg-white'>
                <span className='d-flex justify-content-center' >
                  <i className="d-flex align-items-center text-success bi bi-check-all p-2 font20 rounded-pill  bg-light" />
                </span>
                <div className='fw-bold my-2 justify-content-center d-flex col text-center' >
                  کارهای امروز من
                </div>
                <div className='fw-bold d-flex justify-content-center col text-center' >
                  0
                </div>
              </div>
            </Col>
            <Col xl="2" xxl="2" className='rounded-4' >
              <div className='p-3 rounded-3 border shadow-sm bg-white'>
                <span className='d-flex justify-content-center' >
                  <i className="d-flex align-items-center text-success bi bi-calendar2-week p-2 font20 rounded-pill  bg-light" />
                </span>
                <div className=' fw-bold my-2 justify-content-center d-flex col text-center' >
                  کارهای دارای تاخیر
                </div>
                <div className='fw-bold d-flex justify-content-center col text-center' >
                  0
                </div>
              </div>
            </Col>
            <Col xl="2" xxl="2" className='rounded-4' >
              <div className='p-3 rounded-3 border shadow-sm bg-white'>
                <span className='d-flex justify-content-center' >
                  <i className="d-flex align-items-center text-success bi bi-alarm p-2 font20 rounded-pill  bg-light" />
                </span>
                <div className=' fw-bold my-2 justify-content-center d-flex col text-center' >
                  کارهای قبل از پیگیری
                </div>
                <div className='fw-bold d-flex justify-content-center col text-center' >
                  0
                </div>
              </div>
            </Col>
          </Col>
          <Col className="p-1 my-4" xl="4  ">
            <h6 className="d-flex justify-content-center shadow-sm rounded-top-4 py-2 fw-bold bg-white border">
              جریان فعالیت
            </h6>
          </Col>
          <div className="d-flex my-4">
            <Col className="p-1" xl="4">
              <h6 className="d-flex justify-content-center shadow-sm rounded-top-4 py-2 fw-bold bg-white border">
                وظایف
              </h6>
            </Col>
            <Col className="p-1" xl="4">
              <h6 className="d-flex justify-content-center shadow-sm rounded-top-4 py-2 fw-bold bg-white border">
                پیگیری از دیگران
              </h6>
            </Col>

          </div>
        </Col>
        <Col xxl="2" className='me-1 rounded-4' >
          <div className='p-4 rounded-3 border shadow-sm bg-white'>
            <span className='d-flex justify-content-center' >
              <i className="d-flex align-items-center text-success bi bi-person font100 p-4 rounded-pill " />
            </span>
          </div>
          <div className='d-flex justify-content-center my-2' >
            <h4 className='fw-bold' >
              {main?.userRole?.fullName}
            </h4>
          </div>
        </Col>
      </Container>
    </>
  );
};

export default Home;
