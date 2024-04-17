import axios from 'axios';
import { store } from '../hooks/store';

axios.interceptors.request.use(
  function (config) {
    console.log(config);
    if (!!localStorage.getItem('tokenId')) {
      config.headers.Authorization = `Bearer ${localStorage.getItem('tokenId')}`;
    }
    config.headers.post = {
      'Content-Type': 'application/json'
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async function (response) {
    if (
      !!response?.data?.ErrorCode &&
      response?.data?.ErrorCode !== 0 &&
      response?.data?.ErrorCode !== 5 &&
      response?.data?.ErrorCode !== 10 &&
      response?.data?.ErrorCode !== 11
    ) {
      // store.dispatch(
      //     dispatch(RsetShowToast({ show: true, title: response?.data?.ErrorDesc || "مشکلی در سرور به وجود آمده است.", bg: "danger" }))
      // )
    }
    return response;
  },

  async function (error) {
    const expectedErrors =
      error.response && error.response.status >= 400 && error.response.status < 500;

    if (!expectedErrors) {
      // store.dispatch(
      //     dispatch(RsetShowToast({ show: true, title: "مشکلی در سرور به وجود آمده است.", bg: "danger" }))
      // )
      return;
    }
  }
);
