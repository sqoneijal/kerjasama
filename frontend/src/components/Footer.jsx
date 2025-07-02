import landmark_uin from "@/assets/images/landmark-uinar-scaled.jpg";
import LogoUIN from "@/assets/images/LogoUIN";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
   return (
      <footer className="main-footer bg-img" style={{ backgroundImage: `url(${landmark_uin})` }}>
         <Container className="position-relative z-1">
            <Row className="g-3">
               <Col md={3}>
                  <LogoUIN />
               </Col>
               <Col md={9}>
                  <p className="text-white mb-0">
                     It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The
                     point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed.
                  </p>
               </Col>
            </Row>
         </Container>
      </footer>
   );
};
export default Footer;
