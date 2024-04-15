import React from 'react';
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
import gregorian_en from "react-date-object/locales/gregorian_en";
import gregorian from "react-date-object/calendars/gregorian";
import { DateObject } from 'react-multi-date-picker';
import StringHelpers from '../../helpers/StringHelpers';

const CreateModal = () => {
  const { create } = useSelector((state) => state);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    getValues
  } = useForm({ reValidateMode: 'onChange' });


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
    dispatch(RsetShowCreateModal({ show: false }))
    console.log(data);
    console.log(StringHelpers.convertDateEn(data?.createDateTime));

    // downloadFile()
    const postData = {
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
      attachmentsCreateViewModel: [
        {
          id: "",
          fileName: "",
          filePath: "",
          uploadDate: "",
          attachCreatorId: ""
        }
      ]
    }

    // const resCreate = await createProject(postData)
    // console.log(resCreate);
  }

  return (
    <>
      <Modal
        className="p-0"
        size="lg"
        show={create?.shoModal?.show}
        onHide={() => dispatch(RsetShowCreateModal({ show: false }))}>
        <Modal.Header
          style={{ transform: 'scale(-1, 1)', direction: 'ltr' }}
          className="d-flex sideCount text-white justify-content-center"
          closeButton>
          <span style={{ transform: 'scale(-1, 1)' }} className="fw-bold">
            ایجاد وظیفه
          </span>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Container fluid className="mb-3">
              <Row>
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
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Form.Label className="mt-4 d-flex ">توضیحات:</Form.Label>
                      <Form.Control {...field} name='description' as="textarea" rows={3} />
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
            onClick={() => dispatch(RsetShowCreateModal({ show: false }))}
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

export default CreateModal;
