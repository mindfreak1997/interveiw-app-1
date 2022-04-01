import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./Store/configureStore";
import { asyncGetCandidates } from "./Actions/candidates";

const store = configureStore();
store.subscribe(() => {
  console.log(store.getState());
  console.log("local", localStorage.getItem("status"));
});
if (localStorage.getItem("status")) {
  store.dispatch(asyncGetCandidates());
}
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
