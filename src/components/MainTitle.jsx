import React from 'react';
import { Col } from 'react-bootstrap';

const MainTitle = ({ className, title, xxl = '3', xl = '5', md = '8', xs = '10' }) => {
  return (
    <Col
      className={` ${className} d-flex shadow-sm bg-white align-items-center justify-content-center mt-4 rounded-start-pill`}
      xxl={xxl}
      xl={xl}
      md={md}
      xs={xs}>
      <h4 className=" py-4 text-DarkPrimary  fw-bold ">{title}</h4>
    </Col>
  );
};

export default MainTitle;