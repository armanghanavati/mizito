import React, { useEffect, useState } from 'react';
import { Container, Form, Modal, Row } from 'react-bootstrap';
import Datepicker from '../../components/Datepicker';
import ComboBox from '../../components/ComboBox';
import SwitchCase from '../../components/SwitchCase';
import Input from '../../components/Input';
import { Controller, useForm } from 'react-hook-form';
import Btn from '../../components/Btn';
import { RsetShowCreateModal, handleGetBoards } from '../../hooks/slices/boardSlice';
import { useDispatch, useSelector } from 'react-redux';
import asyncWrapper from '../../utils/asyncWrapper';
import {
  serCreateBoardGet,
  serCreateBoardPost,
  serGetBoards,
  serWorkFlows
} from '../../services/masterServices';
import StringHelpers from '../../helpers/StringHelpers';
import { useLocation } from 'react-router-dom';
import { RsetShowLoading, RsetShowToast } from '../../hooks/slices/main';
import ColorPicker from '../../components/ColorPicker';


const CreateBoardModal = ({
  showCreateBoardModal,
  editFiledsBoard,
  setEditFiledsBoard,
  setShowCreateBoardModal,
  itemAndIndexProject,
}) => {
  const { board, main } = useSelector((state) => state);
  const [allWorkFlow, setAllWorkFlow] = useState([]);
  const [color, setColor] = useState("");

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
    };
  });

  const usersAssigned = editFiledsBoard?.projectAssignedUsersViewModel?.map((item) => {
    return {
      id: item?.userId,
      title: item?.fullName
    };
  });

  const handleCreateBoard = asyncWrapper(async (data) => {
    dispatch(RsetShowLoading({ value: true }));
    const fixUsersId = data?.usersAssigned?.map((item) => item?.id);
    const fixWorkFlowsId = data?.boardWorkFlowsId?.map((item) => item?.id);
    setShowCreateBoardModal(false);
    if (!!editFiledsBoard?.projectType) {
      const postData = {
        id: "",
        name: "",
        description: "",
        sprintNumber: 0,
        color: "",
        boardWorkFlowsId: [""],
        boardUsersId: [""],
        attachmentsEditViewModel: [
          {
            id: ""
          }
        ]
      }
      // {
      //   id: board?.fieldsEditProject?.editProjectData?.id,
      //   name: data?.name,
      //   description: data?.description,
      //   sprintNumber: sprintNum,
      //   boardWorkFlowsId: [
      //     // '3fa85f64-5717-4562-b3fc-2c963f66afa6'
      //   ],
      //   boardUsersId: ['string'],
      //   attachmentsEditViewModel: [
      //     // {
      //     //   id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      //     //   fileName: 'string',
      //     //   filePath: 'string',
      //     //   uploadDate: 'string',
      //     //   attachCreatorId: 'string'
      //     // }
      //   ]
      // };
      const resEditBoards = await serPutEditBoard(postData);
      console.log(resEditBoards);
    } else {
      const postDatePost = {
        name: data?.name,
        color: color,
        description: data?.description,
        projectId: getIdProject,
        boardWorkFlowsId: fixWorkFlowsId,
        boardUsersId: fixUsersId,
        attachmentsCreateViewModel: []
      };
      const resCreateBoard = await serCreateBoardPost(postDatePost);
      dispatch(RsetShowLoading({ value: false }));
      if (resCreateBoard?.data?.code === 1) {
        dispatch(handleGetBoards(getIdProject));
        // handleGetBoards();
        dispatch(RsetShowToast({ show: true, title: resCreateBoard?.data?.msg, bg: 'success' }));
      } else {
        dispatch(RsetShowToast({ show: true, title: resCreateBoard?.data?.msg, bg: 'danger' }));
      }
    }
  });

  const handleWorkFlows = asyncWrapper(async () => {
    dispatch(RsetShowLoading({ value: true }));
    const responseWorkFlow = await serWorkFlows();
    dispatch(RsetShowLoading({ value: false }));
    if (responseWorkFlow?.data?.code === 1) {
      console.log(responseWorkFlow);
      setAllWorkFlow(responseWorkFlow?.data?.data);
    }
  });

  useEffect(() => {
    handleWorkFlows();
  }, []);

  useEffect(() => {
    reset({
      ...editFiledsBoard?.getEditBoard,
      projectType: StringHelpers?.findCombo(
        editFiledsBoard?.projectType,
        main?.allEnums?.projectType
      ),
      name: ''
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
              <Row className='d-flex align-items-end' >
                <Input
                  className=''
                  errmsg="لطفا نام بورد را وارد کنید"
                  errors={errors}
                  name="name"
                  xl={4}
                  label="نام بورد:"
                  control={control}
                />
                <ComboBox
                  isDisabled
                  options={main?.allEnums?.projectType}
                  name="projectType"
                  control={control}
                  label="نوع:"
                />
              </Row>
              <Row className="mt-4">
                <SwitchCase
                  min={0}
                  max={editFiledsBoard?.sprintNumber}
                  control={control}
                  name="sprintNumber"
                  range
                  label={`سرعت پروژه:${watch('sprintNumber')}`}
                />
              </Row>
              <Row className='mt-4'>
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
                <ColorPicker color={color} setColor={setColor} />
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
