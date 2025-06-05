import { Each } from "@helpers";
import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const Sidebar = () => {
   const { module } = useSelector((e) => e.redux);
   const { banyakDilihat } = module;

   return (
      <Col md={4} className="col-p rightSidebar">
         <div className="tabs-wrapper">
            <ul className="nav nav-tabs">
               <li className="nav-item">
                  <button className="nav-link border-0 active">Banyak Dilihat</button>
               </li>
            </ul>
            <div className="tab-content">
               <div className="tab-pane fade show active">
                  <div className="most-viewed">
                     <ul className="content tabs-content">
                        <Each
                           of={banyakDilihat}
                           render={(row, index) => (
                              <li key={row.slug}>
                                 <span className="count">0{index + 1}</span>
                                 <span className="text">
                                    <Link to={`/berita/read/${row.slug}`}>{row.judul}</Link>
                                 </span>
                              </li>
                           )}
                        />
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </Col>
   );
};
export default Sidebar;
