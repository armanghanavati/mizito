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

export const serEditBoard = (postData) => {
  return axios.get(`${baseURL}api/BoardController/EditBoard?boardid=${postData}`);
};

export const serPutEditBoard = (postData) => {
  return axios.put(`${baseURL}api/BoardController/EditBoard`, postData);
};

// لیست تمامی ورک فلوها
export const serWorkFlows = () => {
  return axios.get(`${baseURL}api/WorkFlowController/WorkFlows`);
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

// دریافت کامنت ها
export const serComments = (commentId) => {
  return axios.post(`${baseURL}api/CommentController/Comments?taskOrsubtaskid=${commentId}`);
};