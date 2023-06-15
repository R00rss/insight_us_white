import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RoutesComponent from "./Routes";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RoutesComponent />
  </Provider>
  // </React.StrictMode>
);
