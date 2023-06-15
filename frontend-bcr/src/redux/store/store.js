import { configureStore } from "@reduxjs/toolkit";
import sideBarSlider from "../sliders/sidebar/sidebarSlider";
import filterBarSlider from "../sliders/filterBar/filterBarSlider";
import dataFiltroSlider from "../sliders/dataFiltrobar/datafiltroSlider";
import dataExcel from "../sliders/data/dataFromExcel";
import userData from "../sliders/Login/userSlider";
export const store = configureStore({
  reducer: {
    sideBarSelection: sideBarSlider,
    filterBarSelection: filterBarSlider,
    dataFilter: dataFiltroSlider,
    dataExcel: dataExcel,
    userData: userData,
  },
});
