import React, { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Col } from 'react-bootstrap';
import {
  getAllUsers,
  projectPriority,
  projectRole,
  projectStatus,
  projectType
} from '../services/masterServices';
import { useDispatch, useSelector } from 'react-redux';
import {
  RsetAllEnums,
  RsetAllUsers,
  RsetProjPriorty,
  RsetProjRole,
  RsetProjStatus,
  RsetProjType
} from '../hooks/slices/main';
import StringHelpers from '../helpers/StringHelpers';

const PrivateLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { main } = useSelector((state) => state);

  console.log(main?.allEnums);

  const handleProjectRole = async () => {
    try {
      const resRole = await projectRole();
      if (resRole?.data?.code === 1) {
        const fixComboRole = StringHelpers?.convertComboBox(resRole?.data?.data);
        dispatch(RsetProjRole({ projRoles: fixComboRole }));
      }
      const resPriority = await projectPriority();
      if (resPriority?.data?.code === 1) {
        const fixComboPriorty = StringHelpers?.convertComboBox(resPriority?.data?.data);
        dispatch(RsetProjPriorty({ projPriority: fixComboPriorty }));
      }
      const resStatus = await projectStatus();
      if (resStatus?.data?.code === 1) {
        const fixComboStatus = StringHelpers?.convertComboBox(resStatus?.data?.data);
        dispatch(RsetProjStatus({ projStatus: fixComboStatus }));
      }
      const resType = await projectType();
      if (resType?.data?.code === 1) {
        const fixComboType = StringHelpers?.convertComboBox(resType?.data?.data);
        dispatch(RsetProjType({ projType: fixComboType }));
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    handleProjectRole();
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
