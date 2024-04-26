import React, { useEffect, useState } from 'react';
import { Container, Modal, Form, Row } from 'react-bootstrap';
import Btn from '../../components/Btn';
import { useSelector, useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import asyncWrapper from '../../utils/asyncWrapper';
import { serComments, serCreateComment, serGetSubTasks } from '../../services/masterServices';
import SubTasks from '../subTasks';
import Comment from '../Comment/index';
import Input from '../../components/Input';

const TasksModal = ({ setShowTasksModal, showTasksModal, taskItem, allSubTask }) => {
  const { create, main } = useSelector((state) => state);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
    getValues
  } = useForm({ reValidateMode: 'onChange' });
  const [allow, setAllow] = useState(false);
  const [allCommets, setAllCommets] = useState([]);

  console.log(taskItem, allSubTask);

  const handleGetComments = asyncWrapper(async () => {
    const res = await serComments(taskItem?.id);
    if (res?.data?.code === 1) {
      setAllCommets(res?.data?.data);
    }
  });

  const handleCreateComment = asyncWrapper(async (data) => {
    const postData = {
      text: data?.createComment,
      taskJiraId: taskItem?.id || null,
      subTaskId: '' || null,
      commentMentionUsersViewModels: [] || [],
      attachmentCreateViewModels: []
    };
    await serCreateComment(postData);
    return handleGetComments();
  });

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
          <SubTasks allSubTask={allSubTask} />
          <div className="border my-4 p-2">
            <Form>
              <Row className="align-items-center">
                <Input label="متن گزارش:" xs={2} xl={10} control={control} name="createComment" />
                <Btn
                  className="mt-4"
                  icon={<i className="d-flex align-items-center bi ms-1 bi-send" />}
                  variant="outline-primary"
                  title="ارسال"
                  onClick={handleSubmit((data) => handleCreateComment(data))}
                />
              </Row>
            </Form>
            <Comment allCommets={allCommets} taskItem={taskItem} />
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
