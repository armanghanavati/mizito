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

const CreateProjectModal = ({ showCreateProjectModal, setShowCreateProjectModal }) => {
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

  const addUsersFilter = main?.allUsers?.map((item) => {
    console.log(item);
    return {
      id: item?.id,
      title: item?.fullName
    };
  });
  console.log(main?.allUsers);
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
    // downloadFile()
    const postData = {
      name: data?.name,
      description: data?.description,
      dueDateTime: StringHelpers.convertDateEn(data?.dueDateTime),
      projectPriority: data?.projectPriority?.id,
      projectStatus: data?.projectStatus?.id,
      projectType: data?.projectType?.id,
      sprintNumber: sprintNum,
      projectAssignedUsersViewModel: handleUsersAssgin,
      attachmentsCreateViewModel: [
        // {
        //   id: '',
        //   fileName: '',
        //   filePath: '',
        //   uploadDate: '',
        //   attachCreatorId: ''
        // }
      ]
    };
    console.log(postData);
    const resCreate = await createProject(postData);
    console.log(resCreate);
  };

  //   "projectAssignedUsersViewModel": [
  //     {
  //       "userId": "ca2cc72f-d8e2-40d0-baf1-83fe9fa57a75",
  //       "userName": "AMohammadi",
  //       "fullName": "امیرعباس قره محمدی",
  //       "projectUsersRoleViewModel": [
  //         {
  //           "projectRole": 1
  //         },
  //         {
  //           "projectRole": 2
  //         }
  //       ]
  //     },
  //     {
  //       "userId": "d0ecd2d9-68ce-4626-aa80-5feb3019eda3",
  //       "userName": "Ajafari",
  //       "fullName": "علی جعفری",
  //       "projectUsersRoleViewModel": [
  //         {
  //           "projectRole": 2
  //         }
  //       ]
  //     },
  //     {
  //       "userId": "eecdfc01-b308-47e4-9acd-bc15a83a04c3",
  //       "userName": "JAsghari",
  //       "fullName": "جواد اصغری",
  //       "projectUsersRoleViewModel": [
  //         {
  //           "projectRole": 0
  //         },
  //         {
  //           "projectRole": 1
  //         }
  //       ]
  //     }
  //   ],
  //     "projectAttachmentsViewModel": []
  // },
  // return date?.convert(gregorian, gregorian_fa)?.format('YYYY-MM-DD');
  useEffect(() => {
    console.log('Eres');
    console.log(
      StringHelpers?.convertEditFilterComboBox(
        create?.fieldsEditProject?.addFields?.projectPriority
      )
    );
    reset({ ...create?.fieldsEditProject?.addFields });
  }, [create?.fieldsEditProject]);

  useEffect(() => {
    // handleProjectRole();
  }, []);

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
                    value={sprintNum}
                    onChange={(e) => setSprintNum(e.target.value)}
                    name="sprintNumber"
                    range
                    label="سرعت پروژه:"
                  />
                </Row>
                <SwitchCase className="mt-4 me-0" label="وضعیت پیوست:" />
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
