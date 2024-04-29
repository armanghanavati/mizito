import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import StringHelpers from '../../helpers/StringHelpers';
import SwitchCase from '../../components/SwitchCase';
import { useForm } from 'react-hook-form';
import Input from '../../components/Input';
import asyncWrapper from '../../utils/asyncWrapper';
import Btn from '../../components/Btn';

const SubTasks = ({ allSubTask }) => {
  const { control, handleSubmit, formState } = useForm({ reValidateMode: 'onChange' });

  const handleCreateSubTask = asyncWrapper(async () => {
    const postData = {
      name: '',
      description: '',
      priority: 0,
      workFlow: '',
      dueDateTime: '',
      remainderDateTime: '',
      taskId: '',
      subTaskAssignedUsersViewModels: [''],
      subTaskVerifyUsersViewModels: [''],
      subTaskAttachmentViewModels: []
    };
    const res = await serCreateSubTask(postData);
    console.log(res);
  });

  const showAllSubTask = allSubTask?.map((subTask) => {
    return (
      <Container fluid>
        <Row className="d-flex py-2  my-4 rounded-4 justify-content-between">
          <Col
            // onClick={}
            className="bg-white py-2 cursorPointer d-flex justify-content-between "
            xs={12}
            md={12}>
            <SwitchCase control={control} name="" className=" me-0" label={subTask?.name} />
            <span>{StringHelpers?.convertDateFa(subTask?.dueDateTime)}</span>
          </Col>
          {/* <Input  placeholder="موضوع" xs={2} xl={4} control={control} name="createComment" /> */}
        </Row>
      </Container>
    );
  });

  return (
    <div className="border rounded py-2 bg-light">
      <Row className="align-items-center px-3">
        <Input placeholder='ایجاد وظیفه فرعی' xs={2} xl={10} control={control} name="createComment" />
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
