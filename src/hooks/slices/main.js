import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  messageModal: { title: '', show: false },
  showToast: { title: '', bg: '', show: false },
  showModal: { showModal: false, typeModal: 0, showModal2: false, typeModal2: 0 },
  showQuestionModal: { show: false, answer: false },
  allUsers: [],
  showLoading: { btnName: '', value: false },
  allEnums: {},
  projStatus: {},
  projType: {},
  projPriorty: {},
  projRole: {}
};

//  -> Reset overtime form
// export const handleGetAllUser = createAsyncThunk(
//     "MainSlice/handleGetAllUser",
//     (obj, { dispatch }) => {
//     }
// );

//  -> Slice overtime
const MainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    RsetShowLoading: (state, actions) => {
      return { ...state, showLoading: actions.payload };
    },
    RsetAllUsers: (state, actions) => {
      return { ...state, allUsers: actions.payload };
    },
    RsetAllEnums: (state, { payload }) => {
      return { ...state, allEnums: payload };
    },
    RsetProjPriorty: (state, { payload }) => {
      return { ...state, projPriorty: payload };
    },
    RsetProjStatus: (state, { payload }) => {
      return { ...state, projStatus: payload };
    },
    RsetProjType: (state, { payload }) => {
      return { ...state, projType: payload };
    },
    RsetProjRole: (state, { payload }) => {
      return { ...state, projRole: payload };
    }
  }
});

export const {
  RsetProjPriorty,
  RsetProjType,
  RsetProjStatus,
  RsetAllEnums,
  RsetFromDate,
  RsetShowLoading,
  RsetAllUsers,
  RsetProjRole
} = MainSlice.actions;
export default MainSlice.reducer;
