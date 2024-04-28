import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CreateTasks from '../tasks/CreateTasks';
import { useDispatch, useSelector } from 'react-redux';
import asyncWrapper from '../../utils/asyncWrapper';
import { serCreateBoardGet, serEditBoard, serGetBoards } from '../../services/masterServices';
import CreateBoardModal from '../create/CreateBoardModal';
import EditBoardModal from './EditBoardModal';
import StringHelpers from '../../helpers/StringHelpers';
import { RsetAllUsers, RsetShowLoading, RsetShowToast } from '../../hooks/slices/main';
import Board from './Board';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { RsetFieldsEditProject } from '../../hooks/slices/createSlice';

const AllBoard = () => {
  const { create, main } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const getIdProject = location?.pathname?.split(':')?.[1];
  const [itemAndIndexProject, setItemAndIndexProject] = useState({});
  const [editFiledsBoard, setEditFiledsBoard] = useState({});
  const [showCreateIssuesModal, setShowCreateIssuesModal] = useState(false);
  const [findBoard, setFindBoard] = useState(false);
  const [showCreateBoardModal, setShowCreateBoardModal] = useState(false);
  const [showEditBoardModal, setShowEditBoardModal] = useState(false);
  const [allBoard, setAllBoard] = useState([]);
  const [itsBoard, setItsBoard] = useState([]);

  const handleGetBoards = asyncWrapper(async () => {
    dispatch(RsetShowLoading({ value: true }));
    if (!!getIdProject) {
      const resGetBoard = await serGetBoards(getIdProject);
      dispatch(RsetShowLoading({ value: false }));
      if (resGetBoard?.data?.code === 1) {
        console.log(resGetBoard?.data);
        setFindBoard(true);
        setAllBoard(resGetBoard?.data?.data);
        const itsBoard = resGetBoard?.data?.data?.map((board) => {
          return board;
        });
        setItsBoard(itsBoard);
      } else {
        console.log(resGetBoard);
        dispatch(RsetShowToast({ show: true, title: resGetBoard?.data?.msg, bg: 'danger' }));
      }
    } else {
      dispatch(RsetShowToast({ show: true, title: resGetBoard?.data?.msg, bg: 'danger' }));
    }
  });

  const handleRedirectBoard = (item, index) => {
    navigate(`/users/board:${getIdProject}`, {
      state: { item, index }
    });
  };

  const handleGetSerBoardCreate = asyncWrapper(async () => {
    RsetShowLoading({ value: true });
    const response = await serCreateBoardGet(getIdProject);
    RsetShowLoading({ value: false });
    console.log(response);
    if (response?.data?.code === 1) {
      setEditFiledsBoard(response?.data?.data);
      console.log(response);
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

  const handleCreateBoard = () => {
    handleGetSerBoardCreate();
    setEditFiledsBoard({});
    setShowCreateBoardModal(true);
  };

  const handleShowEditBoard = asyncWrapper(async (data, index) => {
    RsetShowLoading({ value: true });
    const responseEditBoard = await serEditBoard(location?.state?.item?.id);
    RsetShowLoading({ value: false });
    if (responseEditBoard?.data?.code === 1) {
      setEditFiledsBoard({ ...editFiledsBoard, getEditBoard: responseEditBoard?.data?.data });
    }
    setItemAndIndexProject({ data, index });
    setShowCreateBoardModal(true);
  });

  useEffect(() => {
    handleGetBoards();
  }, []);

  return (
    <>
      <Container>
        <div className="p-4 d-flex align-items-center justify-content-between text-secondary">
          <span>{allBoard?.[0]?.projectName}</span>
          <span>تاریخ ساخت بورد: {StringHelpers.convertDateFa(allBoard?.[0]?.createDateTime)}</span>
          <span>سرعت پروژه: {allBoard?.[0]?.sprintNumber}</span>
        </div>
        <hr />
        <h3 className="text-secondary py-3">لیست بوردها</h3>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
          {allBoard?.map((item, index) => {
            return (
              <div key={index} className="">
                <Col
                  className="my-3 bg-white shadow-sm p-3 rounded-3"
                  md="12"
                  lg="12"
                  xl="12"
                  xxl="12">
                  <div className=" d-flex justify-content-between">
                    <span>{item?.name}</span>
                    <span>
                      <i
                        onClick={() => handleShowEditBoard(item, index)}
                        className="cursorPointer font15 text-secondary bi bi-gear"
                      />{' '}
                    </span>
                  </div>
                  <hr />
                  <Col className="cursorPointer" onClick={() => handleRedirectBoard(item, index)}>
                    <i className="bi font70 text-warning bg-light d-flex justify-content-center py-4 bi-eye" />
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
          <div onClick={handleCreateBoard} className="d-flex justify-content-center  rounded-pill">
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
          setEditFiledsBoard={setEditFiledsBoard}
          editFiledsBoard={editFiledsBoard}
          handleGetBoards={handleGetBoards}
          itemAndIndexProject={itemAndIndexProject}
          itsBoard={itsBoard}
          showCreateBoardModal={showCreateBoardModal}
          setShowCreateBoardModal={setShowCreateBoardModal}
        />
      )}
    </>
  );
};

export default AllBoard;
