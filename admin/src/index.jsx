import { configureStore } from "@reduxjs/toolkit";
import "core-js";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import redux from "./redux";

const store = configureStore({
   reducer: { redux },
});

createRoot(document.getElementById("root")).render(
   <Provider store={store}>
      <App />
   </Provider>
);
