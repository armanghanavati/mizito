import React from 'react';
import { Modal, Form, Row } from 'react-bootstrap'
import Btn from '../../components/Btn'
import { useSelector, useDispatch } from 'react-redux'
import { RsetShowCreateModal } from '../../hooks/slices/createSlice';
import { Controller, useForm } from 'react-hook-form';
import Datepicker from '../../components/Datepicker';
import ComboBox from '../../components/ComboBox';
import SwitchCase from '../../components/SwitchCase';
import Input from '../../components/Input'

const CreateModal = () => {
  const { create } = useSelector((state) => state)
  const dispatch = useDispatch()
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    getValues
  } = useForm({ reValidateMode: 'onChange' });

  return <>
    <Modal size='lg' show={create?.shoModal?.show} onHide={() => dispatch(RsetShowCreateModal({ show: false }))}>
      <Modal.Header className='bg-danger text-white' closeButton>
        <Modal.Title className='' >ایجاد وظیفه</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
          >
            <Datepicker
              name='createDateTime'
              label="تاریخ ساخت:"
              control={control}
            />
            <Datepicker
              name='dueDateTime'
              label="تاریخ شروع:"
              control={control}
            />
            <Datepicker
              name='endDateTime'
              label="تاریخ پایان:"
              control={control}
            />
            <ComboBox name='projectPriority' control={control} label='اولویت:' />
            <ComboBox name='projectStatus' control={control} label='وضعیت:' />
            <ComboBox name='projectType' control={control} label='نوع:' />
            <SwitchCase name="sprintNumber" range label="سرعت پروژه:" />
            <SwitchCase label="وضعیت پیوست:" />
            <Row>
              <Input xl={6} label="ایجاد توسط:" control={control} />
              <ComboBox xl={6} control={control} label='اختصاص به:' />
            </Row>

            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <>
                  <Form.Label className='d-flex justify-content-end'>:توضیحات</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </>
              )}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Btn variant="secondary" title="لغو" onClick={() => dispatch(RsetShowCreateModal({ show: false }))} />
        <Btn variant="primary" title="تایید" onClick={() => dispatch(RsetShowCreateModal({ show: false }))} />
      </Modal.Footer>
    </Modal >
  </>;
};

export default CreateModal;
