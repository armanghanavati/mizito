import React from 'react';
import { Col } from 'react-bootstrap';

const MainTitle = ({ className, title, xxl = '3', xl = '3', md = '3', xs = '3' }) => {
  return (
    <Col
      className={` ${className} d-flex shadow-sm sideCount align-items-center justify-content-center mt-4 rounded-start-pill`}
      xxl={xxl}
      xl={xl}
      md={md}
      xs={xs}>
      <h4 className=" py-4 text-white  fw-bold ">{title}</h4>
    </Col>
  );
};

export default MainTitle;
