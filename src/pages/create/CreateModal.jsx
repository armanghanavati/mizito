import React from 'react';
import { Modal, Form } from 'react-bootstrap'
import Btn from '../../components/Btn'
import { useSelector, useDispatch } from 'react-redux'
import { RsetShowCreateModal } from '../../hooks/slices/createSlice';

const CreateModal = () => {
  const { create } = useSelector((state) => state)
  const dispatch = useDispatch()
  return <>
    <Modal show={create?.shoModal?.show} onHide={() => dispatch(RsetShowCreateModal({ show: false }))}>
      <Modal.Header closeButton>
        <Modal.Title>ایجاد وظیفه</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              autoFocus
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>Example textarea</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Btn variant="secondary" title="Close" onClick={() => dispatch(RsetShowCreateModal({ show: false }))} />
        <Btn variant="primary" title="Save Changes" onClick={() => dispatch(RsetShowCreateModal({ show: false }))} />
      </Modal.Footer>
    </Modal >
  </>;
};

export default CreateModal;
