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
import { createProject, serPutEditProject } from '../../services/masterServices';
import StringHelpers from '../../helpers/StringHelpers';
import { RsetShowToast } from '../../hooks/slices/main';
import asyncWrapper from '../../utils/asyncWrapper';

const CreateProjectModal = ({
  editService,
  itemAndIndexProject,
  showCreateProjectModal,
  setShowCreateProjectModal,
  editProjectFields,
  handleGetProjects
}) => {
  const { create, main } = useSelector((state) => state);
  const [sprintNum, setSprintNum] = useState(1);
  const dispatch = useDispatch();
  const {
    control,
    setValue,
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


  const handleCreateProject = asyncWrapper(async (data) => {
    const handleUsersAssgin = data?.projectAssignedUsersViewModel?.map((item) => {
      return {
        userId: item?.id,
        projectRoles: [
          {
            projectRole: 0
          }
        ]
      };
    });
    console.log(handleUsersAssgin);
    if (editService) {
      const postData = {
        id: data?.id,
        name: data?.name,
        description: data?.description,
        dueDateTime: null,
        projectPriority: data?.projectPriority?.id,
        projectStatus: data?.projectStatus?.id,
        projectType: data?.projectType?.id,
        sprintNumber: data?.sprintNumber,
        projectAssignedUsersViewModel: handleUsersAssgin,
        attachmentEditViewModels: [
          // {
          //   id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          //   fileName: "",
          //   filePath: "",
          //   uploadDate: "",
          //   attachCreatorId: ""
          // }
        ]
      };
      console.log(postData);
      const res = await serPutEditProject(postData);
      if (res?.data?.code === 1) {
        dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'success' }));
      }
      else {
        dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'danger' }));
      }

    } else {
      const postData = {
        name: data?.name,
        description: data?.description,
        dueDateTime: null,
        projectPriority: data?.projectPriority?.id,
        projectStatus: data?.projectStatus?.id,
        projectType: data?.projectType?.id,
        sprintNumber: data?.sprintNumber,
        projectAssignedUsersViewModel: handleUsersAssgin,
        attachmentsCreateViewModel: []
      };
      const resCreate = await createProject(postData);
      if (resCreate?.data?.code === 1) {
        console.log(resCreate?.data?.msg);
        dispatch(RsetShowToast({ show: true, title: resCreate?.data?.msg, bg: 'success' }));
      }
      else {
        console.log(resCreate);
        dispatch(RsetShowToast({ show: true, title: resCreate?.data?.msg, bg: 'danger' }));
      }
    }
    setShowCreateProjectModal(false);
    handleGetProjects();
  });

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
  };

  console.log(editProjectFields, "editProjectFields editProjectFields editProjectFields");

  useEffect(() => {
    handleEditFields();
  }, [editProjectFields]);

  // useEffect(() => {
  //   if (typeValue?.id === 1) {
  //     setValue("sprintNumber", 1);
  //   }
  // }, [watch("sprintNumber")]);

  const typeValue = watch('projectType');

  console.log(watch('sprintNumber'));

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
                {/* <Row className="mt-4">
                  <SwitchCase
                    // value={sprintNum}
                    onChecked={true}
                    min={1}
                    max={20}
                    disabled={watch('projectType')?.id === 1 ? false : true}
                    control={control}
                    name="sprintNumber"
                    range
                    label={`سرعت پروژه: ${watch('projectType')?.id === 0 ? 0 : Number(watch('sprintNumber'))}`}
                  />
                </Row> */}
                <Row className="mt-4">
                  {`سرعت پروژه: ${watch('projectType')?.id === 0 ? 0 : sprintNum}`}
                  <Form.Label>  </Form.Label>
                  <Form.Range
                    defaultValue={editProjectFields?.sprintNumber}
                    type="range"
                    value={watch('projectType')?.id === 0 ? 0 : sprintNum}
                    onChecked={true}
                    min={1}
                    max={20}
                    onChange={(e) => setSprintNum(Number(e.target.value))}
                    // disabled={watch('projectType')?.id === 1 ? false : true}
                    // control={control}
                    name="sprintNumber"
                    range
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
