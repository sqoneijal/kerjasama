import { Col } from "react-bootstrap";

const SocialMedia = () => {
   return (
      <Col>
         <div className="d-flex top-left-menu">
            <ul className="align-items-center d-flex flex-wrap">
               <li>
                  <div className="header-social">
                     <ul className="align-items-center d-flex gap-2">
                        <li>
                           <a href="#">
                              <i className="fab fa-facebook-f" />
                           </a>
                        </li>
                        <li>
                           <a href="#">
                              <i className="fab fa-twitter" />
                           </a>
                        </li>
                        <li>
                           <a href="#">
                              <i className="fab fa-instagram" />
                           </a>
                        </li>
                        <li>
                           <a href="#">
                              <i className="fab fa-youtube" />
                           </a>
                        </li>
                     </ul>
                  </div>
               </li>
            </ul>
         </div>
      </Col>
   );
};
export default SocialMedia;
