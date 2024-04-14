import axios from 'axios'

const baseURL = import.meta.env.VITE_URL;

export const login = (postData) => {
    return axios.post(`${baseURL}api/Account/Login`, postData);
};

export const createProject = (postData) => {
    return axios.post(`${baseURL}api/ProjectController/CreateProject`, postData);
};

export const serviceProjects = () => {
    return axios.get(`${baseURL}api/ProjectController/Projects`);
};

export const serViceEditProject = () => {
    return axios.get(`${baseURL}api/ProjectController/EditProject`);
}

// www.auto.fanwebco.com/taskmanager_api/api/ProjectController/Projects