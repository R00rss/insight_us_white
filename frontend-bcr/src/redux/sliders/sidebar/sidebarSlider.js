import { createSlice } from "@reduxjs/toolkit";
import usersIcon from "../../../assets/icons/sidebar/users.svg";
import fileIcon from "../../../assets/icons/sidebar/file.svg";
import messageIcon from "../../../assets/icons/sidebar/message-circle.svg";
import calendarIcon from "../../../assets/icons/sidebar/calendar.svg";
import questionIcon from "../../../assets/icons/sidebar/question.svg";
import settingsIcon from "../../../assets/icons/sidebar/settings.svg";
import monitorIcon from "../../../assets/icons/sidebar/monitor.svg";
const initialState = {
  value: {
    encuesta_general: {
      state: true,
      display_name: "Dashboard General",
      icon: usersIcon,
    },
    encuesta_lealtad: {
      state: false,
      display_name: "Encuesta de lealtad",
      icon: messageIcon,
      subMenu: {
        general: {
          state: true,
          display_name: "General",
          icon: calendarIcon,
        },
        voz_del_cliente: {
          state: false,
          display_name: "Voz del cliente",
          icon: calendarIcon,
        },
      },
    },
    cliente_fantasma: {
      state: false,
      display_name: "Cliente fantasma",
      icon: monitorIcon,
      subMenu: {
        general: {
          state: true,
          display_name: "General",
          icon: calendarIcon,
        },
        detalle_por_agencia: {
          state: false,
          display_name: "Detalle",
          icon: calendarIcon,
        },
        manage_cliente_fantasma: {
          state: false,
          display_name: "Ingreso",
          icon: calendarIcon,
        },
      },
    },
    help: {
      state: false,
      display_name: "Ayuda",
      icon: questionIcon,
    },
    settings: {
      state: false,
      display_name: "Configuración",
      icon: settingsIcon,
    },
  },
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    sidebarChangeSelected: (state, action) => {
      Object.keys(state.value).forEach((optionKey) => {
        state.value[optionKey].state =
          optionKey === action.payload.selectedItem;
      });
    },
    sidebarChangeSelectedSubmenuItem: (state, action) => {
      Object.keys(
        state.value[`${action.payload.selectedItem}`].subMenu
      ).forEach((subOptionKey) => {
        state.value[`${action.payload.selectedItem}`].subMenu[
          `${subOptionKey}`
        ].state = subOptionKey === action.payload.selectedSubitem;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { sidebarChangeSelected, sidebarChangeSelectedSubmenuItem } =
  sidebarSlice.actions;

export default sidebarSlice.reducer;
