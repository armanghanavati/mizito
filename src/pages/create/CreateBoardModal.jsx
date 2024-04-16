import React from 'react';
import { Container, Form, Modal, Row } from 'react-bootstrap';
import Datepicker from '../../components/Datepicker';
import ComboBox from '../../components/ComboBox';
import SwitchCase from '../../components/SwitchCase';
import Input from '../../components/Input';
import { Controller, useForm } from 'react-hook-form';
import Btn from '../../components/Btn';
import { RsetShowCreateModal } from '../../hooks/slices/createSlice';
import { useDispatch, useSelector } from 'react-redux';
``;

const CreateBoardModal = ({ showBoardModal
  , setShowBoardModal }) => {
  const { create } = useSelector((state) => state);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    getValues
  } = useForm({ reValidateMode: 'onChange' });

  const handleCreateBoard = () => {
    setShowBoardModal(false)
    const postData = {
      name: 'string',
      description: 'string',
      createDateTime: '2024-04-15T19:30:21.508Z',
      sprintNumber: 0,
      projectId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      projectType: 0,
      boardWorkFlowsId: ['3fa85f64-5717-4562-b3fc-2c963f66afa6'],
      boardUsersId: ['string'],
      attachmentsCreateViewModel: [
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
        show={showBoardModal}
        onHide={() => setShowBoardModal(false)}>
        <Modal.Header
          style={{ transform: 'scale(-1, 1)', direction: 'ltr' }}
          className="d-flex bg-warning text-white justify-content-center"
          closeButton>
          <span style={{ transform: 'scale(-1, 1)' }} className="fw-bold">
            ایجاد بورد
          </span>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Container fluid className="mb-3">
              <Row>
                <Input xl={6} label="نام بورد:" control={control} />
                <Datepicker name="createDateTime" label="تاریخ ساخت:" control={control} />
                <ComboBox name="projectPriority" control={control} label="اولویت:" />
                <ComboBox name="projectType" control={control} label="نوع بورد:" />
                <Row className="mt-4">
                  <SwitchCase name="sprintNumber" range label="سرعت پروژه:" />
                </Row>
                <SwitchCase className="mt-4 me-0" label="وضعیت پیوست:" />
                <Row>
                  <Input xl={6} label="ایجاد توسط:" control={control} />
                  <ComboBox xl={6} control={control} label="اختصاص به:" />
                </Row>
                <Controller
                  name={name}
                  control={control}
                  render={({ field }) => (
                    <>
                      <Form.Label className="mt-4 d-flex ">توضیحات:</Form.Label>
                      <Form.Control as="textarea" rows={3} />
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
            onClick={() => setShowBoardModal(false)}
          />
          <Btn
            variant="outline-primary"
            title="تایید"
            onClick={handleSubmit((data) => handleCreateBoard(data))}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateBoardModal;
