import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./routes";
import "./index.css";
import store from "./store";
import { Provider } from "react-redux";
import { createStandaloneToast } from "@chakra-ui/react";

const { ToastContainer, toast } = createStandaloneToast();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router />
    <ToastContainer />
  </Provider>
);

toast({
  description: "Unable to create user account.",
  duration: 2000,
});
