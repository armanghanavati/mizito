import React from 'react';
import { Row } from 'react-bootstrap';
import Profile from '../pages/profile/Profile';

const Sidebar = () => {
  return (
    <div className='' >
      <Profile />
      <hr />
      <div className="bgGhost text-whit-100 py-2 px-3 m-1 fw-bold rounded-2 text-end">خانه</div>
      <div className="bgGhost text-whit-100 py-2 px-3 m-1 fw-bold rounded-2 text-end">پروژه ها</div>
      <div className="bgGhost text-whit-100 py-2 px-3 m-1 fw-bold rounded-2 text-end">مسائل</div>
      <div className="bgGhost text-whit-100 py-2 px-3 m-1 fw-bold rounded-2 text-end">بورد</div>
      <div className="bgGhost text-whit-100 py-2 px-3 m-1 fw-bold rounded-2 text-end">تخته ها</div>
      <div className="bgGhost text-whit-100 py-2 px-3 m-1 fw-bold rounded-2 text-end">گزارش کار</div>
      <div className="bgGhost text-whit-100 py-2 px-3 m-1 fw-bold rounded-2 text-end">ایجاد</div>
    </div>
  );
};

export default Sidebar;
