import { configureStore } from "@reduxjs/toolkit";
// import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import filesCloudSlice from "../components/slices/filesCloudSlice";
import HomeSlice from "./slices/homeSlice";
import MainSlice from './slices/main'
import createSlice from "./slices/createSlice";

const rootReducer = {
    home: HomeSlice,
    main: MainSlice,
    create: createSlice
};

export const store = configureStore({
    reducer: rootReducer,
})

// export const store = configureStore({
//     reducer: rootReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: false,
//         }),
// });