import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './App';
import { Provider } from "react-redux";
import { store } from "./app/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <HomePage />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

