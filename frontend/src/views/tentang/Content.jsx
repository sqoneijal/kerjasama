import { PageSuspense } from "@helpers";
import DOMPurify from "dompurify";
import { decode } from "html-entities";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const Sidebar = React.lazy(() => import("./Sidebar"));

const Content = () => {
   const { module } = useSelector((e) => e.redux);
   const { tentang } = module;

   return (
      <React.Suspense fallback={<PageSuspense />}>
         <Container>
            <Row className="row-m">
               <Col md={8} className="col-p main-content">
                  <div className="post_details_inner">
                     <div className="post_details_block">
                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(decode(tentang.content)) }} />
                     </div>
                  </div>
               </Col>
               <Sidebar />
            </Row>
         </Container>
      </React.Suspense>
   );
};
export default Content;
