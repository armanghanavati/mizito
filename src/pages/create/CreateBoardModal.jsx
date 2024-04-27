import React, { useEffect } from 'react';
import { Container, Form, Modal, Row } from 'react-bootstrap';
import Datepicker from '../../components/Datepicker';
import ComboBox from '../../components/ComboBox';
import SwitchCase from '../../components/SwitchCase';
import Input from '../../components/Input';
import { Controller, useForm } from 'react-hook-form';
import Btn from '../../components/Btn';
import { RsetShowCreateModal } from '../../hooks/slices/createSlice';
import { useDispatch, useSelector } from 'react-redux';
import asyncWrapper from '../../utils/asyncWrapper';
import { serCreateBoardGet, serCreateBoardPost } from '../../services/masterServices';
import StringHelpers from '../../helpers/StringHelpers';
import { useLocation } from 'react-router-dom';
import { RsetShowToast } from '../../hooks/slices/main';

const CreateBoardModal = ({ showCreateBoardModal, handleGetBoards, setShowCreateBoardModal, itemAndIndexProject, itsBoard }) => {
  const { create, main } = useSelector((state) => state);
  const location = useLocation()
  const dispatch = useDispatch();
  const { reset,
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors },
    getValues
  } = useForm({ reValidateMode: 'onChange' });
  const getIdProject = location?.pathname?.split(':')?.[1];
  const usersAssigned = itsBoard?.[0]?.boardUsersViewModel?.map((item) => {
    return {
      id: item?.userId,
      title: item?.fullName
    }
  }
  )
  const boardUsersId = itsBoard?.[0]?.boardUsersViewModel?.map((item) => item?.userId)

  const handleGetBoard = asyncWrapper(async () => {
    const postData = {
      id: "id",
      projectType: 0,
      sprintNumber: 0,
      projectAssignedUsersViewModel: [
        {
          userId: "",
          userName: "",
          fullName: "",
          projectUsersRoleViewModel: [
            {
              projectRole: 0
            }
          ]
        }
      ],
      projectAttachmentsViewModel: []
    }
    // const res = await api
  }
  )

  const handleCreateBoard = asyncWrapper(async (data) => {
    setShowCreateBoardModal(false);
    const postDatePost = {
      name: data?.name,
      description: data?.description,
      createDateTime: StringHelpers.convertDateEn(data?.createDateTime),
      sprintNumber: data?.sprintNumber,
      projectId: getIdProject,
      projectType: data?.projectType?.id,
      boardWorkFlowsId: ['3fa85f64-5717-4562-b3fc-2c963f66afa6'],
      boardUsersId: boardUsersId,
      attachmentsCreateViewModel: []
    };
    const resCreateBoard = await serCreateBoardPost(postDatePost);
    console.log(resCreateBoard);
    if (resCreateBoard?.data?.code === 1) {
      const resGetBoard = await serGetBoards(getIdProject);
      console.log(resGetBoard);
      dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'success' }));
    } else {
      dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'danger' }));
    }
  });

  useEffect(() => {
    reset({ usersAssigned })
  }, [itsBoard]);

  return (
    <>
      <Modal
        className="p-0"
        size="lg"
        show={showCreateBoardModal}
        onHide={() => setShowCreateBoardModal(false)}>
        <Modal.Header
          style={{ transform: 'scale(-1, 1)', direction: 'ltr' }}
          className="d-flex bg-warning text-white justify-content-center"
          closeButton>
          <span style={{ transform: 'scale(-1, 1)' }} className="fw-bold">
            افزودن بورد
          </span>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Container fluid className="mb-3">
              <Row>
                <Input name="name" xl={4} label="نام بورد:" control={control} />
                <ComboBox
                  isDisabled
                  options={main?.allEnums?.projectType}
                  name="projectType"
                  control={control}
                  label="نوع:"
                />
                <Row className="mt-4">
                  <SwitchCase
                    min={1}
                    max={20}
                    control={control}
                    name="sprintNumber"
                    range
                    label={`سرعت پروژه:${watch('sprintNumber') || 1}`}
                  />
                </Row>
                <Row>
                  <ComboBox
                    isDisabled
                    isMulti
                    name="usersAssigned"
                    options={usersAssigned}
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
            onClick={() => setShowCreateBoardModal(false)}
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
