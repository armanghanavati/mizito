import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import StringHelpers from '../../helpers/StringHelpers';
import SwitchCase from '../../components/SwitchCase';
import { useForm } from 'react-hook-form';
import Input from '../../components/Input';
import asyncWrapper from '../../utils/asyncWrapper';
import Btn from '../../components/Btn';
import { useLocation } from 'react-router-dom';
import { serCreateSubTask, serSubtaskGet } from '../../services/masterServices';
import { RsetShowLoading } from '../../hooks/slices/main';

const SubTasks = ({
  taskItem,
  allSubTask,
  handleGetComments,
  setAllSubTask,
  handleShowSubTaskToTask
}) => {
  // const [allSubTasks, setAllSubTasks] = useState([]);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({ reValidateMode: 'onChange' });
  const location = useLocation();

  const handleCreateSubTask = asyncWrapper(async (data) => {
    RsetShowLoading({ value: true, btnName: 'sendSubTask' });
    const postData = {
      name: data?.createComment,
      description: '',
      workFlow: taskItem?.workFlow,
      dueDateTime: StringHelpers.convertDateEn(new Date()),
      remainderDateTime: StringHelpers.convertDateEn(new Date()),
      taskId: taskItem?.id,
      subTaskAssignedUsersViewModels: [''],
      subTaskVerifyUsersViewModels: [''],
      subTaskAttachmentViewModels: []
    };
    const res = await serCreateSubTask(postData);
    RsetShowLoading({ value: false });
    if (res?.data?.code === 1) {
      setAllSubTask(res?.data?.data);
      handleShowSubTaskToTask(taskItem);
      setValue('createComment', '');
    }
  });

  const showAllSubTask = allSubTask?.map((subTask) => {
    return (
      <Container fluid>
        <Row className="d-flex py-2 my-4 rounded-4 justify-content-between">
          <Col
            className="align-items-center bg-white py-2 d-flex justify-content-between "
            xs={12}
            md={12}>
            <SwitchCase control={control} name="" className=" me-0" label={subTask?.name} />
            <span>{StringHelpers?.convertDateFa(subTask?.dueDateTime)}</span>
            <i className=" border pt-2 rounded-pill px-2 bg-secondary text-white  text-secondary bi bi-pencil mx-2 cursorPointer" />
          </Col>
        </Row>
      </Container>
    );
  });

  return (
    <div className="border rounded py-2 bg-light">
      <Row className="align-items-center px-3">
        <Input
          errors={errors}
          placeholder="ایجاد وظیفه فرعی"
          xs={2}
          xl={10}
          control={control}
          name="createComment"
          validation={{
            required: 'لطفا وظیفه فرعی را وارد کنید'
          }}
        />
        <Btn
          loadingName="sendSubTask"
          className="mt-1"
          icon={<i className="d-flex align-items-center bi ms-1 bi-send" />}
          variant="outline-success"
          title="ارسال"
          onClick={handleSubmit((data) => handleCreateSubTask(data))}
        />
      </Row>
      {showAllSubTask}
    </div>
  );
};

export default SubTasks;
