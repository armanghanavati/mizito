import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    messageModal: { title: "", show: false },
    showToast: { title: "", bg: "", show: false },
    showModal: { showModal: false, typeModal: 0, showModal2: false, typeModal2: 0 },
    showQuestionModal: { show: false, answer: false },
    showLoading: { btnName: "", value: false },
    showLoadingBtn: "",
};

//  -> Reset overtime form
// export const handleGetAllUser = createAsyncThunk(
//     "MainSlice/handleGetAllUser",
//     (obj, { dispatch }) => {
//     }
// );

//  -> Slice overtime
const MainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
        RsetShowLoading: (state, actions) => {
            return { ...state, showLoading: actions.payload }
        },
    },

});



export const {
    RsetFromDate,
} = MainSlice.actions;
export default MainSlice.reducer;
