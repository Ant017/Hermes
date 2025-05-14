import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatListLength: 0,
  selectedOption: "All",
  chatId: "",
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

    saveChatId: (state, action) => {
      const { chatId } = action.payload;
      return {
        ...state,
        chatId: chatId,
      };
    },
  },
});

export const { saveChatListState, saveSelectedOption, saveChatId } = chatSlice.actions;

export default chatSlice.reducer;
