import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CreateTasks from '../tasks/CreateTasks';
import { useDispatch, useSelector } from 'react-redux';
import asyncWrapper from '../../utils/asyncWrapper';
import {
  serCreateBoardGet,
  serDeleteBoard,
  serEditBoard,
  serGetBoards
} from '../../services/masterServices';
import CreateBoardModal from '../create/CreateBoardModal';
import EditBoardModal from './EditBoardModal';
import StringHelpers from '../../helpers/StringHelpers';
import {
  RsetAllUsers,
  RsetDeleteModal,
  RsetShowLoading,
  RsetShowToast
} from '../../hooks/slices/main';
import Board from './Board';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  RsetFieldsEditProject,
  RsetItsBoard,
  handleGetBoards
} from '../../hooks/slices/boardSlice';
import MainTitle from '../../components/MainTitle';

const AllBoard = () => {
  const { board, main } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const getIdProject = location?.pathname?.split(':')?.[1];
  const [itemBoard, setItemBoard] = useState({});
  const [deleteBoard, setDeleteBoard] = useState({});
  const [isEditField, setIsEditField] = useState(false);
  const [editFiledsBoard, setEditFiledsBoard] = useState({});
  const [showCreateBoardModal, setShowCreateBoardModal] = useState(false);

  const handleRedirectBoard = (item, index) => {
    dispatch(RsetItsBoard(item));
    navigate(`/users/board:${getIdProject}`, {
      state: { item, index }
    });
  };

  const handleCreateBoard = asyncWrapper(async () => {
    setShowCreateBoardModal(true);
    dispatch(RsetShowLoading({ value: true }));
    const response = await serCreateBoardGet(getIdProject);
    console.log(response);
    dispatch(RsetShowLoading({ value: false }));
    if (response?.data?.code === 1) {
      console.log(response?.data);
      setIsEditField(false)
      setEditFiledsBoard(response?.data?.data);
      const fixUserCombo = StringHelpers.convertComboBox(
        response?.data?.data?.projectAssignedUsersViewModel
      );
      dispatch(
        RsetAllUsers({
          ...main?.allUsers,
          allUserAssignedBoard: fixUserCombo
        })
      );
      setShowCreateBoardModal(true);
    }
  });

  const handleShowEditBoard = asyncWrapper(async (data, index) => {
    RsetShowLoading({ value: true });
    const responseEditBoard = await serEditBoard(data?.id);
    console.log(responseEditBoard);
    RsetShowLoading({ value: false });
    if (responseEditBoard?.data?.code === 1) {
      setIsEditField(true)
      setEditFiledsBoard(responseEditBoard?.data?.data);
    }
    console.log(console.log(data, index));
    setItemBoard(data);
    setShowCreateBoardModal(true);
  });

  const handleDeleteBoardAnswerYes = asyncWrapper(async () => {
    dispatch(RsetShowLoading({ value: true }));
    const res = await serDeleteBoard(deleteBoard?.id);
    console.log(res);
    dispatch(RsetShowLoading({ value: false }));
    if (res?.data?.code === 1) {
      dispatch(handleGetBoards(getIdProject));
      dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'success' }));
    } else {
      dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'danger' }));
    }
  });

  useEffect(() => {
    if (main?.deleteModal?.name === 'DELETE_BOARD') {
      if (main?.deleteModal?.answer === 'yes') {
        handleDeleteBoardAnswerYes();
      }
    }
  }, [main?.deleteModal?.answer]);

  const handleDeleteBoard = (boardItem) => {
    setDeleteBoard(boardItem);
    console.log(boardItem);
    dispatch(RsetDeleteModal({ value: true, name: 'DELETE_BOARD' }));
  };

  useEffect(() => {
    dispatch(handleGetBoards(getIdProject));
  }, []);

  console.log(board?.getAllBoard);

  return (
    <>
      <div className="p-4 mb-3 mx-0 shadow bg-white d-flex align-items-center justify-content-between text-secondary">
        <span>{board?.getAllBoard?.[0]?.projectName}</span>
        <span>
          تاریخ ساخت بورد: {StringHelpers.convertDateFa(board?.getAllBoard?.[0]?.createDateTime)}
        </span>
        <span>سرعت پروژه: {board?.getAllBoard?.[0]?.sprintNumber}</span>
      </div>
      <Container>
        <div className="shadow border bg-light rounded">
          <MainTitle title="لیست بوردها" />
          <div className="mx-2 p-3 row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
            <div
              onClick={handleCreateBoard}
              className="d-flex justify-content-center  rounded-pill">
              <i className="cursorPointer d-flex align-items-center mx-1 font70 text-secondary bi bi-plus-circle" />
            </div>
            {board?.getAllBoard?.map((item, index) => {
              return (
                <div key={index} className="">
                  <Col
                    className="my-3 text_animate_side bg-white shadow-sm p-3 rounded-3"
                    md="12"
                    lg="12"
                    xl="12"
                    xxl="12">
                    <div className=" d-flex justify-content-between">
                      <span style={{ color: item?.color || 'black' }} className="fw-bold">
                        {item?.name}
                      </span>
                      <span>
                        <i
                          onClick={() => handleShowEditBoard(item, index)}
                          className="cursorPointer font15 text-secondary mx-2 bi bi-gear"
                        />
                        <i
                          onClick={() => handleDeleteBoard(item)}
                          className="cursorPointer font15 text-secondary bi bi-trash"
                        />
                      </span>
                    </div>
                    <hr />
                    <Col className="cursorPointer" onClick={() => handleRedirectBoard(item, index)}>
                      <i
                        style={{ backgroundColor: 'light', color: item?.color || 'gray' }}
                        className="border rounded bi font70 bg-light d-flex justify-content-center py-4 bi-eye"
                      />
                    </Col>
                    <div className="d-flex gap-3 mt-2">
                      {item?.boardUsersViewModel?.map((userInfo, index) => {
                        const imgaeLocation = userInfo?.imagePath;
                        return (
                          <div>
                            {(
                              <img
                                className="rounded-pill c"
                                src={imgaeLocation}
                                width={35}
                                height={35}
                              />
                            ) || <i className="text-secondary bi bi-person" />
                            }
                          </div>
                        );
                      })}
                    </div>
                  </Col>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
      {/* {showCreateIssuesModal && (
        <CreateTasks
          showCreateIssuesModal={showCreateIssuesModal}
          setShowCreateIssuesModal={setShowCreateIssuesModal}
        />
      )} */}
      {showCreateBoardModal && (
        <CreateBoardModal
          isEditField={isEditField}
          setEditFiledsBoard={setEditFiledsBoard}
          editFiledsBoard={editFiledsBoard}
          handleGetBoards={handleGetBoards}
          itemBoard={itemBoard}
          showCreateBoardModal={showCreateBoardModal}
          setShowCreateBoardModal={setShowCreateBoardModal}
        />
      )}
    </>
  );
};

export default AllBoard;

{
  /* <div className=" ">تاریخ ایجاد پروژه: {item?.createDateTime} </div>
                <div className=" ">توضیحات: {item?.description} </div>
                <div className=" ">تاریخ شروع: {item?.dueDateTime} </div>
                <div className=" ">تاریخ پایان: {item?.endDateTime} </div>
                <div className=" ">سازنده: {item?.projectCreatorFullName} </div>
                <div className=" ">اولویت پروژه:{item?.projectPriority} </div>
                <div className=" ">وضعیت پروژه:{item?.projectStatus} </div>
                <div className=" ">نوع پروژه:{item?.projectType} </div>
                <div className=" ">سرعت پروژه:{item?.sprintNumber} </div> */
}
