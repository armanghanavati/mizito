import React, { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Col } from 'react-bootstrap';
import { getAllUsers, getUserRole, serAllEnums } from '../services/masterServices';
import { useDispatch, useSelector } from 'react-redux';
import {
  RsetAllEnums,
  RsetAllUsers,
  RsetProjPriorty,
  RsetProjRole,
  RsetProjStatus,
  RsetProjType,
  RsetUserRole
} from '../hooks/slices/main';
import StringHelpers from '../helpers/StringHelpers';
import asyncWrapper from '../utils/asyncWrapper';

const PrivateLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { main } = useSelector((state) => state);

  const handleProjectRole = asyncWrapper(async () => {
    const resRole = await serAllEnums();
    if (resRole?.data?.code === 1) {
      const projectRole = StringHelpers?.convertComboBox(resRole?.data?.data?.ProjectRole);
      const projectStatus = StringHelpers?.convertComboBox(resRole?.data?.data?.ProjectStatus);
      const projectType = StringHelpers?.convertComboBox(resRole?.data?.data?.ProjectType);

      // const fixComboRole = StringHelpers?.convertComboBox(resRole?.data?.data);
      const priorityList = StringHelpers?.convertComboBox(resRole?.data?.data?.Priority);
      dispatch(RsetAllEnums({ priorityList, projectRole, projectStatus, projectType }));
    }
  });

  const handleGetUserRole = asyncWrapper(async () => {
    const res = await getUserRole();
    if (res?.data?.code === 1) {
      dispatch(RsetUserRole(res?.data?.data));
    }
  });

  const handleGetAllUsers = asyncWrapper(async () => {
    const res = await getAllUsers();
    if (res?.data?.code === 1) {
      dispatch(RsetAllUsers(res?.data?.data));
    }
  });

  useEffect(() => {
    handleGetUserRole();
    handleGetAllUsers();
    handleProjectRole();
  }, []);

  return (
    <>
      <div className="bg-danger v-100 d-flex">
        <Col className="sideCount position-relative shadow-lg" xxl="2" md="2">
          <Sidebar />
        </Col>
        <Col xxl="10" className="bg-whit-100">
          <Header />
          {children}
        </Col>
      </div>
    </>
  );
};

export default PrivateLayout;
