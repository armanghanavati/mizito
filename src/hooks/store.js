import { configureStore } from '@reduxjs/toolkit';
import homeSlice from './slices/homeSlice';
import MainSlice from './slices/main';
import createSlice from './slices/createSlice';

const rootReducer = {
  home: homeSlice,
  main: MainSlice,
  create: createSlice
};

export const store = configureStore({
  reducer: rootReducer
});