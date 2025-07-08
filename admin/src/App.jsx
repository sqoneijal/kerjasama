import "@/assets/css/custom.css";
import { setInit } from "@/redux";
import { CContainer, CSpinner } from "@coreui/react";
import { initKeycloak, post } from "@helpers";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Routing from "./Routing";
import "./scss/style.css";

const AppSidebar = React.lazy(() => import("@components/AppSidebar"));
const AppHeader = React.lazy(() => import("@components/AppHeader"));

const App = () => {
   const { init } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   const validateUserLogin = (user) => {
      post("/home/validateuser", { username: user.preferred_username }).then((res) => {
         const { data } = res;
         if (!data) return handleLogout();
      });
   };

   useEffect(() => {
      initKeycloak().then((res) => {
         if (!res) {
            return;
         }
         const { keycloak, user } = res;
         validateUserLogin(user);
         dispatch(setInit({ user, user_modified: user.preferred_username, token: { Authorization: `Bearer ${keycloak.token}` } }));
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
