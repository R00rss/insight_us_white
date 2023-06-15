import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    id: "",
    name: "",
    role: "",
    userName: "",
    exp: "",
  },
};

export const userData = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.value = action.payload.data;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserData } = userData.actions;

export default userData.reducer;
