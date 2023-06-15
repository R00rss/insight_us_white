import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    id: "",
    username: "",
    tipo_usuario: "",
    name: "",
  },
};

export const userSlider = createSlice({
  name: "user",
  initialState,
  reducers: {
    setInitialValueUser: (state, action) => {
      state.value = action.payload.userData;
      // Object.keys(state.value).forEach(
      //   (userKey) => (state.value[userKey] = action.payload.userData[userKey])
      // );
    },
  },
});

// Action creators are generated for each case reducer function
export const { setInitialValueUser } = userSlider.actions;

export default userSlider.reducer;
