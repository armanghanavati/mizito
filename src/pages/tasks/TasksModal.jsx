import React, { useEffect, useState } from 'react';
import { Container, Modal, Form, Row, Col } from 'react-bootstrap';
import Btn from '../../components/Btn';
import { useSelector, useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import asyncWrapper from '../../utils/asyncWrapper';
import { serComments, serCreateComment, serGetSubTasks } from '../../services/masterServices';
import SubTasks from '../subTasks';
import Comment from '../Comment/index';
import Input from '../../components/Input';
import { RsetShowLoading } from '../../hooks/slices/main';
import DropDown from '../../components/DropDown';
import ComboBox from '../../components/ComboBox';
import { useLocation } from 'react-router-dom';

const TasksModal = ({
  setAllSubTask,
  handleShowSubTaskToTask,

  setShowTasksModal,
  showTasksModal,
  taskItem,
  allSubTask
}) => {
  const location = useLocation();
  const [allCommets, setAllCommets] = useState([]);
  const dispatch = useDispatch();
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({ reValidateMode: 'onChange' });

  const fixUsers = location?.state?.item?.boardUsersViewModel?.map((user) => {
    return {
      id: user?.userId,
      title: user?.fullName
    };
  });

  const handleGetComments = asyncWrapper(async () => {
    console.log(taskItem);
    const res = await serComments(taskItem?.id);
    console.log(res, taskItem?.id);
    if (res?.data?.code === 1) {
      setAllCommets(res?.data?.data);
    }
  });

  const handleCreateComment = asyncWrapper(async (data) => {
    const fixMentionUsers = data?.commentMentionUsersViewModels?.map((item) => item.id);
    const postData = {
      text: data?.createComment,
      taskJiraId: taskItem?.id || null,
      subTaskId: '' || null,
      commentMentionUsersViewModels: fixMentionUsers || [],
      attachmentCreateViewModels: []
    };

    dispatch(RsetShowLoading({ value: true, btnName: 'sendText' }));
    await serCreateComment(postData);
    setValue('createComment', '');
    setValue('commentMentionUsersViewModels', []);
    dispatch(RsetShowLoading({ value: false }));
    return handleGetComments();
  });

  useEffect(() => {
    handleGetComments();
  }, []);

  return (
    <>
      <Modal
        className="p-0"
        size="lg"
        show={showTasksModal}
        onHide={() => setShowTasksModal(false)}>
        <Modal.Header
          style={{ transform: 'scale(-1, 1)', direction: 'ltr' }}
          className="d-flex bg-primary text-white justify-content-center"
          closeButton>
          <span style={{ transform: 'scale(-1, 1)' }} className="fw-bold">
            وظیفه
          </span>
        </Modal.Header>
        <Modal.Body>
          <SubTasks
            setAllSubTask={setAllSubTask}
            handleShowSubTaskToTask={handleShowSubTaskToTask}
            handleGetComments={handleGetComments}
            allSubTask={allSubTask}
            taskItem={taskItem}
          />
          <div className="border my-4 p-2 bg-light rounded-2">
            <Form>
              <Row className="align-items-end px-2">
                <Input
                  placeholder="متن گزارش"
                  xs={2}
                  xl={6}
                  className=""
                  control={control}
                  name="createComment"
                />
                <ComboBox
                  isMulti
                  options={fixUsers}
                  control={control}
                  placeHolder="منشن"
                  name="commentMentionUsersViewModels"
                  className=""
                  xl={4}
                  xxl={1}
                />
                <Btn
                  xxl={2}
                  loadingName="sendText"
                  className=""
                  icon={<i className="d-flex align-items-center bi ms-1 bi-send" />}
                  variant="outline-primary"
                  title="ارسال"
                  onClick={handleSubmit((data) => handleCreateComment(data))}
                />
              </Row>
            </Form>
            <Comment
              fixUsers={fixUsers}
              control={control}
              allCommets={allCommets}
              setAllCommets={setAllCommets}
              taskItem={taskItem}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Btn variant="outline-warning" title="بستن" onClick={() => setShowTasksModal(false)} />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TasksModal;
