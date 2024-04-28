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
                <Row className="bg-light d-flex py-2 my-4 rounded-4 justify-content-center">
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



// <Row className="bg-light d-flex py-2 my-4 rounded-4 justify-content-center">
// <Col xs="12" sm="12" md="12" xl="12" className=" ">
//   {tax?.productList?.map((item: any) => {
//     console.log(item);
//     return (
//       <Accordion defaultActiveKey="0">
//         <Col xs="12" xl="12" className="rounded my-2">
//           <Accordion.Item
//             style={{
//               transform: "scale(-1, 1)",
//               direction: "ltr",
//             }}
//             eventKey="0"
//           >
//             <Accordion.Header className="fs-5 fw-bold lh-lg textPrimary py-1 px-2 my-1">
//               <span
//                 className="text-dark headParaphFit"
//                 style={{
//                   transform: "scale(-1, 1)",
//                   textAlign: "end",
//                 }}
//               >
//                 {` ردیف ${
//                   item?.settlementType ||
//                   item?.serviceOrProductDescription
//                 }`}
//               </span>
//             </Accordion.Header>
//             <Accordion.Body
//               style={{
//                 transform: "scale(-1, 1)",
//                 direction: "rtl",
//               }}
//               className="textJustify mx-2 lh-lg textPrimary"
//             >
//               <Row>
//                 <Col
//                   md="12"
//                   xl="4"
//                   className="my-4 d-flex mx-3"
//                 >
//                   {item?.totalItemsPrice !== undefined && (
//                     <>
//                       <span className="text-dark fw-bold">
//                         {" "}
//                         مبلغ کل کالا(ریال):
//                       </span>
//                       <span className="text-secondary me-1 ">
//                         {" "}
//                         {item?.totalItemsPrice}
//                       </span>
//                     </>
//                   )}
//                 </Col>
//               </Row>
//             </Accordion.Body>
//           </Accordion.Item>
//         </Col>
//       </Accordion>
//     );
//   })}
// </Col>
// </Row>