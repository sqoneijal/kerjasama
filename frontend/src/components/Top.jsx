import { Container, Row } from "react-bootstrap";
import SocialMedia from "./SocialMedia";

const Top = () => {
   return (
      <div className="header-top">
         <Container>
            <Row>
               <SocialMedia />
               <div className="col-auto ms-auto">
                  <div className="header-right-menu">
                     <ul className="d-flex justify-content-end">
                        <li>
                           <a href="/admin">Login</a>
                        </li>
                     </ul>
                  </div>
               </div>
            </Row>
         </Container>
      </div>
   );
};
export default Top;
