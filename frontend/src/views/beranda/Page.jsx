import { setModule } from "@/redux";
import { get } from "@helpers";
import { useLayoutEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import BeritaDalamNegeri from "./BeritaDalamNegeri";
import BeritaInternasional from "./BeritaInternasional";
import BeritaTrending from "./BeritaTrending";
import Sidebar from "./Sidebar";

const Page = () => {
   const { module } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   const getData = () => {
      get("/beranda/getdata").then((res) => {
         const { data } = res;
         dispatch(setModule({ ...module, ...data }));
      });
   };

   useLayoutEffect(() => {
      document.title = "Selamat Datang Di Kerjasama UINAR";
      getData();
      return () => {};
   }, []);

   return (
      <>
         <BeritaTrending />
         <Container className={typeof module.trending !== "undefined" && Object.keys(module.trending) > 0 ? "" : "mt-3"}>
            <Row className="row-m">
               <Col sm={7} md={8} className="col-p main-content">
                  <BeritaDalamNegeri />
                  <BeritaInternasional />
               </Col>
               <Col sm={5} md={4} className="col-p rightSidebar">
                  <Sidebar />
               </Col>
            </Row>
         </Container>
      </>
   );
};
export default Page;
