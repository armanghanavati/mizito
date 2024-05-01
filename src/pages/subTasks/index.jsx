import React, { useEffect, useState } from 'react';
import { Col, Collapse, Container, Form, Row } from 'react-bootstrap';
import StringHelpers from '../../helpers/StringHelpers';
import SwitchCase from '../../components/SwitchCase';
import { Controller, useForm } from 'react-hook-form';
import Input from '../../components/Input';
import asyncWrapper from '../../utils/asyncWrapper';
import Btn from '../../components/Btn';
import { useLocation } from 'react-router-dom';
import { serCreateSubTask, serSubtaskGet } from '../../services/masterServices';
import { RsetShowLoading } from '../../hooks/slices/main';
import EditSubTaskModal from './EditSubTaskModal';
import ComboBox from '../../components/ComboBox';

const SubTasks = ({
  taskItem,
  allSubTask,
  handleGetComments,
  setAllSubTask,
  handleShowSubTaskToTask
}) => {
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

  const showAllSubTask = allSubTask?.map((subTask) => {
    return (
      <Container fluid>
        <Row className="d-flex py-2 my-4 rounded-4 justify-content-between">
          <Col
            className="align-items-center bg-white py-2 d-flex justify-content-between "
            xs={12}
            md={12}>
            <SwitchCase control={control} name="" className=" me-0" label={subTask?.name} />
            <small className='text-secondary' >{StringHelpers?.convertDateFa(subTask?.dueDateTime)}</small>
            <i
              onClick={() => handleEditSubTask(subTask)}
              className=" border pt-2 rounded-pill px-2 bg-primary text-white  text-secondary bi bi-pencil mx-2 cursorPointer"
            />
          </Col>
        </Row>
      </Container>
    );
  });

  return (
    <div className="border rounded py-2 bg-light">
      <div className="d-flex justify-content-center">
        <Btn
          xl={3}
          icon={<i className="d-flex align-items-center me-2 bi bi-caret-down" />}
          className="me-3 mt-4 "
          variant="outline-primary"
          title="ایجاد وظیفه"
          onClick={() => setShowFieldCollapse(!showFieldCollapse)}
        />
      </div>
      <Collapse className="" in={showFieldCollapse}>
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
            xl={6}
            xxl={12}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <>
                <Form.Label className="mt-4 d-flex ">توضیحات:</Form.Label>
                <Form.Control {...field} name="description" as="textarea" rows={3} />
              </>
            )}
          />
          <div className="d-flex justify-content-end">
            <Btn
              loadingName="sendSubTask"
              className="mt-4 text-white"
              icon={<i className="d-flex align-items-end bi me-2 bi-send" />}
              variant="primary"
              title="ارسال"
              onClick={handleSubmit((data) => handleCreateSubTask(data))}
            />
          </div>
        </Row>
      </Collapse>
      {showAllSubTask}
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
  );
};

export default SubTasks;
