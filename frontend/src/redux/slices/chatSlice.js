import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatListLength: 0,
  selectedOption: "All",
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

    saveSelectedOption: (state, action) => {
      const { selectedOption } = action.payload;
      return {
        ...state,
        selectedOption: selectedOption,
      };
    },
  },
});

export const { saveChatListState, saveSelectedOption } = chatSlice.actions;

export default chatSlice.reducer;
