import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    dataFilter: {},
    dataGlobal: {},
  },
};

export const dataExcelSlice = createSlice({
  name: "datafiltro",
  initialState,
  reducers: {
    setValuesDataFromExcel: (state, action) => {
      const selectedKey = action.payload.key;
      state.value[selectedKey] = action.payload.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setValuesDataFromExcel } = dataExcelSlice.actions;

export default dataExcelSlice.reducer;
