import moment from "moment";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router";

const SubFooter = () => {
   return (
      <div className="sub-footer">
         <Container>
            <Row className="align-items-center g-1 g-sm-3">
               <Col className="text-center text-sm-start">
                  <div className="copy">Copyright ©️ {moment().format("YYYY")} Kerjasama - UIN Ar Raniry.</div>
               </Col>
               <Col sm={"auto"}>
                  <ul className="footer-nav list-unstyled text-center mb-0">
                     <li className="list-inline-item">
                        <Link to="/">Beranda</Link>
                     </li>
                     <li className="list-inline-item">
                        <Link to="/kemitraan">Kemitraan</Link>
                     </li>
                  </ul>
               </Col>
            </Row>
         </Container>
      </div>
   );
};
export default SubFooter;
