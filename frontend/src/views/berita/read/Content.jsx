import blank_thumbnail from "@/assets/images/blank-thumbnail.jpg";
import DOMPurify from "dompurify";
import { decode } from "html-entities";
import moment from "moment/moment";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import BeritaLainnya from "./BeritaLainnya";
import Sidebar from "./Sidebar";

const Content = () => {
   const { module } = useSelector((e) => e.redux);
   const { berita } = module;

   return (
      <Container>
         <Row className="row-m">
            <Col md={8} className="col-p main-content">
               <div className="post_details_inner">
                  <div className="post_details_block">
                     <figure className="social-icon">
                        <Image fluid src={berita.thumbnail ? berita.thumbnail : blank_thumbnail} alt={berita.judul} />
                        <div>
                           <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}`} target="_blank">
                              <i className="fab fa-facebook-f" />
                           </a>
                           <a href={`https://x.com/intent/tweet?url=${encodeURIComponent(location.href)}`} target="_blank">
                              <i className="fab fa-twitter" />
                           </a>
                           <a href={`https://t.me/share/url?url=${encodeURIComponent(location.href)}`} target="_blank">
                              <i className="fab fa-telegram" style={{ backgroundColor: "#0088CC" }} />
                           </a>
                           <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(location.href)}`} target="_blank">
                              <i className="fab fa-whatsapp" style={{ backgroundColor: "#25D366" }} />
                           </a>
                        </div>
                     </figure>
                     <h2>{berita.judul}</h2>
                     <ul className="authar-info d-flex flex-wrap">
                        <li>{moment(berita.create_at).format("DD MMMM YYYY")}</li>
                        <li>{berita.views} views</li>
                     </ul>
                     <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(decode(berita.content)) }} />
                  </div>
               </div>
               <BeritaLainnya />
            </Col>
            <Sidebar />
         </Row>
      </Container>
   );
};
export default Content;
