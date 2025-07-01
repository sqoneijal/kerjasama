import blank_thumbnail from "@/assets/images/blank-thumbnail.jpg";
import { Each } from "@helpers";
import moment from "moment";
import { Col, Image, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const chunkArray = (arr, size) => Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));

const BeritaLainnya = () => {
   const { module } = useSelector((e) => e.redux);
   const { beritaLainnya } = module;

   const grouped = chunkArray(beritaLainnya, 3);

   return (
      <div className="post-inner post-inner-2">
         <div className="align-items-center d-flex post-head">
            <h2 className="title">
               <strong>Berita</strong> Lainnya
            </h2>
            <div className="d-flex gap-1 ms-auto">
               <div className="swiper-button-prev related-button-prev position-relative top-0 m-0 start-0 end-0 rounded-circle" />
               <div className="swiper-button-next related-button-next position-relative top-0 m-0 start-0 end-0 rounded-circle" />
            </div>
         </div>

         <div className="post-body">
            <Swiper
               modules={[Navigation]}
               navigation={{
                  nextEl: ".related-button-next",
                  prevEl: ".related-button-prev",
               }}
               loop={false}>
               {grouped.map((group, i) => (
                  <SwiperSlide key={i}>
                     <div className="news-grid-2">
                        <Row className="row-margin">
                           <Each
                              of={group}
                              render={(row) => (
                                 <Col xs={6} sm={4} md={4} className="col-padding" key={row.slug}>
                                    <div className="grid-item">
                                       <div className="grid-item-img">
                                          <Link to={`/berita/read/${row.slug}`}>
                                             <Image
                                                fluid
                                                src={row.thumbnail ? row.thumbnail : blank_thumbnail}
                                                alt={row.judul}
                                                style={{ width: 211, height: 145 }}
                                             />
                                          </Link>
                                       </div>
                                       <h5>
                                          <Link to={`/berita/read/${row.slug}`} className="title">
                                             {row.judul}
                                          </Link>
                                       </h5>
                                       <ul className="authar-info d-flex flex-wrap">
                                          <li>{moment(row.create_at).format("DD MMMM YYYY")}</li>
                                          <li className="hidden-sm">{row.likes} likes</li>
                                       </ul>
                                    </div>
                                 </Col>
                              )}
                           />
                        </Row>
                     </div>
                  </SwiperSlide>
               ))}
            </Swiper>
         </div>
      </div>
   );
};
export default BeritaLainnya;
