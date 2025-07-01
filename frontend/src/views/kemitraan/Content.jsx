import { PageSuspense } from "@helpers";
import React from "react";
import { Container, Row } from "react-bootstrap";

const Lists = React.lazy(() => import("./Lists"));

const Content = () => {
   return (
      <React.Suspense fallback={<PageSuspense />}>
         <main className="page_main_wrapper">
            <Container>
               <Row className="row-m">
                  <Lists />
               </Row>
            </Container>
         </main>
      </React.Suspense>
   );
};
export default Content;
