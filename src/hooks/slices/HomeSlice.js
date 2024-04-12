import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
};

//  -> Reset overtime form
// export const handleGetAllUser = createAsyncThunk(
//     "homeSlice/handleGetAllUser",
//     (obj, { dispatch }) => {
//     }
// );

//  -> Slice overtime
const HomeSlice = createSlice({
    name: "homeSlice",
    initialState,
    reducers: {
        // RsetFormErrors: (state, { payload }) => {
        //     return { ...state, formErrors: payload };
        // },
    },

});



export const {
    RsetFromDate,
} = HomeSlice.actions;
export default HomeSlice.reducer;
