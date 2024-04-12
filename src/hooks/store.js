import { configureStore } from "@reduxjs/toolkit";
// import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import filesCloudSlice from "../components/slices/filesCloudSlice";
import HomeSlice from "./slices/HomeSlice";
import MainSlice from './slices/main'

const rootReducer = {
    HomeSlice: HomeSlice,
    main: MainSlice
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