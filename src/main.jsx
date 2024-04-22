import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./routes";
import "./index.css";
import store from "./store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router />
  </Provider>
);
