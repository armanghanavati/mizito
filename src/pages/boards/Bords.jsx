import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { serViceEditProject, serviceProjects } from '../../services/masterServices';
import EditProjectModal from './EditProjectModal';

const Bords = () => {
  const [allProjectList, setAllProjectList] = useState([]);

  const handleGetProjects = async () => {
    try {
      const res = await serviceProjects();
      if (res?.data?.res === 1) {
        setAllProjectList(res?.data?.projectsList);
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
      const res = await serViceEditProject();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container className="mt-2">
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
      <EditProjectModal />
    </>
  );
};

export default Bords;
