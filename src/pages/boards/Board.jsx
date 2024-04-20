import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { serTasks, serWorkFlows } from '../../services/masterServices';
import asyncWrapper from '../../utils/asyncWrapper';
import AllTasks from '../tasks/AllTasks';

const Board = ({ item }) => {
  const location = useLocation();
  const [columnsWorkFlow, setColumnsWorkFlow] = useState([]);
  const [getTaskSubTasksViewModels, setGetTaskSubTasksViewModels] = useState([]);

  const handleWorkFlows = asyncWrapper(async () => {
    const resWorkFlows = await serWorkFlows();
    const resTasks = await serTasks(location?.state?.item?.id);
    if (resWorkFlows?.data?.code === 1) {
      setGetTaskSubTasksViewModels(resTasks?.data?.data);
      setColumnsWorkFlow(resWorkFlows?.data?.data);
    }
  });

  useEffect(() => {
    handleWorkFlows();
  }, []);

  const tasksTest = getTaskSubTasksViewModels?.[0]?.taskSubTasksViewModels?.map((item) => {
    console.log(item?.workFlow);
  });

  console.log(tasksTest);

  const fixColumnsWorkFlow = columnsWorkFlow?.map((item) => {
    // const filterColmnTasks = item?.filter((id) =>  )
    const wfId = item?.id;
    const filterTasks = getTaskSubTasksViewModels?.[0]?.taskSubTasksViewModels?.filter(
      (item) => item?.workFlow === wfId
    );

    console.log(filterTasks);
    return (
      <>
        <Col className=" justify-content-center" xxl="2">
          <Col
            xxl="2"
            className="d-flex align-items-center justify-content-between text-white px-2 col-xxl-12 py-1 rounded bg-warning">
            <span>{item?.name}</span>
            <i className="cursorPointer bi bi-sliders d-flex align-items-center" />
          </Col>
          {/* <Col xxl="2">  </Col> */}
          <div className="d-flex py-1 justify-content-center cursorPointer align-items-center my-4 rounded bg-white shadow">
            <i className="d-flex align-items-center mx-1 text-secondary bi bi-plus-circle" />
            <span>ایجاد موضوع</span>
          </div>
        </Col>
      </>
    );
  });

  return (
    <>
      <Col className="bg-light p-3 d-flex justify-content-between">
        <span>تاریخ ساخت پروژه:</span>
      </Col>
      <Row className="mt-2 mx-1 row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
        {fixColumnsWorkFlow}
      </Row>
      {/* <AllTasks boardId={location?.state?.item?.id} /> */}
    </>
  );
};

export default Board;

{
  /* <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
{allProjectList?.map((item, index) => (
  <div key={index} className=" col mb-4">
    <Col
      onClick={() => handleEditProject(item?.id)}
      className="cursorPointer  bg-white shadow-sm p-3 rounded-3"
      md="12"
      lg="12"
      xl="12"
      xxl="12">
      <div className=" d-flex justify-content-center"> {item?.name} </div>
      <hr />
      <Col className="">
        <i className="bi  font70 text-warning bg-light d-flex justify-content-center py-4 bi-eye" />
      </Col>
      {/* <div className=" ">تاریخ ایجاد پروژه: {item?.createDateTime} </div>
      <div className=" ">توضیحات: {item?.description} </div>
      <div className=" ">تاریخ شروع: {item?.dueDateTime} </div>
      <div className=" ">تاریخ پایان: {item?.endDateTime} </div>
      <div className=" ">سازنده: {item?.projectCreatorFullName} </div>
      <div className=" ">اولویت پروژه:{item?.projectPriority} </div>
      <div className=" ">وضعیت پروژه:{item?.projectStatus} </div>
      <div className=" ">نوع پروژه:{item?.projectType} </div>
      <div className=" ">سرعت پروژه:{item?.sprintNumber} </div> */
}
//     </Col>
//   </div>
// ))}
// <div className="d-flex justify-content-center  rounded-pill">
//   <i
//     onClick={() => setShowCreateProjectModal(true)}
//     className="cursorPointer d-flex align-items-center mx-1 font70 text-secondary bi bi-plus-circle"
//   />
// </div>
// </div> */}
