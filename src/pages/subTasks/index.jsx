import React, { useEffect, useState } from 'react';
import { Col, Collapse, Container, Form, Row } from 'react-bootstrap';
import StringHelpers from '../../helpers/StringHelpers';
import SwitchCase from '../../components/SwitchCase';
import { Controller, useForm } from 'react-hook-form';
import Input from '../../components/Input';
import asyncWrapper from '../../utils/asyncWrapper';
import Btn from '../../components/Btn';
import { useLocation } from 'react-router-dom';
import { serCreateSubTask, serDeleteSubTask, serSubtaskGet } from '../../services/masterServices';
import { RsetDeleteModal, RsetShowLoading } from '../../hooks/slices/main';
import EditSubTaskModal from './EditSubTaskModal';
import ComboBox from '../../components/ComboBox';
import MainTitle from '../../components/MainTitle';
import { useDispatch, useSelector } from 'react-redux';

const SubTasks = ({
  taskItem,
  handleAllTasks,
  allSubTask,
  handleGetComments,
  setAllSubTask,
  handleShowSubTaskToTask
}) => {
  const [subTaskItemDelete, setSubTaskItemDelete] = useState({});
  const [subTask, setSubTask] = useState({});
  const [showFieldCollapse, setShowFieldCollapse] = useState(false);
  const [showEditSubTask, setShowEditSubTask] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm({ reValidateMode: 'onChange' });
  const location = useLocation();
  const dispatch = useDispatch();
  const { main } = useSelector((state) => state);
  const handleCreateSubTask = asyncWrapper(async (data) => {
    RsetShowLoading({ value: true, btnName: 'sendSubTask' });
    const postData = {
      name: data?.createComment,
      description: '',
      workFlow: taskItem?.workFlow,
      dueDateTime: StringHelpers.convertDateEn(new Date()),
      remainderDateTime: StringHelpers.convertDateEn(new Date()),
      taskId: taskItem?.id,
      subTaskAssignedUsersViewModels: [''],
      subTaskVerifyUsersViewModels: [''],
      subTaskAttachmentViewModels: []
    };
    const res = await serCreateSubTask(postData);
    RsetShowLoading({ value: false });
    if (res?.data?.code === 1) {
      setAllSubTask(res?.data?.data);
      handleShowSubTaskToTask(taskItem);
      setValue('createComment', '');
    }
  });

  const handleEditSubTask = (subTaskData) => {
    setShowEditSubTask(true);
    setSubTask(subTaskData);
  };

  const handleDeleteSubTaskAnswerYes = asyncWrapper(async () => {
    const res = await serDeleteSubTask(subTaskItemDelete?.id);
    console.log(subTaskItemDelete);
    if (res?.data?.code === 1) {
      handleShowSubTaskToTask(subTaskItemDelete);
      dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'success' }));
    } else {
      handleWorkFlows();
      dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'danger' }));
    }
  });

  useEffect(() => {
    if (main?.deleteModal?.name === 'DELETE_SUBTASK') {
      if (main?.deleteModal?.answer === 'yes') {
        handleDeleteSubTaskAnswerYes();
      }
    }
  }, [main?.deleteModal?.answer]);

  const handleDeleteSubTask = (subTask) => {
    setSubTaskItemDelete(subTask);
    dispatch(RsetDeleteModal({ value: true, name: 'DELETE_SUBTASK' }));
  };

  const showAllSubTask = allSubTask?.map((subTask) => {
    return (
      <Container fluid>
        <Row className="d-flex py-2 rounded-4 justify-content-between">
          <Col
            className="align-items-center bg-white py-2 d-flex justify-content-between "
            xs={12}
            md={12}>
            <SwitchCase control={control} name="" className=" me-0" label={subTask?.name} />
            <small className="text-secondary">
              {StringHelpers?.convertDateFa(subTask?.dueDateTime)}
            </small>
            <i
              onClick={() => handleEditSubTask(subTask)}
              className="pt-2 rounded-pill px-2 bg-warning text-white  text-secondary bi bi-pencil mx-2 cursorPointer"
            />
            <i
              onClick={() => handleDeleteSubTask(subTask)}
              className="pt-2 rounded-pill px-2 bg-warning text-white  text-secondary bi bi-trash  cursorPointer"
            />
          </Col>
        </Row>
      </Container>
    );
  });

  return (
    <>
      <div className="border  py-2 rounded shadow-sm bg-light">
        <Col
          className="d-flex shadow-sm bg-warning align-items-center justify-content-center my-2 rounded-start-pill"
          xxl={2}
          xl={4}
          md={6}
          xs={12}>
          <h5 className="d-flex align-items-center mt-2 py-2 text-white">ایجاد وظیفه‌ فرعی</h5>
        </Col>
        <div className="rounded bg-white m-3 ">
          <Row className="align-items-center px-3">
            <Input
              className="mt-4"
              errors={errors}
              placeholder="ایجاد وظیفه فرعی"
              xs={2}
              xl={6}
              control={control}
              name="createComment"
              validation={{
                required: 'لطفا وظیفه فرعی را وارد کنید'
              }}
            />
            <ComboBox
              isMulti
              // options={fixUsers}
              control={control}
              placeHolder="منشن"
              name="commentMentionUsersViewModels"
              className=""
              xl={4}
              xxl={12}
            />
            <Btn
              loadingName="sendSubTask"
              className="mt-4"
              icon={<i className="d-flex align-items-end bi me-1 bi-send" />}
              variant="outline-warning"
              title="ارسال"
              onClick={handleSubmit((data) => handleCreateSubTask(data))}
            />
          </Row>
          {showAllSubTask}
        </div>
        {showEditSubTask && (
          <EditSubTaskModal
            reset={reset}
            handleSubmit={handleSubmit}
            subTask={subTask}
            setShowEditSubTask={setShowEditSubTask}
            showEditSubTask={showEditSubTask}
            control={control}
          />
        )}
      </div>
    </>
  );
};

export default SubTasks;
