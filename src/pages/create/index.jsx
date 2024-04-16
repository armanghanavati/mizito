import React, { useState } from 'react';
import Btn from '../../components/Btn';
import { useDispatch } from 'react-redux';
import { RsetShowCreateModal } from '../../hooks/slices/createSlice';
import CreateBoardModal from './CreateBoardModal';
import CreateProjectModal from './CreateProjectModal';
import CreateTasks from '../tasks/CreateTasks';

const Create = () => {
  const dispatch = useDispatch();
  const [showBoardModal, setShowBoardModal] = useState(false);
  const [showCreateIssuesModal, setShowCreateIssuesModal] = useState(false);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  
  return (
    <div className="d-flex mt-4 mx-3 gap-4">
      <Btn
        onClick={() => setShowBoardModal(true)}
        className="mx-4 text-white"
        variant="warning"
        title="ایجاد بورد"
      />
      <Btn
        onClick={() => setShowCreateProjectModal(true)}
        className="mx-4 "
        variant="danger"
        title="ایجاد پروژه"
      />
      <Btn
        onClick={() => setShowCreateIssuesModal(true)}
        className="mx-4 text-white"
        variant="info"
        title="ایجاد موضوع "
      />
      {showBoardModal && (
        <CreateBoardModal showBoardModal={showBoardModal} setShowBoardModal={setShowBoardModal} />
      )}
      {showCreateIssuesModal && (
        <CreateTasks
          showCreateIssuesModal={showCreateIssuesModal}
          setShowCreateIssuesModal={setShowCreateIssuesModal}
        />
      )}
      {showCreateProjectModal && (
        <CreateProjectModal
          showCreateProjectModal={showCreateProjectModal}
          setShowCreateProjectModal={setShowCreateProjectModal}
        />
      )}
    </div>
  );
};

export default Create;
