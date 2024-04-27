import axios from 'axios';
import { store } from '../hooks/store';
import { RsetShowToast } from '../hooks/slices/main';

axios.interceptors.request.use(
  function (config) {
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
    console.log(response);
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
    console.log(error);
    try {
      const expectedErrors =
        error.response &&
        error.response.status !== 401 &&
        error.response.status >= 400 &&
        error.response.status < 500;
      if (!!expectedErrors) {
        store.dispatch(
          RsetShowToast({
            show: true,
            title: error?.response?.data?.msg || 'مشکلی در سرور به وجود آمده است لطفا دوباره امتحان کنید', bg: 'danger'
          })
        );
      }
    } catch (error) {
      console.log(error);
      const { message } = error;

      store.dispatch(
        RsetShowToast({
          show: true,
          title:
            error.response.data.message || 'مشکلی در سرور به وجود آمده است لطفا دوباره امتحان کنید',
          bg: 'danger'
        })
      );
      return Promise.reject(message);
    }
  }
);
