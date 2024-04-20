import { RsetShowLoading } from '../hooks/slices/main';
import { store } from '../hooks/store'

const asyncWrapper = (fn) => {
  return (...args) => {
    return fn(...args).catch((error) => {
      store.dispatch(RsetShowLoading({ value: false }))
      console.error(error);
      throw error;
    });
  };
};

export default asyncWrapper;
//   const asyncWrapper = (fn) => {
//     return async (req, res, next) => {
//       try {
//         await fn(req, res, next);
//       } catch (error) {
//           next(error)
//       }
//     };
//   };

//   module.exports = asyncWrapper;
