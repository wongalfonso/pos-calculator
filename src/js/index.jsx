import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./App/App";
import store from "./rootStore"

if (process.env.NODE_ENV !== 'production') {
  console.log('Development Mode');
}

render(
  <Provider store = { store }>
    <App/>
  </Provider>,
  document.getElementById("app")
)