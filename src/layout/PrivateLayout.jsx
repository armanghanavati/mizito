import React, { useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Col } from 'react-bootstrap';
import { getAllUsers } from '../services/masterServices';
import { useDispatch } from 'react-redux';
import { RsetAllUsers } from '../hooks/slices/main';

const PrivateLayout = ({ children }) => {
  const dispatch = useDispatch();

  const handleGetAllUsers = async () => {
    try {
      const res = await getAllUsers();
      if (res?.data?.code === 1) {
        dispatch(RsetAllUsers(res?.data?.data?.userList));
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  return (
    <>
      <div className="d-flex">
        <Col className="sideCount vh-100 shadow-lg" md="2">
          <Sidebar />
        </Col>
        <Col className="bg-whit-100">
          <Header />
          {/* <Bords /> */}
          <div className="position-relative">{children}</div>
        </Col>
      </div>
    </>
  );
};

export default PrivateLayout;
