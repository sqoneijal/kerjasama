import { CContainer, CSpinner } from "@coreui/react";
import { Suspense } from "react";

export default function ReferensiLayout({ children }) {
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
