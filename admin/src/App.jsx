import "@/assets/css/custom.css";
import { setInit } from "@/redux";
import { CContainer, CSpinner } from "@coreui/react";
import { initKeycloak } from "@helpers";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Routing from "./Routing";
import "./scss/style.css";

const AppSidebar = React.lazy(() => import("@components/AppSidebar"));
const AppHeader = React.lazy(() => import("@components/AppHeader"));

const App = () => {
   const { init } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   useEffect(() => {
      initKeycloak().then((res) => {
         if (res) {
            const { keycloak, user } = res;
            dispatch(setInit({ user, user_modified: user.preferred_username, token: { Authorization: `Bearer ${keycloak.token}` } }));
         }
      });
   }, []);

   return (
      <React.Suspense
         fallback={
            <div className="pt-3 text-center">
               <CSpinner color="primary" variant="grow" />
            </div>
         }>
         <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
               <AppHeader />
               <div className="body flex-grow-1">
                  <CContainer className="px-4" fluid>
                     {Object.keys(init).length > 0 && <Routing />}
                  </CContainer>
               </div>
            </div>
         </div>
      </React.Suspense>
   );
};
export default App;
