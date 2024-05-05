import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ProgressBar } from 'react-bootstrap';
import { serViceEditProject, serviceProjects } from '../../services/masterServices';
import EditProjectModal from './EditProjectModal';
import { RsetShowLoading, RsetShowToast } from '../../hooks/slices/main';
import { useDispatch, useSelector } from 'react-redux';
import { RsetFieldsEditProject } from '../../hooks/slices/boardSlice';
import CreateProjectModal from '../create/CreateProjectModal';
import asyncWrapper from '../../utils/asyncWrapper';
import { useNavigate } from 'react-router-dom';
import MainTitle from '../../components/MainTitle';

const ShowProjects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { board } = useSelector((state) => state);
  const [allProjectList, setAllProjectList] = useState([]);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [showEditProject, setShowEditProject] = useState(false);
  const [editService, setEditService] = useState(false);
  const [itemAndIndexProject, setItemAndIndexProject] = useState({});
  const [editProjectFields, setEditProjectFields] = useState({});
  const [sprintNum, setSprintNum] = useState(1);

  const handleGetProjects = async () => {
    try {
      dispatch(RsetShowLoading({ value: true }));
      const res = await serviceProjects();
      dispatch(RsetShowLoading({ value: false }));
      if (res?.data?.code === 1) {
        console.log(res?.data?.data);
        setAllProjectList(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetProjects();
  }, []);

  const handleNavigateToBoard = asyncWrapper(async (id) => {
    dispatch(RsetFieldsEditProject({ ...board?.fieldsEditProject, projectId: id }));
    navigate(`/users/allBoardForm:${id}`);
  });

  const handleEditProject = asyncWrapper(async (item, index) => {
    dispatch(RsetShowLoading({ value: true }));
    setEditService(true);
    const res = await serViceEditProject(item?.id);
    dispatch(RsetShowLoading({ value: false }));
    if (res?.data?.code === 1) {
      setEditProjectFields(res?.data?.data);
      setItemAndIndexProject({ item, index });
      setShowCreateProjectModal(true);
    } else {
      dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'danger' }));
    }
  });

  const handleCreateProject = () => {
    setSprintNum(1);
    setEditProjectFields({});
    setEditService(false);
    setShowCreateProjectModal(true);
  };

  const fixStyleUserProjecs = (item) => {
    // const familyName = item?.fullName?.split(' ')[1].substring(0, 1);
    const familyName = item?.fullName?.split(' ')[1];
    const name = item?.fullName?.split(' ')[0].substring(0, 1);
    return (
      <Col
        className="border d-flex align-items-center justify-content-center rounded-pill py-2"
        md={12}
        xl={12}>
        {`${familyName}`}
      </Col>
    );
  };

  return (
    <>
      <Container className=" mt-2">
        <div className="shadow-sm border bg-white border rounded">
          <MainTitle title="لیست پروژه‌ها" />
          <div className="m-2 row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
            <div className="d-flex justify-content-center  rounded-pill">
              <i
                onClick={handleCreateProject}
                className="cursorPointer d-flex align-items-center mx-1 font70 text-secondary bi bi-plus-circle"
              />
            </div>
            {allProjectList?.map((item, index) => (
              <>
                <div key={index} className=" col mb-4">
                  <Col
                    className=" text_animate_side shadow-sm  p-3 rounded-3"
                    md="12"
                    lg="12"
                    xl="12"
                    xxl="12">
                    <div className="d-flex justify-content-between">
                      <span className="fw-bold" style={{ color: item?.color || 'black' }}>
                        {item?.name}
                      </span>
                      <span>
                        <i
                          onClick={() => handleEditProject(item, index)}
                          className="cursorPointer font15 text-secondary bi bi-gear"
                        />
                      </span>
                    </div>
                    <hr className="text-secondary" />
                    <Col onClick={() => handleNavigateToBoard(item?.id)} className="cursorPointer">
                      <i
                        style={{ backgroundColor: 'light', color: item?.color || 'gray' }}
                        className="bi border bg-light rounded-3 font70 d-flex justify-content-center py-4 bi-eye"
                      />
                      <Row className="overflow-auto scroll_Master maxH-100 mixH-100">
                        {item?.projectAssignedUsersViewModel?.map((item) => (
                          <Col xl="4" className=" my-2">
                            {fixStyleUserProjecs(item)}
                          </Col>
                        ))}
                      </Row>
                      <div
                        style={{ transform: 'scale(-1, 1)', direction: 'ltr' }}
                        className="eng_Num m-auto mt-2">
                        <ProgressBar
                          className="eng_Num"
                          style={{ transform: 'scale(-1, 1)' }}
                          variant=""
                          label={`${50}%`}
                          animated
                          now={50}
                        />
                      </div>
                    </Col>
                    {/* <div className=" ">تاریخ ایجاد پروژه: {item?.createDateTime} </div>
                <div className=" ">توضیحات: {item?.description} </div>
                <div className=" ">تاریخ شروع: {item?.dueDateTime} </div>
                <div className=" ">تاریخ پایان: {item?.endDateTime} </div>
                <div className=" ">سازنده: {item?.projectCreatorFullName} </div>
                <div className=" ">اولویت پروژه:{item?.projectPriority} </div>
                <div className=" ">وضعیت پروژه:{item?.projectStatus} </div>
                <div className=" ">نوع پروژه:{item?.projectType} </div>
                <div className=" ">سرعت پروژه:{item?.sprintNumber} </div> */}
                  </Col>
                </div>
              </>
            ))}
          </div>
        </div>
      </Container>
      {showCreateProjectModal && (
        <CreateProjectModal
          sprintNum={sprintNum}
          setSprintNum={setSprintNum}
          editService={editService}
          editProjectFields={editProjectFields}
          handleGetProjects={handleGetProjects}
          showCreateProjectModal={showCreateProjectModal}
          setShowCreateProjectModal={setShowCreateProjectModal}
          itemAndIndexProject={itemAndIndexProject}
        />
      )}
    </>
  );
};

export default ShowProjects;
