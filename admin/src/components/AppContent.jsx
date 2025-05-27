import routes from "@/routes";
import { CContainer, CSpinner } from "@coreui/react";
import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const AppContent = () => {
   return (
      <CContainer className="px-4" fluid>
         <Suspense fallback={<CSpinner color="primary" />}>
            <Routes>
               {routes.map((route) => {
                  return route.element && <Route path={route.path} name={route.name} element={<route.element />} />;
               })}
               <Route path="/" element={<Navigate to="dashboard" replace />} />
            </Routes>
         </Suspense>
      </CContainer>
   );
};
export default AppContent;
