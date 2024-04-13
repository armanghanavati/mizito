import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    shoModal: { show: false },
};

//  -> Reset overtime form
// export const handleGetAllUser = createAsyncThunk(
//     "CreateSlice/handleGetAllUser",
//     (obj, { dispatch }) => {
//     }
// );

//  -> Slice overtime
const createSl = createSlice({
    name: "create",
    initialState,
    reducers: {
        RsetShowCreateModal: (state, { payload }) => {
            return { ...state, shoModal: payload };
        },
    },

});

export const {
    RsetShowCreateModal,
} = createSl.actions;
export default createSl.reducer;