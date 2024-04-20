import React, { useEffect, useState } from 'react';
import asyncWrapper from '../../utils/asyncWrapper';
import { serTasks } from '../../services/masterServices';

const AllTasks = ({ boardId }) => {
  const [getTaskSubTasksViewModels, setGetTaskSubTasksViewModels] = useState([]);

  const handleGetTasks = asyncWrapper(async () => {
    const resTasks = await serTasks(boardId);
    console.log(resTasks?.data?.data?.[0]?.taskSubTasksViewModels);
    setGetTaskSubTasksViewModels(resTasks?.data?.data?.[0]?.taskSubTasksViewModels);
  });

  useEffect(() => {
    handleGetTasks();
  }, []);

  const fixTaskSubWorkFlow = getTaskSubTasksViewModels?.map((item) => {
    const filterTaskWorkFlow = item?.workFlow?.filter((id)=>  )
    console.log(filterTaskWorkFlow);
  });

  console.log(getTaskSubTasksViewModels);

  return <div>AllTasks</div>;
};

export default AllTasks;
