import axios from 'axios'

const baseURL = import.meta.env.VITE_URL;

export const login = (postData) => {
    return axios.post(`${baseURL}api/Account/Login`, postData);
};