import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CreateTasks from '../tasks/CreateTasks';
import { useDispatch, useSelector } from 'react-redux';
import asyncWrapper from '../../utils/asyncWrapper';
import { serCreateBoardGet, serGetBoards } from '../../services/masterServices';
import CreateBoardModal from '../create/CreateBoardModal';
import EditBoardModal from './EditBoardModal';
import StringHelpers from '../../helpers/StringHelpers';
import { RsetAllUsers, RsetShowLoading } from '../../hooks/slices/main';
import Board from './Board';
import { Link, useNavigate } from 'react-router-dom';

const AllBoard = () => {
  const { create, main } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [stepOneHead, setStepOneHead] = useState('مرحله اول');
  const [showBoardsFixed, setShowBoardsFixed] = useState([]);
  const [showCreateIssuesModal, setShowCreateIssuesModal] = useState(false);
  const [findBoard, setFindBoard] = useState(false);
  const [showCreateBoardModal, setShowCreateBoardModal] = useState(false);
  const [showEditBoardModal, setShowEditBoardModal] = useState(false);
  const [boardsList, setBoardsList] = useState([]);

  const handleGetBoards = asyncWrapper(async () => {
    dispatch(RsetShowLoading({ value: true }));
    if (!!create?.fieldsEditProject?.editProjectData?.id) {
      const resGetBoard = await serGetBoards(create?.fieldsEditProject?.editProjectData?.id);
      dispatch(RsetShowLoading({ value: false }));
      setFindBoard(true);
      console.log(resGetBoard);
      setBoardsList(resGetBoard?.data?.data);
      // setShowBoardsFixed(fixBoards);
      // console.log(fixBoards);
      return resGetBoard.data;
    } else {
    }
  });

  const handleRedirectBoard = (item, index) => {
    navigate(`/users/board:${create?.fieldsEditProject?.editProjectData?.id}`, {
      state: { item, index }
    });
  };

  const handleGetSerBoardCreate = asyncWrapper(async () => {
    const postDataGet = {
      id: create?.fieldsEditProject?.editProjectData?.id,
      name: 'string',
      description: 'string',
      createDateTime: '2024-04-18T14:20:45.991Z',
      dueDateTime: '2024-04-18T14:20:45.991Z',
      endDateTime: '2024-04-18T14:20:45.991Z',
      projectPriority: 0,
      projectStatus: 0,
      projectType: 0,
      sprintNumber: 0,
      attachmentStatus: true,
      projectCreatorId: 'string',
      projectCreator: 'string',
      projectCreatorFullName: 'string',
      projectAssignedUsersViewModel: [
        {
          userId: 'string',
          userName: 'string',
          fullName: 'string',
          projectUsersRoleViewModel: [
            {
              projectRole: 0
            }
          ]
        }
      ],
      projectAttachmentsViewModel: [
        {
          id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          fileName: 'string',
          filePath: 'string',
          uploadDate: '2024-04-18T14:20:45.991Z'
        }
      ]
    };
    RsetShowLoading({ value: true });
    const response = await serCreateBoardGet(create?.fieldsEditProject?.editProjectData?.id);
    RsetShowLoading({ value: false });
    if (response?.data?.code === 1) {
      console.log(response);
      const fixUserCombo = StringHelpers.convertComboBox(
        response?.data?.data?.projectAssignedUsersViewModel
      );
      dispatch(
        RsetAllUsers({
          ...main?.allUsers,
          userAssigned: fixUserCombo
        })
      );
      setShowCreateBoardModal(true);
    }
  });

  useEffect(() => {
    handleGetBoards();
  }, []);

  return (
    <>
      <Container>
        <div className="p-4 d-flex align-items-center justify-content-between text-secondary">
          <span>{boardsList?.[0]?.projectName}</span>
          <span>
            تاریخ ساخت بورد: {StringHelpers.convertDateFa(boardsList?.[0]?.createDateTime)}
          </span>
          <span>سرعت پروژه: {boardsList?.[0]?.sprintNumber}</span>
        </div>
        <hr />
        <h3 className="text-secondary py-3">لیست بوردها</h3>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
          {boardsList?.map((item, index) => {
            return (
              <div key={index} className="">
                <Col
                  onClick={() => handleRedirectBoard(item, index)}
                  className="cursorPointer  bg-white shadow-sm p-3 rounded-3"
                  md="12"
                  lg="12"
                  xl="12"
                  xxl="12">
                  <div className=" d-flex justify-content-center"> {item?.name} </div>
                  <hr />
                  <Col className="">
                    <i className="bi  font70 text-warning bg-light d-flex justify-content-center py-4 bi-eye" />
                  </Col>
                  {/* <div className=" ">تاریخ ایجاد پروژه: {item?.createDateTime} </div>
                <div className=" ">توضیحات: {item?.description} </div>
                <div className=" ">تاریخ شروع: {item?.dueDateTime} </div>
                <div className=" ">تاریخ پایان: {item?.endDateTime} </div>
                <div className=" ">سازنده: {item?.projectCreatorFullName} </div>
                <div className=" ">اولویت پروژه:{item?.projectPriority} </div>
                <div className=" ">وضعیت پروژه:{item?.projectStatus} </div>
                <div className=" ">نوع پروژه:{item?.projectType} </div>
                <div className=" ">سرعت پروژه:{item?.sprintNumber} </div> */}
                </Col>
              </div>
            );
          })}
          <div className="d-flex justify-content-center  rounded-pill">
            <i className="cursorPointer d-flex align-items-center mx-1 font70 text-secondary bi bi-plus-circle" />
          </div>
        </div>
      </Container>
      {showCreateIssuesModal && (
        <CreateTasks
          showCreateIssuesModal={showCreateIssuesModal}
          setShowCreateIssuesModal={setShowCreateIssuesModal}
        />
      )}
      {showEditBoardModal && (
        <EditBoardModal
          showEditBoardModal={showEditBoardModal}
          setShowEditBoardModal={setShowEditBoardModal}
        />
      )}
      {showCreateBoardModal && (
        <CreateBoardModal
          showCreateBoardModal={showCreateBoardModal}
          setShowCreateBoardModal={setShowCreateBoardModal}
        />
      )}
    </>
  );
};

export default AllBoard;
