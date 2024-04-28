import React, { useCallback, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { serGetSubTasks, serTasks, serWorkFlows } from '../../services/masterServices';
import asyncWrapper from '../../utils/asyncWrapper';
import AllTasks from '../tasks/AllTasks';
import { useDispatch } from 'react-redux';
import { RsetShowLoading } from '../../hooks/slices/main';
import ShowTasksModal from '../tasks/TasksModal';
import TasksModal from '../tasks/TasksModal';
import CreateTasks from '../tasks/CreateTasks';
import CreateWorkFlow from '../WorkFlow/index';

const Board = ({ item }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [workflowList, setWorkflowList] = useState([]);
  const [showTasksModal, setShowTasksModal] = useState(false);
  const [showCreateIssuesModal, setShowCreateIssuesModal] = useState(false);
  const [showWorkFlow, setShowWorkFlow] = useState(false);
  const [taskItem, setTaskItem] = useState({});
  const [workFlowItem, setWorkFlowItem] = useState({});
  const [tasksList, setTasksList] = useState([]);
  const [allSubTask, setAllSubTask] = useState([]);

  const handleWorkFlows = asyncWrapper(async () => {
    dispatch(RsetShowLoading({ value: true }));
    const resWorkFlows = await serWorkFlows();
    const resTasks = await serTasks(location?.state?.item?.id);
    dispatch(RsetShowLoading({ value: false }));
    console.log(resTasks);
    if (resWorkFlows?.data?.code === 1) {
      setTasksList(resTasks?.data?.data);
      setWorkflowList(resWorkFlows?.data?.data);
    }
  });

  useEffect(() => {
    handleWorkFlows();
  }, []);

  const handleShowSubTaskToTask = asyncWrapper(async (task) => {
    const res = await serGetSubTasks(task?.id);
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
    setShowCreateIssuesModal(true);
  };

  const handleCreateWorkFlow = () => {
    setShowWorkFlow(true);
  };

  const handleEditTask = () => {
    setShowCreateIssuesModal(true);
  };

  return (
    <>
      <Col className="bg-light p-3 d-flex justify-content-between">
        <span>تاریخ ساخت پروژه:</span>
      </Col>
      <Container fluid className="count_WorkFlow d-flex ">
        {workflowList.map((wf, wfIndex) => {
          return (
            <>
              <Col className="bg-light rounded-1 m-2 justify-content-center" xxl="2">
                <Col
                  xxl="2"
                  className="d-flex rounded-top-1  align-items-center justify-content-between text-white px-2 col-xxl-12 py-1 bg-warning">
                  <span>{wf?.name}</span>

                  <i className=" bi bi-sliders d-flex align-items-center" />
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
                          className=" bg-white position-relative shadow subTask_To_Task d-flex row justify-content-between my-3 mx-1 p-4"
                          key={task?.id}>
                          <div className="px-0 d-flex justify-content-center">
                            <span>{task?.name}</span>
                            <span onClick={() => handleShowTask(task)}>
                              <i className="cursorPointer border-bottom pt-1 px-2 position-absolute top-0 end-0 text-secondary rounded-2 bi bi-eye" />
                            </span>
                            <span onClick={() => handleEditTask(task)}>
                              <i className="cursorPointer border-bottom pt-1 px-2 position-absolute top-0 start-0 text-secondary rounded-2 bi bi-gear" />
                            </span>
                          </div>
                          <div>
                            {task?.taskSubTasksViewModels?.map((subToTask) => (
                              <Row className="">
                                <Col className=" my-2 rounded  text-secondary bg-white p-1 ">
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
          allSubTask={allSubTask}
          taskItem={taskItem}
          setShowTasksModal={setShowTasksModal}
          showTasksModal={showTasksModal}
        />
      )}
      {showCreateIssuesModal && (
        <CreateTasks
          handleWorkFlows={handleWorkFlows}
          workFlowItem={workFlowItem}
          showCreateIssuesModal={showCreateIssuesModal}
          setShowCreateIssuesModal={setShowCreateIssuesModal}
        />
      )}
      {workFlowItem && (
        <CreateWorkFlow
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
