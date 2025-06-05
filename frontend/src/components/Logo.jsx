import LogoUIN from "@/assets/images/LogoUIN";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router";

const Logo = () => {
   return (
      <div className="d-md-block d-none header-mid">
         <Container>
            <Row className="align-items-center">
               <Col sm={4}>
                  <Link to="/">
                     <LogoUIN />
                  </Link>
               </Col>
            </Row>
         </Container>
      </div>
   );
};
export default Logo;
