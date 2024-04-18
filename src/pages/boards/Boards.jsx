import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CreateTasks from '../tasks/CreateTasks';
import { useSelector } from 'react-redux';
import asyncWrapper from '../../utils/asyncWrapper';
import { serGetBoards } from '../../services/masterServices';
import CreateBoardModal from '../create/CreateBoardModal';
import EditBoardModal from './EditBoardModal';

const Boards = () => {
  const { create } = useSelector((state) => state);
  const [stepOneHead, setStepOneHead] = useState('مرحله اول');
  const [showBoardsFixed, setShowBoardsFixed] = useState([]);
  const [showCreateIssuesModal, setShowCreateIssuesModal] = useState(false);
  const [showCreateBoardModal, setShowCreateBoardModal] = useState(false);
  const [showEditBoardModal, setShowEditBoardModal] = useState(false);

  const handleGetBoards = asyncWrapper(async () => {
    if (!!create?.fieldsEditProject?.editProjectData?.id) {
      const resGetBoard = await serGetBoards(
        create?.fieldsEditProject?.editProjectData?.id
      );
      const fixBoards = resGetBoard?.data?.data?.map((item) => {
        return (
          <>
            {item?.name}
          </>
        )
      })
      setShowBoardsFixed(fixBoards)
      console.log(fixBoards);
      return resGetBoard.data;
    } else {
    }
  });

  useEffect(() => {
    handleGetBoards();
  }, []);

  return (
    <>
      <Col className='bg-light p-3' >
        تاریخ ساخت پروژه:
      </Col>
      <Row className="mx-1 my-3">
        <Col className=" justify-content-center" xxl="2">
          <Col
            xxl="2"
            className="d-flex align-items-center justify-content-between text-white px-2 col-xxl-12 py-1 rounded bg-warning">
            <span>{showBoardsFixed || stepOneHead}</span>
            <i
              onClick={() => setShowEditBoardModal(true)}
              className="cursorPointer bi bi-sliders d-flex align-items-center"
            />
          </Col>
          <div
            onClick={() => setShowCreateIssuesModal(true)}
            className="d-flex py-1 justify-content-center cursorPointer align-items-center my-4 rounded bg-white shadow">
            <i className="d-flex align-items-center mx-1 text-secondary bi bi-plus-circle" />
            <span>ایجاد موضوع</span>
          </div>
        </Col>
        <Col className=" justify-content-center" xxl="2">
          <Col
            onClick={() => setShowCreateBoardModal(true)}
            xxl="2"
            className="d-flex align-items-center cursorPointer justify-content-between text-white px-2 col-xxl-12 py-1 rounded bg-secondary">
            <span> لیست جدید</span>
            <i className="cursorPointer d-flex align-items-center mx-1 text-white bi bi-plus-circle" />
          </Col>
        </Col>
      </Row>
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

export default Boards;
