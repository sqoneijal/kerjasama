import React from "react";
import { Route, Routes } from "react-router";
import routes from "./routes";

const Routing = () => {
   return (
      <main className="page_main_wrapper" style={{ transform: "none" }}>
         <React.Suspense fallback={<div className="se-pre-con" />}>
            <Routes>
               {routes.map((item) => {
                  document.title = item.name;
                  return item.element && <Route path={item.path} element={<item.element />} />;
               })}
            </Routes>
         </React.Suspense>
      </main>
   );
};
export default Routing;
