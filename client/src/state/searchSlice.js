import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResults: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload.users;
    },
  },
});

export const { setSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
