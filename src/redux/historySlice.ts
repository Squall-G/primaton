import { createSlice } from "@reduxjs/toolkit";
import { GetCurrent } from "../models/getCurrent";

const MAX_LENGTH = 5;

const historySlice = createSlice({
  name: "history",
  initialState: [] as GetCurrent[],
  reducers: {
    addHistory: (state, action) => {
      state.unshift(action.payload);

      if (state.length > MAX_LENGTH) {
        state.pop();
      }
    },
  },
});

export const { addHistory } = historySlice.actions;
export default historySlice.reducer;
