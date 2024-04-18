import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { serViceEditProject, serviceProjects } from '../../services/masterServices';
import EditProjectModal from './EditProjectModal';
import { RsetShowLoading } from '../../hooks/slices/main';
import { useDispatch } from 'react-redux';
import { RsetFieldsEditProject } from '../../hooks/slices/createSlice';
import CreateProjectModal from '../create/CreateProjectModal';
import { Link } from 'react-router-dom';

const ShowProjects = () => {
  const dispatch = useDispatch();
  const [allProjectList, setAllProjectList] = useState([]);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);

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

  const handleEditProject = async (id) => {
    console.log(id);
    try {
      const res = await serViceEditProject(id);
      if (res?.data?.code === 1) {
        setShowCreateProjectModal(true);
        dispatch(RsetFieldsEditProject({ addFields: res?.data?.data }));
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container className="mt-2">
        <h3 className='text-secondary my-4' >
          لیست پروژه‌ها
        </h3>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
          {allProjectList?.map((item, index) => (
            <div key={index} className=" col mb-4">
              <Col
                onClick={() => handleEditProject(item?.id)}
                className="cursorPointer bg-white shadow-sm p-3 rounded-3"
                md="12"
                lg="12"
                xl="12"
                xxl="12">
                <div className=" ">نام پروژه: {item?.name} </div>
                <div className=" ">تاریخ ایجاد پروژه: {item?.createDateTime} </div>
                <div className=" ">توضیحات: {item?.description} </div>
                <div className=" ">تاریخ شروع: {item?.dueDateTime} </div>
                <div className=" ">تاریخ پایان: {item?.endDateTime} </div>
                <div className=" ">سازنده: {item?.projectCreatorFullName} </div>
                <div className=" ">اولویت پروژه:{item?.projectPriority} </div>
                <div className=" ">وضعیت پروژه:{item?.projectStatus} </div>
                <div className=" ">نوع پروژه:{item?.projectType} </div>
                <div className=" ">سرعت پروژه:{item?.sprintNumber} </div>
              </Col>
            </div>
          ))}
        </div>
      </Container>
      {showCreateProjectModal && (
        <CreateProjectModal
          showCreateProjectModal={showCreateProjectModal}
          setShowCreateProjectModal={setShowCreateProjectModal}
        />
      )}
    </>
  );
};

export default ShowProjects;
