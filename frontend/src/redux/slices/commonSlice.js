import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin: true,
};

const commonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        saveLoginPageState: (state, action) => {
            const { isLogin } = action.payload;
            return {
                ...state,
                isLogin: isLogin,
            }
        },
    },
});

export const { saveLoginPageState } = commonSlice.actions;

export default commonSlice.reducer;
