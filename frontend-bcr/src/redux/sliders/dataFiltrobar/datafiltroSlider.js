import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    date: new Date().toISOString().slice(0, 10),
    export: false,
    agencias: [],
    optionDate: {
      daily: false,
      weekly: false,
      monthly: false,
    },
  },
};

export const datafiltroSlice = createSlice({
  name: "datafiltro",
  initialState,
  reducers: {
    setValueByKeyDataFiltro: (state, action) => {
      const selectedKey = action.payload.key;
      if (selectedKey in state.value) {
        state.value[action.payload.key] = action.payload.value;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setValueByKeyDataFiltro } = datafiltroSlice.actions;

export default datafiltroSlice.reducer;
