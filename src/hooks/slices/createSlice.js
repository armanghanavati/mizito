import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  shoModal: { show: false },
  fieldsEditProject: {}
};

//  -> Reset overtime form
// export const handleGetAllUser = createAsyncThunk(
//     "CreateSlice/handleGetAllUser",
//     (obj, { dispatch }) => {
//     }
// );

//  -> Slice overtime
const createSl = createSlice({
  name: 'create',
  initialState,
  reducers: {
    RsetShowCreateModal: (state, { payload }) => {
      return { ...state, shoModal: payload };
    },
    RsetFieldsEditProject: (state, { payload }) => {
      return { ...state, fieldsEditProject: payload };
    }
  }
});

export const { RsetShowCreateModal, RsetFieldsEditProject } = createSl.actions;
export default createSl.reducer;
