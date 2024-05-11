import React from 'react';
import { useSelector } from 'react-redux';

const Partners = () => {
  const { main } = useSelector((state) => state);

  const fixAllUsers = Object.values(main?.allUsers)?.map((user) => {
    return (
      <div className="d-flex align-items-center me-3 p-2">
        <span>
          <i className="d-flex text-secondary align-items-center bi bi-person-circle font25" />
        </span>
        <span className="me-2">{user?.fullName}</span>
      </div>
    );
  });
  return <div className="bg-light my-4">{fixAllUsers}</div>;
};

export default Partners;
