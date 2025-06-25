import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router";

const Title = () => {
   return (
      <div className="page-title">
         <Container>
            <Row className="align-items-center">
               <Col>
                  <h1 className="mb-sm-0">
                     <strong>Daftar</strong> Kemitraan
                  </h1>
               </Col>
               <Col xs={12} className="col-sm-auto">
                  <Breadcrumb>
                     <li className="breadcrumb-item d-inline-block">
                        <Link to={"/"}>Beranda</Link>
                     </li>
                     <Breadcrumb.Item active>Kemitraan</Breadcrumb.Item>
                  </Breadcrumb>
               </Col>
            </Row>
         </Container>
      </div>
   );
};
export default Title;
