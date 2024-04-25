import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import asyncWrapper from '../../utils/asyncWrapper';
import { serComments } from '../../services/masterServices';
import { RsetShowToast } from '../../hooks/slices/main';
import { useDispatch } from 'react-redux';

const Comment = ({ taskItem }) => {
  const dispatch = useDispatch();
  const handleGetComments = asyncWrapper(async () => {
    const res = await serComments(taskItem?.id);
    if (res?.data?.code === 1) {
      console.log(res);
    }
  });

  useEffect(() => {
    handleGetComments();
  }, []);

  return <div className="my-2 bg-light p-3">dddd</div>;
};

export default Comment;
