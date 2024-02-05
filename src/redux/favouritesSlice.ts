import { createSlice } from "@reduxjs/toolkit";
import { GetCurrent } from "../models/getCurrent";

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: [] as GetCurrent[],
  reducers: {
    addFavourite: (state, action) => {
      state.unshift(action.payload);
    },
    removeFavourite: (state, action) => {
      const indexToRemove = state.findIndex(
        (item) => item.location?.name === action.payload.location.name
      );
      if (indexToRemove !== -1) {
        state.splice(indexToRemove, 1);
      }
    },
  },
});

export const { addFavourite, removeFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;
