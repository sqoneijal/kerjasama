import { CSpinner } from "@coreui/react";
import React from "react";
import { Route, Routes } from "react-router";
import routes from "./routes";

const Routing = () => {
   return (
      <React.Suspense fallback={<CSpinner color="primary" />}>
         <Routes>
            {routes.map((item) => {
               return item.element && <Route path={item.path} element={<item.element />} />;
            })}
         </Routes>
      </React.Suspense>
   );
};
export default Routing;
