import React, { useEffect, useState } from 'react';
import { Container, Modal, Form, Row } from 'react-bootstrap';
import Btn from '../../components/Btn';
import { useSelector, useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import asyncWrapper from '../../utils/asyncWrapper';
import { serGetSubTasks } from '../../services/masterServices';
import SubTasks from '../subTasks';
import Comment from '../Comment/index';

const TasksModal = ({ setShowTasksModal, showTasksModal, taskItem,allSubTask }) => {
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

  console.log(taskItem);

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
          <Comment taskItem={taskItem} />
        </Modal.Body>
        <Modal.Footer>
          <Btn variant="outline-warning" title="بستن" onClick={() => setShowTasksModal(false)} />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TasksModal;
