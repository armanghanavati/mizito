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
import { createProject } from '../../services/masterServices';
import persian_fa from 'react-date-object/locales/persian_fa';
import persian from 'react-date-object/calendars/persian';
import { DateObject } from 'react-multi-date-picker';
import StringHelpers from '../../helpers/StringHelpers';
import { RsetShowToast } from '../../hooks/slices/main';

const CreateProjectModal = ({
  itemAndIndexProject,
  showCreateProjectModal,
  setShowCreateProjectModal,
  editProjectFields,
  handleGetProjects
}) => {
  const { create, main } = useSelector((state) => state);
  const [sprintNum, setSprintNum] = useState(50);
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

  const addUsersFilter = main?.allUsers?.map((item) => {
    return {
      id: item?.id,
      title: item?.fullName
    };
  });

  const handleCreateProject = async (data) => {
    const handleUsersAssgin = data?.projectAssignedUsersViewModel?.map((item) => {
      console.log(item);
      return {
        userId: item?.id,
        projectRoles: [
          {
            projectRole: 0
          }
        ]
      };
    });
    setShowCreateProjectModal(false);
    const postData = {
      name: data?.name,
      description: data?.description,
      dueDateTime: '',
      projectPriority: data?.projectPriority?.id,
      projectStatus: data?.projectStatus?.id,
      projectType: data?.projectType?.id,
      sprintNumber: data?.sprintNumber,
      projectAssignedUsersViewModel: handleUsersAssgin,
      attachmentsCreateViewModel: []
    };
    console.log(postData);
    const resCreate = await createProject(postData);
    console.log(resCreate);
    if (resCreate?.data?.code === 1) {
      handleGetProjects();
      dispatch(RsetShowToast({ show: true, title: resCreate?.data?.msg, bg: 'success' }));
    } else {
      dispatch(RsetShowToast({ show: true, title: resCreate?.data?.msg, bg: 'danger' }));
    }
  };

  const handleEditFields = () => {
    const handleUsersAssgin = editProjectFields?.projectAssignedUsersViewModel?.map((item) => {
      console.log(item);
      return {
        id: item?.userId,
        title: item?.fullName
      };
    });
    reset({
      ...editProjectFields,
      dueDateTime: StringHelpers?.convertDateFa(editProjectFields?.dueDateTime),
      projectPriority: StringHelpers?.findCombo(
        editProjectFields?.projectPriority,
        main?.allEnums?.priorityList
      ),
      projectType: StringHelpers?.findCombo(
        editProjectFields?.projectType,
        main?.allEnums?.projectType
      ),
      projectStatus: StringHelpers?.findCombo(
        editProjectFields?.projectStatus,
        main?.allEnums?.projectStatus
      ),
      projectAssignedUsersViewModel: handleUsersAssgin,
      sprintNumber: editProjectFields?.sprintNumber
    });
    console.log(handleUsersAssgin);
  };

  useEffect(() => {
    handleEditFields();
  }, [editProjectFields]);

  const typeValue = watch('projectType');

  return (
    <>
      <Modal
        className="p-0"
        size="lg"
        show={showCreateProjectModal}
        onHide={() => setShowCreateProjectModal(false)}>
        <Modal.Header
          style={{ transform: 'scale(-1, 1)', direction: 'ltr' }}
          className="d-flex bg-danger text-white justify-content-center"
          closeButton>
          <span style={{ transform: 'scale(-1, 1)' }} className="fw-bold">
            ایجاد پروژه
          </span>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Container fluid className="mb-3">
              <Row>
                <Input xl={6} label="نام پروژه:" name="name" control={control} />
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
                  options={main?.allEnums?.priorityList}
                  name="projectPriority"
                  control={control}
                  label="اولویت:"
                />
                <ComboBox
                  options={main?.allEnums?.projectStatus}
                  name="projectStatus"
                  control={control}
                  label="وضعیت:"
                />
                <ComboBox
                  options={main?.allEnums?.projectType}
                  name="projectType"
                  control={control}
                  label="نوع:"
                />
                <Row className="mt-4">
                  <SwitchCase
                    // value={sprintNum}
                    min={1}
                    max={20}
                    disabled={typeValue?.id === 1 ? false : true}
                    // onChange={(e) => setSprintNum(e.target.value)}
                    control={control}
                    name="sprintNumber"
                    range
                    label={`سرعت پروژه: ${typeValue?.id === 1 ? watch('sprintNumber') : "0"}`}
                  />
                </Row>
                <Row>
                  {/* <Input
                    name="projectCreatorFullName"
                    xl={6}
                    label="ایجاد توسط:"
                    control={control}
                  /> */}
                  <ComboBox
                    className="mt-2"
                    isMulti
                    name="projectAssignedUsersViewModel"
                    options={addUsersFilter}
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
            onClick={() => setShowCreateProjectModal(false)}
          />
          <Btn
            variant="outline-primary"
            title="تایید"
            onClick={handleSubmit((data) => handleCreateProject(data))}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateProjectModal;
