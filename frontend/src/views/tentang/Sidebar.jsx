import { Col } from "react-bootstrap";
import { Link, useParams } from "react-router";

const Sidebar = () => {
   const { slug } = useParams();

   return (
      <Col md={4} className="col-p rightSidebar">
         <div className="tabs-wrapper">
            <div className="tab-content">
               <div className="tab-pane fade show active">
                  <div className="most-viewed">
                     <ul className="content tabs-content">
                        {slug !== "profil" && (
                           <li>
                              <Link to="/tentang/profil">Profil</Link>
                           </li>
                        )}
                        {slug !== "strukturorganisasi" && (
                           <li>
                              <Link to="/tentang/strukturorganisasi">Struktur Organisasi</Link>
                           </li>
                        )}
                        {slug !== "sekretariat" && (
                           <li>
                              <Link to="/tentang/sekretariat">Sekretariat</Link>
                           </li>
                        )}
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </Col>
   );
};
export default Sidebar;
