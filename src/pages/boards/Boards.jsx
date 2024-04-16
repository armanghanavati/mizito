import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Boards = () => {
    const [stepOneHead, setStepOneHead] = useState("مرحله اول");
    const [stepTwoHead, setStepTwoHead] = useState("مرحله دوم");
    const [stepThirdHead, setStepThirdHead] = useState("مرحله سوم");
    const [stepFourthHead, setStepFourthHead] = useState("مرحله چهارم");
    return (
        <Row className='mx-1 my-3' >
            <Col className=' justify-content-center' xxl="2" >
                <Col xxl="2" className="d-flex justify-content-center text-white px-2 col-xxl-12 py-1 rounded bg-warning" >
                    {stepOneHead}
                </Col>
                <div className='my-4 rounded bg-white shadow' >
                    Hello
                </div>
            </Col>
            <Col xxl="2">
                <Col xxl="1" className="d-flex justify-content-center text-white px-2 col-xxl-12 py-1 rounded bg-danger" >
                    {stepTwoHead}
                </Col>
            </Col>
            <Col xxl="2">
                <Col xxl="1" className="d-flex justify-content-center text-white px-2 col-xxl-12 py-1 rounded bg-primary" >
                    {stepThirdHead}
                </Col>
            </Col>
            <Col xxl="2">
                <Col xxl="1" className="d-flex justify-content-center text-white px-2 col-xxl-12 py-1 rounded bg-info" >
                    {stepFourthHead}
                </Col>
            </Col>
        </Row >
    )
}

export default Boards