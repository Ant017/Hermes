import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatListLength: 0,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    saveChatListState: (state, action) => {
      const { chatListLength } = action.payload;
      return {
        ...state,
        chatListLength: chatListLength,
      };
    },
  },
});

export const { saveChatListState } = chatSlice.actions;

export default chatSlice.reducer;
