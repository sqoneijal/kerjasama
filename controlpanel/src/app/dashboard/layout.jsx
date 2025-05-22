"use client";

import { setModule } from "@/app/store";
import { CContainer, CSpinner } from "@coreui/react";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";

export default function DashboardLayout({ children }) {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(setModule({ pageType: "", pageButton: {} }));
      return () => {};
   }, []);

   return (
      <CContainer fluid>
         <Suspense
            fallback={
               <div className="pt-3 text-center">
                  <CSpinner color="primary" variant="grow" />
               </div>
            }>
            {children}
         </Suspense>
      </CContainer>
   );
}
