import React from 'react';
import { Row } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="m-3">
      <span> لوگو </span>
      <hr className="bg-white text-white" />
      <div className="my-2">
        <NavLink
          to="./home"
          className={({ isActive }) =>
            isActive
              ? 'bg-white tex-orange fw-bold shadow-sm text_animate_side text-decoration-none  cursorPointer text-whit-100 py-2 px-2 d-flex justify-content-end align-items-center m-1 fw-sm rounded-pill text-end'
              : 'bgGhost text_animate_side text-decoration-none  cursorPointer text-whit-100 py-2 px-2 d-flex justify-content-end align-items-center m-1 fw-sm rounded-pill text-end'
          }>
          <span className="me-2 ">خانه</span>
          <i className="font20 fw-bold bi bi-house-door" />
        </NavLink>
      </div>
      <div className="my-2">
        <NavLink
          to="./boards"
          className={({ isActive }) =>
            isActive
              ? 'bg-white tex-orange fw-bold shadow-sm text_animate_side text-decoration-none  cursorPointer text-whit-100 py-2 px-2 d-flex justify-content-end align-items-center m-1 fw-sm rounded-pill text-end'
              : 'bgGhost text_animate_side text-decoration-none  cursorPointer text-whit-100 py-2 px-2 d-flex justify-content-end align-items-center m-1 fw-sm rounded-pill text-end'
          }>
          <span className="me-2 ">پروژه ها</span>
          <i className="font20 fw-bold bi bi-box" />
        </NavLink>
      </div>
      <div className="bgGhost cursorPointer text_animate_side text-whit-100 py-2 px-2 d-flex justify-content-end align-items-center m-1 fw-sm rounded-pill text-end">
        <span className="me-2 text-light">گزارش کار</span>
        <i className="font20 fw-bold bi bi-clipboard2-check" />
      </div>
      <div className="bgGhost cursorPointer text_animate_side text-whit-100 py-2 px-2 d-flex justify-content-end align-items-center m-1 fw-sm rounded-pill text-end">
        <span className="me-2 text-light">ایجاد</span>
        <i className="font20 fw-bold bi bi-pencil-square" />
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
