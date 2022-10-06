import { createSlice } from "@reduxjs/toolkit";

const urnSlice = createSlice({
  name: "urn",
  initialState: {
    urnLink: null,
  },
  reducers: {
    setUrnLink(state, action) {
      state.urnLink = action.payload;
    },
  },
});

const { actions, reducer } = urnSlice;
export const { setUrnLink } = actions;
export default reducer;
