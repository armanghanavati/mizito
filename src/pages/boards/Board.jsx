import React, { useCallback, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import {
  serDeleteTask,
  serDeleteWorkFlow,
  serGetBoards,
  serGetEditTask,
  serGetSubTasks,
  serGetWorkFlow,
  serGetWorkFlows,
  serTasks,
  serWorkFlows
} from '../../services/masterServices';
import asyncWrapper from '../../utils/asyncWrapper';
import AllTasks from '../tasks/AllTasks';
import { useDispatch, useSelector } from 'react-redux';
import { RsetDeleteModal, RsetShowLoading, RsetShowToast } from '../../hooks/slices/main';
import TasksModal from '../tasks/TasksModal';
import CreateTasks from '../tasks/CreateTasks';
import CreateWorkFlow from '../WorkFlow/index';
import DeleteModal from '../../common/DeleteModal';
import { RsetItsBoard, handleGetBoards } from '../../hooks/slices/boardSlice';

const Board = () => {
  const { main, board } = useSelector((state) => state);
  const location = useLocation();
  const dispatch = useDispatch();
  const [taskItem, setTaskItem] = useState({});
  const [taskItemDelete, setTaskItemDelete] = useState({});
  const [workFlowItemDelete, setWorkFlowItemDelete] = useState({});
  const [allWorkFlow, setAllWorkFlow] = useState([]);
  const [workflowEditItem, setWorkflowEditItem] = useState({});
  const [showTasksModal, setShowTasksModal] = useState(false);
  const [showCreateIssuesModal, setShowCreateIssuesModal] = useState(false);
  const [showWorkFlow, setShowWorkFlow] = useState(false);
  const [workFlowItem, setWorkFlowItem] = useState({});
  const [tasksList, setTasksList] = useState([]);
  const [allSubTask, setAllSubTask] = useState([]);
  const [getEditTasks, setGetEditTasks] = useState({});
  const getIdProject = location?.pathname?.split(':')?.[1];

  const handleAllTasks = asyncWrapper(async () => {
    dispatch(RsetShowLoading({ value: true }));
    const resTasks = await serTasks(location?.state?.item?.id);
    console.log(resTasks);
    dispatch(RsetShowLoading({ value: false }));
    if (resTasks?.data?.code === 1) {
      setTasksList(resTasks?.data?.data);
    }
  });

  const handleWorkFlows = asyncWrapper(async () => {
    dispatch(RsetShowLoading({ value: true }));
    const resWorkFlows = await serGetWorkFlows(location?.state?.item?.id);
    console.log(resWorkFlows);
    dispatch(RsetShowLoading({ value: false }));
    if (resWorkFlows?.data?.code === 1) {
      setAllWorkFlow(resWorkFlows?.data?.data);
    }
  });

  useEffect(() => {
    handleAllTasks();
    handleWorkFlows();
  }, []);

  const handleShowSubTaskToTask = asyncWrapper(async (task) => {
    const res = await serGetSubTasks(task?.id);
    console.log(res);
    if (res?.data?.code === 1) {
      setAllSubTask(res?.data?.data);
    }
    return res?.data?.data?.map((item) => item?.name);
  });

  const handleShowTask = (task) => {
    handleShowSubTaskToTask(task);
    setTaskItem(task);
    setShowTasksModal(true);
  };

  const handleCreateIssue = (wf) => {
    setWorkFlowItem(wf);
    setGetEditTasks({});
    setShowCreateIssuesModal(true);
  };

  const handleCreateWorkFlow = () => {
    setShowWorkFlow(true);
  };

  const handleEditTask = asyncWrapper(async (task) => {
    const responseTask = await serGetEditTask(task?.id);
    if (responseTask?.data?.code === 1) {
      setGetEditTasks(responseTask?.data?.data);
      setShowCreateIssuesModal(true);
    }
  });

  const handleDeleteTaskAnswerYes = asyncWrapper(async () => {
    const res = await serDeleteTask(taskItemDelete?.id);
    if (res?.data?.code === 1) {
      handleWorkFlows();
      dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'success' }));
    } else {
      handleWorkFlows();
      dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'danger' }));
    }
  });

  const handleDeleteWorkFlowAnswerYes = asyncWrapper(async () => {
    const res = await serDeleteWorkFlow(workFlowItemDelete?.id);
    console.log(res);
    if (res?.data?.code === 1) {
      handleWorkFlows();
      dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'success' }));
    } else {
      dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'danger' }));
    }
  });

  const handleDeleteTask = (task) => {
    setTaskItemDelete(task);
    dispatch(RsetDeleteModal({ value: true, name: 'DELETE_TASK' }));
  };

  const handleEditWorkFlow = asyncWrapper(async (wf) => {
    setShowWorkFlow(true);
    const res = await serGetWorkFlow(wf?.id);
    setWorkflowEditItem(res?.data?.data);
  });

  const handleDeleteWorkFlow = (workFlow) => {
    setWorkFlowItemDelete(workFlow);
    dispatch(RsetDeleteModal({ value: true, name: 'DELETE_WorkFlow' }));
  };

  useEffect(() => {
    console.log(main?.deleteModal, 'dddd');
    if (main?.deleteModal?.name == 'DELETE_TASK')
      if (main?.deleteModal?.answer == 'yes') {
        handleDeleteTaskAnswerYes();
      }
    if (main?.deleteModal?.name == 'DELETE_WorkFlow') {
      if (main?.deleteModal?.answer == 'yes') {
        handleDeleteWorkFlowAnswerYes();
      }
    }
  }, [main?.deleteModal]);

  return (
    <>
      <Col className="shadow-sm bg-light p-3 d-flex justify-content-between">
        <span className="">تاریخ ساخت پروژه:</span>
      </Col>
      <Container fluid className="count_WorkFlow d-flex">
        {allWorkFlow?.map((wf, wfIndex) => {
          return (
            <>
              <Col className="bg-light rounded-1 m-2 justify-content-center" xxl="2" xs="4">
                <Col
                  style={{ backgroundColor: wf?.color || 'blue' }}
                  xxl="12"
                  className="d-flex rounded-top-1  align-items-center justify-content-between text-white px-2 py-1">
                  <span>{wf?.name}</span>
                  <div className="d-flex gap-2">
                    <i
                      onClick={() => handleEditWorkFlow(wf)}
                      className="cursorPointer bi bi-sliders d-flex align-items-center"
                    />
                    <i
                      onClick={() => handleDeleteWorkFlow(wf)}
                      className="cursorPointer bi bi-trash d-flex align-items-center"
                    />
                  </div>
                </Col>
                <div className="">
                  <div
                    onClick={() => handleCreateIssue(wf)}
                    className="d-flex py-1 justify-content-center cursorPointer align-items-center my-4 border-bottom text-warning ">
                    <i className="d-flex align-items-center mx-1 text-warning bi bi-plus-circle" />
                    <span>ایجاد وظیفه</span>
                  </div>
                  {tasksList
                    ?.filter((task) => task?.workFlow === wf?.id)
                    .map((task) => {
                      return (
                        <div
                          className="rounded-1  bg-white position-relative shadow-sm subTask_To_Task d-flex row justify-content-between my-3 mx-1 p-4"
                          key={task?.id}>
                          <div className="px-0 d-flex justify-content-center">
                            <span className="text-secondary">{task?.name}</span>
                            <span className="py-3 position-absolute top-0 start-0  ">
                              <i
                                onClick={() => handleShowTask(task)}
                                className="cursorPointer border-bottom  px-2 mx-1 my-3 text-warning rounded-2 bi bi-eye"
                              />
                              <i
                                onClick={() => handleDeleteTask(task)}
                                className="cursorPointer text-warning border-bottom bi bi-trash d-flex py-1 px-2 mx-1 my-3 align-items-center rounded-2"
                              />
                              <i
                                onClick={() => handleEditTask(task)}
                                className="cursorPointer border-bottom px-2 mx-1 my-3 text-warning rounded-2 bi bi-gear"
                              />
                            </span>
                          </div>
                          <div className="">
                            {task?.taskSubTasksViewModels?.map((subToTask) => (
                              <Row className="">
                                <Col className="overflow-auto scroll_Master my-2 rounded  text-secondary bg-white p-1 ">
                                  {subToTask?.name}
                                </Col>
                              </Row>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </Col>
            </>
          );
        })}
        <Col className="col-2 d-flex align-items-start justify-content-center my-2 text-warning fw-bold">
          <span
            onClick={handleCreateWorkFlow}
            className="cursorPointer bg-white rounded px-2 d-flex align-items-center">
            ایجاد ستون
            <i className=" d-flex align-items-center py-1 mx-1 font20 fw-bold bi bi-plus-circle" />
          </span>
        </Col>
      </Container>
      {showTasksModal && (
        <TasksModal
          handleAllTasks={handleAllTasks}
          allSubTask={allSubTask}
          setAllSubTask={setAllSubTask}
          handleShowSubTaskToTask={handleShowSubTaskToTask}
          taskItem={taskItem}
          setShowTasksModal={setShowTasksModal}
          showTasksModal={showTasksModal}
        />
      )}
      {showCreateIssuesModal && (
        <CreateTasks
          handleAllTasks={handleAllTasks}
          setGetEditTasks={setGetEditTasks}
          getEditTasks={getEditTasks}
          handleWorkFlows={handleWorkFlows}
          workFlowItem={workFlowItem}
          showCreateIssuesModal={showCreateIssuesModal}
          setShowCreateIssuesModal={setShowCreateIssuesModal}
        />
      )}
      {workFlowItem && (
        <CreateWorkFlow

          handleAllTasks={handleAllTasks}
          setWorkflowEditItem={setWorkflowEditItem}
          workflowEditItem={workflowEditItem}
          handleWorkFlows={handleWorkFlows}
          workFlowItem={workFlowItem}
          setShowWorkFlow={setShowWorkFlow}
          showWorkFlow={showWorkFlow}
        />
      )}
    </>
  );
};

export default Board;