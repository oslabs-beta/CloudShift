import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

//we might need styles here

const container = document.getElementById("root");
if (container){
  const root = createRoot(container);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );} else {
    throw new ReferenceError("Could not find root element.")
  }

