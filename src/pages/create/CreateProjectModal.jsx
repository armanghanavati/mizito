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
import {
  createProject,
  projectPriority,
  projectRole,
  projectStatus,
  projectType
} from '../../services/masterServices';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import gregorian from 'react-date-object/calendars/gregorian';
import { DateObject } from 'react-multi-date-picker';
import StringHelpers from '../../helpers/StringHelpers';

const CreateProjectModal = ({ showCreateProjectModal
  , setSowCreateProjectModal }) => {
  const { create, main } = useSelector((state) => state);
  const [sprintNum, setSprintNum] = useState(50);
  const [role, setRole] = useState([]);
  const [priority, setPriority] = useState([]);
  const [status, setStatus] = useState([]);
  const [projType, setProjType] = useState([]);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    getValues
  } = useForm({ reValidateMode: 'onChange' });

  const addUsersFilter = main?.allUsers?.map((item) => {
    return {
      id: item?.id,
      title: item?.fullName
    };
  });

  const handleProjectRole = async () => {
    try {
      const resRole = await projectRole();
      if (resRole?.data?.code === 1) {
        setRole(resRole?.data?.data);
      }
      const resPriority = await projectPriority();
      if (resPriority?.data?.code === 1) {
        setPriority(resPriority?.data?.data);
      }
      const resStatus = await projectStatus();
      if (resStatus?.data?.code === 1) {
        setStatus(resStatus?.data?.data);
      }
      const resType = await projectType();
      if (resType?.data?.code === 1) {
        setProjType(resType?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // let addAllDepartment = []
  // const objectAll = addAllDepartment.({ label: "همه", value: "" })

  // const mapDeps = allDeps.map((dep) => addAllDepartment.push({ label: dep.label, value: dep.value }))

  // const upload = (e) => {
  //   console.warn(e.target.files)
  //   const files = e.target.files
  //   const formData = new FormData()
  //   formData.append('img', files[0])
  //   fetch('http://127.0.0.1:8000/api/store', {
  //     method: 'POST',
  //     body: formData,
  //   }).then((resp) => {
  //     resp.json().then((result) => {
  //       console.warn(result)
  //     })
  //   })
  // }

  // const downloadFile = (DOC, Caption, Format) => {
  //   const raw = window.atob(DOC);
  //   const rawLength = raw.length;
  //   let array = new Uint8Array(new ArrayBuffer(rawLength));

  //   for (let i = 0; i < rawLength; i++) {
  //     array[i] = raw.charCodeAt(i);
  //   }
  //   const file = new Blob([array], {
  //     type: getExtentionType(`.${Format.toLowerCase()}`),
  //   });
  //   const fileURL = URL.createObjectURL(file);
  //   window.open(fileURL);
  // }

  const handleCreateProject = async (data) => {
    const handleUsersAssgin = data?.assginTo?.map((item) => {
      return {
        id: item?.id
      };
    });
    setSowCreateProjectModal(false)
    console.log(handleUsersAssgin);
    console.log(StringHelpers.convertDateEn(data?.createDateTime));
    // downloadFile()
    const postData = {
      name: data?.projectName,
      description: data?.description,
      dueDateTime: StringHelpers.convertDateEn(data?.createDateTime),
      projectPriority: 0,
      projectStatus: 0,
      projectType: 0,
      sprintNumber: sprintNum,
      projectAssignedUsersViewModel: [
        {
          userId: handleUsersAssgin,
          projectRoles: [
            {
              projectRole: 0
            }
          ]
        }
      ],
      attachmentsCreateViewModel: [
        {
          id: '',
          fileName: '',
          filePath: '',
          uploadDate: '',
          attachCreatorId: ''
        }
      ]
    };

    // const resCreate = await createProject(postData)
    // console.log(resCreate);
  };

  useEffect(() => {
    handleProjectRole();
  }, []);

  return (
    <>
      <Modal
        className="p-0"
        size="lg"
        show={showCreateProjectModal}
        onHide={() => setSowCreateProjectModal(false)}>
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
                <Input xl={6} label="نام پروژه:" name="projectName" control={control} />
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
                <Datepicker name="createDateTime" label="تاریخ ساخت:" control={control} />
                <Datepicker name="dueDateTime" label="تاریخ شروع:" control={control} />
                <Datepicker name="endDateTime" label="تاریخ پایان:" control={control} />
                <ComboBox
                  options={priority}
                  name="projectPriority"
                  control={control}
                  label="اولویت:"
                />
                <ComboBox options={status} name="projectStatus" control={control} label="وضعیت:" />
                <ComboBox options={projType} name="projTypeName" control={control} label="نوع:" />
                <Row className="mt-4">
                  <SwitchCase
                    value={sprintNum}
                    onChange={(e) => setSprintNum(e.target.value)}
                    name="sprintNumber"
                    range
                    label="سرعت پروژه:"
                  />
                </Row>
                <SwitchCase className="mt-4 me-0" label="وضعیت پیوست:" />
                <Row>
                  <Input xl={6} label="ایجاد توسط:" control={control} />
                  <ComboBox
                    className="mt-2"
                    isMulti
                    name="assginTo"
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
            onClick={() => setSowCreateProjectModal(false)}
          />
          <Btn
            variant="outline-primary"
            title="تایید"
            onClick={handleSubmit((data) => handleCreateProject(data))}
          />
        </Modal.Footer>
      </Modal >
    </>
  );
};

export default CreateProjectModal;
