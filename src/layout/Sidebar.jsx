import React from 'react';
import { Container, Dropdown, DropdownButton, Nav, NavDropdown, Navbar, Row } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RsetShowCreateModal } from '../hooks/slices/createSlice';

const Sidebar = () => {
  const { create } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div className="m-3">
      <span> لوگو </span>
      <hr className="bg-white text-white" />
      <div className="my-2">
        <NavLink
          to="./home"
          className={({ isActive }) =>
            isActive
              ? 'bg-white tex-orange fw-bold shadow-sm text_animate_side text-decoration-none  cursorPointer text-whit-100 py-2 px-2 d-flex justify-content-start align-items-center m-1 fw-sm rounded-pill text-start'
              : 'bgGhost text_animate_side text-decoration-none  cursorPointer text-whit-100 py-2 px-2 d-flex justify-content-start align-items-center m-1 fw-sm rounded-pill text-start'
          }>
          <i className="font20 fw-bold bi bi-house-door" />
          <span className="me-2 ">خانه</span>
        </NavLink>
      </div>
      <div className="my-2">
        <NavLink
          to="./projects"
          className={({ isActive }) =>
            isActive
              ? 'bg-white tex-orange fw-bold shadow-sm text_animate_side text-decoration-none  cursorPointer text-whit-100 py-2 px-2 d-flex justify-content-start align-items-center m-1 fw-sm rounded-pill text-start'
              : 'bgGhost text_animate_side text-decoration-none  cursorPointer text-whit-100 py-2 px-2 d-flex justify-content-start align-items-center m-1 fw-sm rounded-pill text-start'
          }>
          <i className="font20 fw-bold bi bi-box" />
          <span className="me-2 ">پروژه ها</span>
        </NavLink>
      </div>
      <div className="bgGhost cursorPointer text_animate_side text-whit-100 py-2 px-2 d-flex justify-content-start align-items-center m-1 fw-sm rounded-pill text-start">
        <i className="font20 fw-bold bi bi-clipboard2-check" />
        <span className="me-2 text-light">گزارش کار</span>
      </div>
      <div className="my-2">
        <NavLink
          onClick={() => dispatch(RsetShowCreateModal({ show: true }))}
          to="./boards"
          className={({ isActive }) =>
            isActive
              ? 'bg-white tex-orange fw-bold shadow-sm text_animate_side text-decoration-none  cursorPointer text-whit-100 py-2 px-2 d-flex justify-content-start align-items-center m-1 fw-sm rounded-pill text-start'
              : 'bgGhost text_animate_side text-decoration-none  cursorPointer text-whit-100 py-2 px-2 d-flex justify-content-start align-items-center m-1 fw-sm rounded-pill text-start'
          }>
          <i className="font20 fw-bold bi bi-clipboard-data" />
          <span className="me-2 "> بورد</span>
          {/* <div>
            <Navbar color='white' variant="white" className='text-white' expand="lg">
              <Container fluid className='text-white'>
                <Navbar.Collapse  id="navbar-dark-example" className='text-white'>
                  <Nav>
                    <NavDropdown align="end" id="" title="بورد" className='text-white' menuVariant="danger">
                      <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div> */}
        </NavLink>
      </div>
      <div className="my-2">
        <NavLink
          to="./create"
          className={({ isActive }) =>
            isActive
              ? 'bg-white tex-orange fw-bold shadow-sm text_animate_side text-decoration-none  cursorPointer text-whit-100 py-2 px-2 d-flex justify-content-start align-items-center m-1 fw-sm rounded-pill text-start'
              : 'bgGhost text_animate_side text-decoration-none  cursorPointer text-whit-100 py-2 px-2 d-flex justify-content-start align-items-center m-1 fw-sm rounded-pill text-start'
          }>
          <i className="font20 fw-bold bi bi-pencil-square" />
          <span className="me-2">ایجاد</span>
        </NavLink>
      </div>
      {/* <div className="bgGhost cursorPointer text_animate_side text-whit-100 py-2 px-2 d-flex justify-content-end align-items-center m-1 fw-sm rounded-pill text-end">
        <span className="me-2 text-light">مسائل</span>
      </div>
      <div className="bgGhost cursorPointer text_animate_side text-whit-100 py-2 px-2 d-flex justify-content-end align-items-center m-1 fw-sm rounded-pill text-end">
        <span className="me-2 text-light">بورد</span>
        <i className="font20 fw-bold bi bi-clipboard2" />
      </div>
      <div className="bgGhost cursorPointer text_animate_side text-whit-100 py-2 px-2 d-flex justify-content-end align-items-center m-1 fw-sm rounded-pill text-end">
        <span className="me-2 text-light">تخته ها</span>
      </div> */}
    </div>
  );
};

export default Sidebar;
