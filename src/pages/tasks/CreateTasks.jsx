import React, { useEffect, useState } from 'react';
import { Container, Modal, Form, Row } from 'react-bootstrap';
import Btn from '../../components/Btn';
import { useSelector, useDispatch } from 'react-redux';
import { RsetShowCreateModal } from '../../hooks/slices/createSlice';
import { Controller, useForm } from 'react-hook-form';
import Datepicker from '../../components/Datepicker';
import ComboBox from '../../components/ComboBox';
import SwitchCase from '../../components/SwitchCase';
import Input from '../../components/Input';
import persian_fa from 'react-date-object/locales/persian_fa';
import persian from 'react-date-object/calendars/persian';
import { DateObject } from 'react-multi-date-picker';
import StringHelpers from '../../helpers/StringHelpers';

const CreateTasks = ({ showCreateIssuesModal, setShowCreateIssuesModal }) => {
  const { create, main } = useSelector((state) => state);
  const [sprintNum, setSprintNum] = useState(50);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
    getValues
  } = useForm({ reValidateMode: 'onChange' });

  const handleCreateTask = () => {
    const postData = {
      name: 'string',
      description: 'string',
      priority: 0,
      workFlow: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      dueDateTime: '2024-04-16T19:44:37.406Z',
      remainderDateTime: '2024-04-16T19:44:37.406Z',
      attachmentStatus: true,
      boardId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      taskAssignedUsersId: ['string'],
      taskVerifyUsersId: ['string'],
      attachmentCreateViewModels: [
        {
          id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          fileName: 'string',
          filePath: 'string',
          uploadDate: 'string',
          attachCreatorId: 'string'
        }
      ]
    };
  };
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
            ایجاد موضوع
          </span>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Container fluid className="mb-3">
              <Row>
                <Input xl={6} label="نام پروژه:" name="name" control={control} />
                <Datepicker name="dueDateTime" label="تاریخ ساخت:" control={control} />
                <Controller
                  name="attachmentsCreateViewModel"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Form.Group controlId="attachmentsCreateViewModel" className="mb-3">
                        <Form.Label>آپلود فایل</Form.Label>
                        <Form.Control {...field} type="file" />
                      </Form.Group>
                    </>
                  )}
                />
                {/* <Datepicker name="createDateTime" label="تاریخ ساخت:" control={control} /> */}
                {/* <Datepicker name="endDateTime" label="تاریخ پایان:" control={control} /> */}
                <ComboBox
                  options={main?.projPriorty?.projPriority}
                  name="projectPriority"
                  control={control}
                  label="اولویت:"
                />
                <Row>
                  <Input
                    name="projectCreatorFullName"
                    xl={6}
                    label="ایجاد توسط:"
                    control={control}
                  />
                  <ComboBox
                    className="mt-2"
                    isMulti
                    name="assginTo"
                    // options={addUsersFilter}
                    xl={6}
                    control={control}
                    label="اختصاص به:"
                  />
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
