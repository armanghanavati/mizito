import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import StringHelpers from '../../helpers/StringHelpers';
import Input from '../../components/Input';
import Btn from '../../components/Btn';
import asyncWrapper from '../../utils/asyncWrapper';
import { serEditCommentGet, serEditCommentPut } from '../../services/masterServices';
import { useForm } from 'react-hook-form';
import ComboBox from '../../components/ComboBox';
import { useLocation } from 'react-router-dom';

const Comment = ({ allCommets, fixUsers, setAllCommets }) => {
  const [editComment, setEditComment] = useState({});
  const {
    control,
    setValue, reset,
    handleSubmit,
    formState: { errors }
  } = useForm({ reValidateMode: 'onChange' });

  const handleSerEditComments = asyncWrapper(async (data, index) => {
    const res = await serEditCommentGet(data?.id)
    console.log(res?.data?.commentViewModel);
    setEditComment(res?.data?.commentViewModel)
  })

  const handleEditComment = (data, index) => {
    console.log(data?.id);
    handleSerEditComments(data, index)
    let temporaryList = []
    allCommets?.map((itemComments, indexComments) => {
      if (indexComments === index) {
        temporaryList.push({
          ...itemComments,
          editMode: !itemComments?.editMode
        })
      } else {
        temporaryList.push({
          ...itemComments,
          editMode: false
        })
      }
    }
    )
    setAllCommets(temporaryList)
  }

  const handleEditTextComment = asyncWrapper(async (cmt, data) => {
    const postData = {
      id: cmt?.id,
      text: data?.text,
      commentMentionUsersViewModels: [""],
      attachmentCreateViewModels: []
    }
    const res = await serEditCommentPut(postData)
    console.log(res);
  })

  useEffect(() => {
    reset({ ...editComment })
  }, [editComment]);

  return (
    <div className="my-2 bg-light p-3">
      {allCommets?.map((cmt, index) => {
        return (
          <Row className="py-1 ">
            <div className='' >
              <span className="text-secondary ms-2">{cmt?.creatorFullName}</span>
              <span className="text-secondary">
                {StringHelpers?.convertDateFa(cmt?.creationDateTime)}
              </span>
            </div>
            <Col className='d-flex justify-content-end'>
              <i
                onClick={() => handleEditComment(cmt, index)}
                className=" text-secondary bi bi-pencil mx-2 cursorPointer" />
              <i className="text-secondary bi bi-arrow-left-circle-fill cursorPointer" />
            </Col>
            <Row className="my-1 d-flex justify-content-between">
              {cmt?.editMode === true ?
                <Col className='d-flex align-items-end mb-4' >
                  <Input xs={2} xl={6} control={control} name="text" />
                  <ComboBox options={fixUsers} control={control} placeHolder='منشن' className=" mx-2" xl={4} xxl={1} />
                  <Btn
                    xxl={2}
                    loadingName="sendText"
                    className="mx-1 "
                    icon={<i className="d-flex align-items-center bi ms-1 bi-send" />}
                    variant="primary"
                    title="ویرایش"
                    onClick={handleSubmit((data) => handleEditTextComment(cmt, data))}
                  />
                </Col>
                :
                <small className='mb-4' > {cmt?.text}</small>
              }
              <Col xxl="12" className='' >
                ارسال به:
              </Col>

            </Row>
            <hr />
          </Row>
        );
      })}
    </div>
  );
};

export default Comment;