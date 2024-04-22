import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { serTasks, serWorkFlows } from '../../services/masterServices';
import asyncWrapper from '../../utils/asyncWrapper';
import AllTasks from '../tasks/AllTasks';
import { useDispatch } from 'react-redux';
import { RsetShowLoading } from '../../hooks/slices/main';
import ShowTasksModal from '../tasks/TasksModal';
import TasksModal from '../tasks/TasksModal';

const Board = ({ item }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [workflowList, setWorkflowList] = useState([]);
  const [showTasksModal, setShowTasksModal] = useState(false);

  const [tasksList, setTasksList] = useState([]);
  const [taskItem, setTaskItem] = useState({});
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

  const handleShowTask = (task) => {
    setTaskItem(task);
    setShowTasksModal(true);
  };

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
                  <div className="d-flex py-1 justify-content-center cursorPointer align-items-center my-4 rounded bg-white shadow">
                    <i className="d-flex align-items-center mx-1 text-secondary bi bi-plus-circle" />
                    <span>ایجاد موضوع</span>
                  </div>
                  {tasksList
                    ?.filter((task) => task?.workFlow === wf?.id)
                    .map((task, taskIndex) => (
                      <div
                        onClick={() => handleShowTask(task)}
                        className="border shadow cursorPointer my-3 p-4"
                        key={task?.id}>
                        {task?.name}
                      </div>
                    ))}
                </div>
              </Col>
            </>
          );
        })}
      </Row>
      {showTasksModal && (
        <TasksModal
          taskItem={taskItem}
          setShowTasksModal={setShowTasksModal}
          showTasksModal={showTasksModal}
        />
      )}
    </>
  );
};

export default Board;
