import { PageSuspense } from "@helpers";
import React from "react";
import { Container, Row } from "react-bootstrap";

const PostInner = React.lazy(() => import("./PostInner"));

const Content = () => {
   return (
      <React.Suspense fallback={<PageSuspense />}>
         <main className="page_main_wrapper">
            <Container>
               <Row className="row-m">
                  <PostInner />
               </Row>
            </Container>
         </main>
      </React.Suspense>
   );
};
export default Content;
