import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import StringHelpers from '../../helpers/StringHelpers';
import SwitchCase from '../../components/SwitchCase';
import { useForm } from 'react-hook-form';

const SubTasks = ({ allSubTask }) => {
    const {
        control,
        handleSubmit,
        register,
        reset,
        watch,
        formState: { errors },
        getValues
    } = useForm({ reValidateMode: 'onChange' });

    useEffect(() => {
        // const postData = [
        //     {
        //         "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        //         "name": "string",
        //         "description": "string",
        //         "priority": 0,
        //         "workFlow": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        //         "dueDateTime": "2024-04-22T09:24:05.239Z",
        //         "doneStatus": true,
        //         "doneDateTime": "2024-04-22T09:24:05.239Z",
        //         "remainderDateTime": "2024-04-22T09:24:05.239Z",
        //         "taskId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        //         "task": "string"
        //     }
        // ]
    }, []);

    const showAllSubTask = allSubTask?.map((subTask) => {
        return (
            <Container fluid >
                <Row className='d-flex justify-content-between' >
                    <Col className='d-flex justify-content-between ' xs={12} md={12}>
                        <SwitchCase
                            control={control}
                            name=""
                            className=" me-0"
                            label={subTask?.name}
                        />
                        <span>
                            {StringHelpers?.convertDateFa(subTask?.dueDateTime)}
                        </span>
                    </Col>

                </Row>
            </Container>
        )
    }
    )

    return (
        <div className='border rounded py-2' >{showAllSubTask}</div>
    )
}

export default SubTasks