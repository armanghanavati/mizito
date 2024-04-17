const asyncWrapper = (fn) => {
  return (...args) => {
    return fn(...args).catch((error) => {
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
