import React, { useEffect, useState } from 'react';
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
import { serCreateBoardGet, serCreateBoardPost, serGetBoards, serWorkFlows } from '../../services/masterServices';
import StringHelpers from '../../helpers/StringHelpers';
import { useLocation } from 'react-router-dom';
import { RsetShowToast } from '../../hooks/slices/main';

const CreateBoardModal = ({
  showCreateBoardModal,
  editFiledsBoard,
  setEditFiledsBoard,
  handleGetBoards,
  setShowCreateBoardModal,
  itemAndIndexProject,
  itsBoard
}) => {
  const { create, main } = useSelector((state) => state);
  const [allWorkFlow, setAllWorkFlow] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    reset,
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors },
    getValues
  } = useForm({ reValidateMode: 'onChange' });
  const getIdProject = location?.pathname?.split(':')?.[1];

  const fixAllWorkFlow = allWorkFlow?.map((item) => {
    return {
      id: item?.id,
      title: item?.name
    }
  })

  const usersAssigned = editFiledsBoard?.projectAssignedUsersViewModel?.map((item) => {
    return {
      id: item?.userId,
      title: item?.fullName
    };
  });

  const handleCreateBoard = asyncWrapper(async (data) => {
    const fixUsersId = data?.usersAssigned?.map((item) => item?.id);
    const fixWorkFlowsId = data?.boardWorkFlowsId?.map((item) => item?.id);
    setShowCreateBoardModal(false);
    console.log(data);
    const postDatePost = {
      name: data?.name,
      description: data?.description,
      projectId: getIdProject,
      boardWorkFlowsId: fixWorkFlowsId,
      boardUsersId: fixUsersId,
      attachmentsCreateViewModel: []
    };
    console.log(postDatePost);
    const resCreateBoard = await serCreateBoardPost(postDatePost);
    console.log(resCreateBoard);
    if (resCreateBoard?.data?.code === 1) {
      handleGetBoards()
      dispatch(RsetShowToast({ show: true, title: resCreateBoard?.data?.msg, bg: 'success' }));
    } else {
      dispatch(RsetShowToast({ show: true, title: resCreateBoard?.data?.msg, bg: 'danger' }));
    }
  });

  const handleWorkFlows = asyncWrapper(async () => {
    const responseWorkFlow = await serWorkFlows()
    if (responseWorkFlow?.data?.code === 1) {
      setAllWorkFlow(responseWorkFlow?.data?.data)
    }
  })

  useEffect(() => {
    handleWorkFlows()
  }, []);

  useEffect(() => {
    reset({
      ...editFiledsBoard,
      projectType: StringHelpers?.findCombo(
        editFiledsBoard?.projectType,
        main?.allEnums?.projectType
      ),
      name: "",

    });
  }, [editFiledsBoard]);

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
                <Input errmsg='لطفا نام بورد را وارد کنید' errors={errors} name="name" xl={4} label="نام بورد:" control={control} />
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
                    max={editFiledsBoard?.sprintNumber}
                    control={control}
                    name="sprintNumber"
                    range
                    label={`سرعت پروژه:${watch('sprintNumber') || 1}`}
                  />
                </Row>
                <Row>
                  <ComboBox
                    isMulti
                    name="usersAssigned"
                    options={usersAssigned}
                    xl={6}
                    control={control}
                    label="اختصاص به:"
                  />
                  <ComboBox
                    isMulti
                    name="boardWorkFlowsId"
                    options={fixAllWorkFlow}
                    xl={6}
                    control={control}
                    label="ستون ها:"
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
