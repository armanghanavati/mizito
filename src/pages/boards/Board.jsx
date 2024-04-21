import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { serTasks, serWorkFlows } from '../../services/masterServices';
import asyncWrapper from '../../utils/asyncWrapper';
import AllTasks from '../tasks/AllTasks';
import { useDispatch } from 'react-redux';
import { RsetShowLoading } from '../../hooks/slices/main';

const Board = ({ item }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [workflowList, setWorkflowList] = useState([]);
  const [tasksList, setTasksList] = useState([]);
  const [matchedTasks, setMatchedTasks] = useState([]);
  const [fixTaskToWorkFlow, setFixTaskToWorkFlow] = useState([]);

  const handleWorkFlows = asyncWrapper(async () => {
    dispatch(RsetShowLoading({ value: true }));
    const resWorkFlows = await serWorkFlows();
    const resTasks = await serTasks(location?.state?.item?.id);
    dispatch(RsetShowLoading({ value: false }));
    if (resWorkFlows?.data?.code === 1) {
      setTasksList(resTasks?.data?.data);
      setWorkflowList(resWorkFlows?.data?.data);
    }
  });

  useEffect(() => {
    handleWorkFlows();
  }, []);

  // useEffect(() => {
  //   if (tasksList?.length !== 0) {
  //     handleMatched();
  //   }
  // }, [tasksList]);

  return (
    <>
      <Col className="bg-light p-3 d-flex justify-content-between">
        <span>تاریخ ساخت پروژه:</span>
      </Col>
      <Row className="mt-2 mx-1 row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
        {workflowList.map((wf, wfIndex) => {
          return (
            <>
              <Col className=" justify-content-center" xxl="2">
                <Col
                  xxl="2"
                  className="d-flex align-items-center justify-content-between text-white px-2 col-xxl-12 py-1 rounded bg-warning">
                  <span>{wf?.name}</span>
                  <i className="cursorPointer bi bi-sliders d-flex align-items-center" />
                </Col>
                <div>
                  {tasksList
                    ?.filter((task) => task?.workFlow === wf?.id)
                    .map((task, taskIndex) => (
                      <div
                        onClick={() => console.log(task?.id)}
                        className="border shadow cursorPointer my-3 p-4"
                        key={task?.id}>
                        {task?.name}
                      </div>
                    ))}
                </div>
                <div className="d-flex py-1 justify-content-center cursorPointer align-items-center my-4 rounded bg-white shadow">
                  <i className="d-flex align-items-center mx-1 text-secondary bi bi-plus-circle" />
                  <span>ایجاد موضوع</span>
                </div>
              </Col>
            </>
          );
        })}
      </Row>
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const handleMatched = () => {
//   let fixTaskWithWorkFlow = {};

//   // const matched = tasksList?.filter((task) => {
//   //   return workflowList?.some((item) => item?.id === task?.workFlow);
//   // });

//   // const unmatched = tasksList?.filter((task) => {
//   //   return !workflowList?.some((item) => item?.id === task?.workFlow);
//   // });
//   // console.log(matched, unmatched);
//   // setFixTaskToWorkFlow([...matched, ...unmatched]);
//   const matchedTasks = tasksList?.map((task) => {
//     const matchingWorkflow = workflowList?.find((item) => item?.id === task?.workFlow);
//     return matchingWorkflow ? { ...task, workflowItemM: matchingWorkflow } : task;
//   });

//   const unmatchedWorkflowItems = workflowList?.filter(
//     (workflow) => !matchedTasks.some((task) => task.workFlow === workflow.id)
//   );
//   setFixTaskToWorkFlow([...matchedTasks, ...unmatchedWorkflowItems]);
// };

// const showFixedBoard = fixTaskToWorkFlow?.map((item) => {
//   console.log(item);
//   );
// });
