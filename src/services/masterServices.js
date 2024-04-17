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
  return axios.post(`${baseURL}api/Account/UserDetailsByToken`, null);
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

export const serCreateBoard = (postData) => {
  return axios.get(`${baseURL}api/BoardController/CreateBoard`);
};

// دریافت تمامی بوردهای مخصوص کاربر
export const serGetBoards = (postData) => {
  return axios.get(`${baseURL}api/BoardController/Boards?projectid=${postData}`);
};

export const serEditBoard = (postData) => {
  return axios.get(`${baseURL}api/BoardController/EditBoard?boardid=${postData}`);
};

// www.auto.fanwebco.com/taskmanager_api/api/ProjectController/Projects
