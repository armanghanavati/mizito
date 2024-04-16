import axios from 'axios'

const baseURL = import.meta.env.VITE_URL;

export const login = (postData) => {
    return axios.post(`${baseURL}api/Account/Login`, postData);
};

export const projectRole = () => {
    return axios.get(`${baseURL}api/Enum/ProjectRole`);
};

export const projectStatus = () => {
    return axios.get(`${baseURL}api/Enum/ProjectStatus`);
};

export const projectType = () => {
    return axios.get(`${baseURL}api/Enum/ProjectType`);
};

export const projectPriority = () => {
    return axios.get(`${baseURL}api/Enum/ProjectPriority`);
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
}

// www.auto.fanwebco.com/taskmanager_api/api/ProjectController/Projects