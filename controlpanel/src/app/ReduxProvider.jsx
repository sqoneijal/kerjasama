"use client";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import store from "./store";

export default function ReduxProvider({ children }) {
   return <Provider store={configureStore({ reducer: { store } })}>{children}</Provider>;
}
