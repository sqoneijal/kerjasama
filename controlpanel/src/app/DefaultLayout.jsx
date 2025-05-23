"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import AppHeader from "./components/AppHeader";
import AppSidebar from "./components/AppSidebar";

export default function DefaultLayout({ children }) {
   const { status } = useSession();

   useEffect(() => {
      if (status !== "loading" && status === "unauthenticated") {
         signIn("keycloak");
      }
      return () => {
         return null;
      };
   }, [status]);

   return (
      <div>
         <AppSidebar />
         <div className="wrapper d-flex flex-column min-vh-100">
            <AppHeader />
            <div className="body flex-grow-1">{children}</div>
         </div>
      </div>
   );
}
