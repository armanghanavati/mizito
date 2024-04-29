import React from 'react';
import { Col, Dropdown, DropdownButton } from 'react-bootstrap';

const DropDown = ({ className, title, xl = 2, lg = 3, md = 4, sm = 5, xs = 6 }) => {
  return (
    <Col className={className} lg={lg} sm={sm} xs={xs} md={md} xl={xl}>
      <DropdownButton id="dropdown-basic-button" title={title}>
        <div>  </div>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </DropdownButton>
    </Col>
  );
};

export default DropDown;
