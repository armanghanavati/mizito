import React, { useEffect, useState } from 'react';
import { Container, Modal, Form, Row } from 'react-bootstrap';
import Btn from '../../components/Btn';
import { useSelector, useDispatch } from 'react-redux';
import { RsetShowCreateModal } from '../../hooks/slices/createSlice';
import { Controller, useForm } from 'react-hook-form';
import Datepicker from '../../components/Datepicker';
import ComboBox from '../../components/ComboBox';
import SwitchCase from '../../components/SwitchCase';
import Input from '../../components/Input';
import persian_fa from 'react-date-object/locales/persian_fa';
import persian from 'react-date-object/calendars/persian';
import { DateObject } from 'react-multi-date-picker';
import StringHelpers from '../../helpers/StringHelpers';
import { addNewWorkFlowToBoard, serCreateTask } from '../../services/masterServices';
import asyncWrapper from '../../utils/asyncWrapper';
import { useLocation } from 'react-router-dom';

const CreateWorkFlow = ({ setShowWorkFlow, showWorkFlow }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm({ reValidateMode: 'onChange' });

  const handleCreateTask = asyncWrapper(async (data) => {
    console.log(data);
    const postData = {
      name: data?.name,
      description: data?.description,
      boardId: location?.state?.item?.id
    };
    const res = await addNewWorkFlowToBoard(postData);
    if (res?.data?.code === 1) {
      console.log(res);
      setShowWorkFlow(false);
      dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'success' }));
    } else {
      dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'danger' }));
    }
  });

  return (
    <>
      <Modal className="p-0" size="lg" show={showWorkFlow} onHide={() => setShowWorkFlow(false)}>
        <Modal.Header
          style={{ transform: 'scale(-1, 1)', direction: 'ltr' }}
          className="d-flex bg-warning text-white justify-content-center"
          closeButton>
          <span style={{ transform: 'scale(-1, 1)' }} className="fw-bold">
            ایجاد وظیفه
          </span>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Container fluid className="mb-3">
              <Row>
                <Input xl={6} label="نام :" name="name" control={control} />
                <ComboBox className="" name="color" xl={6} control={control} label="رنگ:" />
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
          <Btn variant="outline-danger" title="لغو" onClick={() => setShowWorkFlow(false)} />
          <Btn
            variant="outline-warning"
            title="تایید"
            onClick={handleSubmit((data) => handleCreateTask(data))}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateWorkFlow;
