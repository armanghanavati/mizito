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
  RsetProjType
} from '../hooks/slices/main';
import StringHelpers from '../helpers/StringHelpers';
import asyncWrapper from '../utils/asyncWrapper';

const PrivateLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { main } = useSelector((state) => state);

  console.log(main?.allEnums);

  const handleProjectRole = asyncWrapper(async () => {
    const resRole = await serAllEnums();
    if (resRole?.data?.code === 1) {
      console.log(resRole);
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
    console.log(res);
    if (res?.data?.code === 1) {
      dispatch(RsetAllUsers(res?.data?.data));
    }
  });

  const handleGetAllUsers = async () => {
    try {
      const res = await getAllUsers();
      if (res?.data?.code === 1) {
        console.log(res);
        dispatch(RsetAllUsers(res?.data?.data));
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetUserRole();
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
