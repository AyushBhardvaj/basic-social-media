import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friends: [],
};

const friendSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    setFriends: (state, action) => {
      state.friends = action.payload.friends;
    },
  },
});

export const { setFriends } = friendSlice.actions;
export default friendSlice.reducer;
