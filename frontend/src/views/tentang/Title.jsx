import { useLayoutEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const Title = () => {
   const { module } = useSelector((e) => e.redux);

   useLayoutEffect(() => {
      document.title = module.tentang.nama;
      return () => {};
   }, [module]);

   return (
      <div className="page-title">
         <Container>
            <Row className="align-items-center">
               <Col xs={12} className="col-sm-auto">
                  <nav aria-label="breadcrumb">
                     <ol className="breadcrumb d-inline-block">
                        <li className="breadcrumb-item">
                           <Link to={`/`}>Beranda</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                           {module.tentang.nama}
                        </li>
                     </ol>
                  </nav>
               </Col>
            </Row>
         </Container>
      </div>
   );
};
export default Title;
