import React, { useEffect, useState } from 'react';
import { Container, Modal, Form, Row } from 'react-bootstrap';
import Btn from '../../components/Btn';
import { useSelector, useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import asyncWrapper from '../../utils/asyncWrapper';
import { serGetSubTasks } from '../../services/masterServices';
import SubTasks from '../subTasks';

const TasksModal = ({ setShowTasksModal
    , showTasksModal, taskItem }) => {
    const { create, main } = useSelector((state) => state);
    const [allSubTask, setAllSubTask] = useState();
    const dispatch = useDispatch();
    const {
        control,
        handleSubmit,
        register,
        reset,
        watch,
        formState: { errors },
        getValues
    } = useForm({ reValidateMode: 'onChange' });

    const handleSubTasks = asyncWrapper(async () => {
        const res = await serGetSubTasks(taskItem?.id)
        if (res?.data?.code === 1) {
            console.log(res?.data?.data);
            setAllSubTask(res?.data?.data);
        } else {
            dispatch(RsetShowToast({ show: true, title: res?.data?.msg, bg: 'danger' }));
        }
    })
    useEffect(() => {
        handleSubTasks()
    }, []);

    return (
        <>
            <Modal
                className="p-0"
                size="lg"
                show={showTasksModal}
                onHide={() => setShowTasksModal(false)}>
                <Modal.Header
                    style={{ transform: 'scale(-1, 1)', direction: 'ltr' }}
                    className="d-flex bg-primary text-white justify-content-center"
                    closeButton>
                    <span style={{ transform: 'scale(-1, 1)' }} className="fw-bold">
                        وظیفه
                    </span>
                </Modal.Header>
                <Modal.Body>
                    <SubTasks allSubTask={allSubTask} />
                </Modal.Body>
                <Modal.Footer>
                    <Btn
                        variant="outline-warning"
                        title="بستن"
                        onClick={() => setShowTasksModal(false)}
                    />
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default TasksModal;