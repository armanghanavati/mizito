import React, { useEffect, useState } from 'react';
import { Container, Modal, Form, Row } from 'react-bootstrap';
import Btn from '../../components/Btn';
import { useSelector, useDispatch } from 'react-redux';
import { RsetFieldsEditProject, RsetShowCreateModal } from '../../hooks/slices/createSlice';
import { Controller, useForm } from 'react-hook-form';
import Datepicker from '../../components/Datepicker';
import ComboBox from '../../components/ComboBox';
import SwitchCase from '../../components/SwitchCase';
import Input from '../../components/Input';
import persian_fa from 'react-date-object/locales/persian_fa';
import persian from 'react-date-object/calendars/persian';
import { DateObject } from 'react-multi-date-picker';
import StringHelpers from '../../helpers/StringHelpers';
import { serCreateTask, serTasks, serWorkFlows } from '../../services/masterServices';
import asyncWrapper from '../../utils/asyncWrapper';
import { useLocation } from 'react-router-dom';
import { RsetShowToast } from '../../hooks/slices/main';

const CreateTasks = ({ showCreateIssuesModal, setShowCreateIssuesModal, workFlowItem, handleWorkFlows }) => {
  const { create, main } = useSelector((state) => state);
  const [sprintNum, setSprintNum] = useState(50);
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
    getValues
  } = useForm({ reValidateMode: 'onChange' });

  console.log(workFlowItem?.id);
  const fixUsers = create?.fieldsEditProject?.userAssigned?.map((user) => {
    return {
      id: user?.userId,
      title: user?.fullName
    };
  });

  const handleCreateTask = asyncWrapper(async (data) => {
    console.log(data);
    const postData = {
      name: data?.name,
      description: data?.description,
      workFlow: workFlowItem?.id,
      dueDateTime: StringHelpers.convertDateEn(data?.dueDateTime),
      remainderDateTime: StringHelpers.convertDateEn(data?.remainderDateTime),
      attachmentStatus: false,
      boardId: location?.state?.item?.id,
      taskAssignedUsersId: ['string'],
      taskVerifyUsersId: [''],
      attachmentCreateViewModels: []
    };
    const res = await serCreateTask(postData);
    if (res?.data?.code === 1) {
      setShowCreateIssuesModal(false);
      handleWorkFlows()
      dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'success' }));
    } else {
      dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'danger' }));
    }
  });
  console.log(create?.fieldsEditProject);

  return (
    <>
      <Modal
        className="p-0"
        size="lg"
        show={showCreateIssuesModal}
        onHide={() => setShowCreateIssuesModal(false)}>
        <Modal.Header
          style={{ transform: 'scale(-1, 1)', direction: 'ltr' }}
          className="d-flex bg-info text-white justify-content-center"
          closeButton>
          <span style={{ transform: 'scale(-1, 1)' }} className="fw-bold">
            ایجاد وظیفه
          </span>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Container fluid className="mb-3">
              <Input xl={6} label="نام وظیفه :" name="name" control={control} />
              <Row>
                <ComboBox
                  className=""
                  isMulti
                  name="assignedUsersId"
                  options={fixUsers}
                  xl={6}
                  control={control}
                  label="مسئول انجام:"
                />
                <ComboBox
                  className=""
                  isMulti
                  name="verifyUsersId"
                  options={fixUsers}
                  xl={6}
                  control={control}
                  label="مسئول تایید:"
                />
                <Row>
                  <Datepicker name="dueDateTime" label="تاریخ ایجاد:" control={control} />
                  <Datepicker name="remainderDateTime" label="تاریخ پایان:" control={control} />
                </Row>
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
              </Row>
            </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Btn
            variant="outline-warning"
            title="لغو"
            onClick={() => setShowCreateIssuesModal(false)}
          />
          <Btn
            variant="outline-info"
            title="تایید"
            onClick={handleSubmit((data) => handleCreateTask(data))}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateTasks;
