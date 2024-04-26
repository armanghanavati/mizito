import React, { useEffect, useState } from 'react';
import { Col, Container } from 'react-bootstrap';
import asyncWrapper from '../../utils/asyncWrapper';
import { serComments } from '../../services/masterServices';
import { RsetShowToast } from '../../hooks/slices/main';
import { useDispatch } from 'react-redux';
import StringHelpers from '../../helpers/StringHelpers';

const Comment = ({ taskItem, allCommets }) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   handleGetComments();
  // }, []);

  console.log(allCommets);

  return (
    <div className="my-2 bg-light p-3">
      {allCommets?.map((cmt) => {
        return (
          <Col className="py-1">
            <div>
              <span className=" text-secondary ms-2">{cmt?.creatorFullName}</span>
              <span className="fw- text-secondary">
                {StringHelpers?.convertDateFa(cmt?.creationDateTime)}
              </span>
            </div>
            <div className="my-2">
              <small> {cmt?.text}</small>
            </div>
            <hr />
          </Col>
        );
      })}
    </div>
  );
};

export default Comment;
