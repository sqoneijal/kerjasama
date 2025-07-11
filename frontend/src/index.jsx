import { configureStore } from "@reduxjs/toolkit";
import "core-js";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import App from "./App";
import redux from "./redux";

const store = configureStore({
   reducer: { redux },
});

createRoot(document.getElementById("root")).render(
   <Provider store={store}>
      <BrowserRouter>
         <Toaster position="top-center" />
         <App />
      </BrowserRouter>
   </Provider>
);

if (process.env.NODE_ENV === "development") {
   new EventSource("/esbuild").addEventListener("change", () => location.reload());
}
