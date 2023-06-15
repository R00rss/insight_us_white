import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: {
    Agencia: "",
    "Tipos de indicador": "",
    Periodo: "",
    Indicadores: "",
  },
};

export const filterBarSlider = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    changeAllValuesFilterBar: (state, action) => {
      state.value = action.payload.values;
    },
    changeSelectedBarFilterBar: (state, action) => {
      state.value[action.payload.key] = action.payload.value;
    },
  },
});

export const { changeAllValuesFilterBar, changeSelectedBarFilterBar } =
  filterBarSlider.actions;

export default filterBarSlider.reducer;
