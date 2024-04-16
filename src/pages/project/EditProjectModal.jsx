import React from 'react';
import { Container, Form, Modal, Row } from 'react-bootstrap';
import Datepicker from '../../components/Datepicker';
import ComboBox from '../../components/ComboBox';
import SwitchCase from '../../components/SwitchCase';
import Input from '../../components/Input';
import { Controller, useForm } from 'react-hook-form';
import Btn from '../../components/Btn';
import { RsetShowCreateModal } from '../../hooks/slices/createSlice';
import { useDispatch, useSelector } from 'react-redux'; ``

const EditProjectModal = ({ showEditProject, setAllProjectList }) => {
  const { create } = useSelector((state) => state);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    getValues
  } = useForm({ reValidateMode: 'onChange' });

  const handleAcceptEditProject = async (data) => {
    setAllProjectList(false)
    const postData = {
      id: "",
      name: "",
      description: "",
      dueDateTime: "time",
      projectPriority: 0,
      projectStatus: 0,
      projectType: 0,
      sprintNumber: 0,
      projectAssignedUsersViewModel: [
        {
          userId: "",
          projectRoles: [
            {
              projectRole: 0
            }
          ]
        }
      ],
      attachmentEditViewModels: [
        {
          id: "",
          fileName: "",
          filePath: "",
          uploadDate: "",
          attachCreatorId: ""
        }
      ]
    }
  }

  return (
    <>
      <Modal
        className="p-0"
        size="lg"
        show={showEditProject}
        onHide={() => setAllProjectList(false)}>
        <Modal.Header
          style={{ transform: 'scale(-1, 1)', direction: 'ltr' }}
          className="d-flex sideCount text-white justify-content-center"
          closeButton>
          <span style={{ transform: 'scale(-1, 1)' }} className="fw-bold">
            ویرایش پروژه
          </span>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Container fluid className="mb-3">
              <Row>
                <Datepicker name="createDateTime" label="تاریخ ساخت:" control={control} />
                <Datepicker name="dueDateTime" label="تاریخ شروع:" control={control} />
                <Datepicker name="endDateTime" label="تاریخ پایان:" control={control} />
                <ComboBox name="projectPriority" control={control} label="اولویت:" />
                <ComboBox name="projectStatus" control={control} label="وضعیت:" />
                <ComboBox name="projectType" control={control} label="نوع:" />
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
            onClick={() => setAllProjectList(false)}
          />
          <Btn
            variant="outline-primary"
            title="تایید"
            onClick={handleSubmit((data) => handleAcceptEditProject(data))}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditProjectModal;
