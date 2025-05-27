import "@/assets/css/custom.css";
import { CSpinner, useColorModes } from "@coreui/react";
import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./scss/style.css";

const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

const App = () => {
   const { isColorModeSet, setColorMode } = useColorModes("coreui-free-react-admin-template-theme");
   const storedTheme = useSelector((state) => state.theme);

   useEffect(() => {
      const urlParams = new URLSearchParams(window.location.href.split("?")[1]);
      const theme = urlParams.get("theme") && urlParams.get("theme").match(/^[A-Za-z0-9\s]+/)[0];
      if (theme) {
         setColorMode(theme);
      }

      if (isColorModeSet()) {
         return;
      }

      setColorMode(storedTheme);
   }, []);

   return (
      <HashRouter>
         <React.Suspense
            fallback={
               <div className="pt-3 text-center">
                  <CSpinner color="primary" variant="grow" />
               </div>
            }>
            <Toaster position="top-center" />
            <Routes>
               <Route path="*" name="Home" element={<DefaultLayout />} />
            </Routes>
         </React.Suspense>
      </HashRouter>
   );
};
export default App;
