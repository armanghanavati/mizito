import axios from 'axios';

const baseURL = import.meta.env.VITE_URL;

export const login = (postData) => {
  return axios.post(`${baseURL}api/Account/Login`, postData);
};

export const serAllEnums = () => {
  return axios.get(`${baseURL}api/Enum/AllEnums`);
};

// دریافت اطلاعات کاربر
export const getUserRole = () => {
  return axios.get(`${baseURL}api/Account/UserDetailsByToken`, null);
};

export const getAllUsers = () => {
  return axios.get(`${baseURL}api/Account/GetAllUsers`);
};

export const createProject = (postData) => {
  return axios.post(`${baseURL}api/ProjectController/CreateProject`, postData);
};

export const serviceProjects = () => {
  return axios.get(`${baseURL}api/ProjectController/Projects`);
};

export const serDeleteProjects = (projectid) => {
  return axios.delete(`${baseURL}api/ProjectController/DeleteProject?projectid=${projectid}`);
};

export const serViceEditProject = (postData) => {
  return axios.get(`${baseURL}api/ProjectController/EditProject?projectid=${postData}`);
};

// تایید ویرایش پروژه
export const serPutEditProject = (postData) => {
  return axios.put(`${baseURL}api/ProjectController/EditProject`, postData);
};

export const serCreateBoardGet = (id) => {
  return axios.get(`${baseURL}api/BoardController/CreateBoard?projectid=${id}`);
};

// ایجاد بورد
export const serCreateBoardPost = (postData) => {
  return axios.post(`${baseURL}api/BoardController/CreateBoard`, postData);
};

// دریافت تمامی بوردهای مخصوص کاربر
export const serGetBoards = (postData) => {
  return axios.get(`${baseURL}api/BoardController/Boards?projectid=${postData}`);
};

export const serDeleteBoard = (boardId) => {
  return axios.delete(`${baseURL}api/BoardController/DeleteBoard?boardid=${boardId}`);
};

export const serEditBoard = (boardId) => {
  return axios.get(`${baseURL}api/BoardController/EditBoard?boardid=${boardId}`);
};

export const serPutEditBoard = (postData) => {
  return axios.put(`${baseURL}api/BoardController/EditBoard`, postData);
};

// لیست تمامی ورک فلوها
export const serWorkFlows = () => {
  return axios.get(`${baseURL}api/WorkFlowController/WorkFlows`);
};

export const serGetWorkFlow = (wfId) => {
  return axios.get(`${baseURL}api/WorkFlowController/EditWorkFlows?workflowid=${wfId}`);
};

export const serPutEditWorkFlow = (postData) => {
  return axios.put(`${baseURL}api/WorkFlowController/EditWorkFlow`, postData);
};

// اضافه کردن یک ستون به بورد
export const addNewWorkFlowToBoard = (postData) => {
  return axios.post(`${baseURL}api/WorkFlowController/AddNewWorkFlowToBoard`, postData);
};

// لیست تمامی ستون ها بورد
export const serTasks = (id) => {
  return axios.get(`${baseURL}api/TaskController/Tasks?boardid=${id}`);
};
// لیست تمامی ساب تسک ها
export const serGetSubTasks = (id) => {
  return axios.get(`${baseURL}api/SubTaskController/SubTasks?taskid=${id}`);
};

// ایجاد وظیفه
export const serCreateTask = (postData) => {
  return axios.post(`${baseURL}api/TaskController/CreateTask`, postData);
};

// ویرایش وظیفه
export const serGetEditTask = (taskId) => {
  return axios.get(`${baseURL}api/TaskController/EditTask?taskid=${taskId}`);
};

// تایید ویرایش وظیفه
export const serPutEditTask = (postData) => {
  return axios.put(`${baseURL}api/TaskController/EditTask`, postData);
};

// حذف وظیفه
export const serDeleteTask = (tasId) => {
  return axios.delete(`${baseURL}api/TaskController/DeleteTask?taskid=${tasId}`);
};

// حذف ستون
export const serDeleteWorkFlow = (workFlowId) => {
  return axios.delete(`${baseURL}api/WorkFlowController/DeleteWorkFlow?wfid=${workFlowId}`);
};

// حذف ساب تسک
export const serDeleteSubTask = (subTaskId) => {
  return axios.delete(`${baseURL}api/SubTaskController/DeleteSubTask?subTaskid=${subTaskId}`);
};

// دریافت کامنت ها
export const serComments = (commentId) => {
  return axios.get(`${baseURL}api/CommentController/Comments?parentId=${commentId}`);
};

// ارسال کامنت ها
export const serCreateComment = (postData) => {
  console.log(postData);
  return axios.post(`${baseURL}api/CommentController/CreateComment`, postData);
};

// ویرایش کامنت ها
export const serEditCommentPut = (postData) => {
  return axios.put(`${baseURL}api/CommentController/EditComment`, postData);
};

// دریافت ویرایش کامنت ها
export const serEditCommentGet = (id) => {
  return axios.get(`${baseURL}api/CommentController/EditComment?commentid=${id}`);
};

// حذف کامنت
export const serDeleteCommented = (cmtId) => {
  return axios.delete(`${baseURL}api/CommentController/DeleteComment?commentid=${cmtId}`);
};

// ارسال وظیفه فرعی
export const serCreateSubTask = (postData) => {
  return axios.post(`${baseURL}api/SubTaskController/CreateSubTask`, postData);
};

// ارسال وظیفه فرعی
export const serSubtaskGet = (taskId) => {
  return axios.get(`${baseURL}api/SubTaskController/SubTasks?taskid=${taskId}`);
};

// دریافت ویرایش وظیفه فرعی
export const serEditGetSubtask = (subTaskId) => {
  return axios.get(`${baseURL}api/SubTaskController/EditSubTask?subTaskid=${subTaskId}`);
};

// دریافت ویرایش وظیفه فرعی
export const serPutEditSubTask = (postData) => {
  return axios.put(`${baseURL}api/SubTaskController/EditSubTask `, postData);
};

export const serGetWorkFlows = (boardId) => {
  return axios.get(`${baseURL}api/WorkFlowController/BoardWorkFlows?boardid=${boardId}`);
};

// ایجاد فایل
export const serCreateAttachment = (postData) => {
  return axios.post(`${baseURL}api/AttachmentController/CreateAttachment`, postData);
};
