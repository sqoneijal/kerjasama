import blank_thumbnail from "@/assets/images/blank-thumbnail.jpg";
import { Each } from "@helpers";
import DOMPurify from "dompurify";
import { decode } from "html-entities";
import moment from "moment/moment";
import { useLayoutEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const BeritaInternasional = () => {
   const { module } = useSelector((e) => e.redux);

   const [state, setState] = useState({
      beritaUtama: {},
      beritaLainnya: [],
   });

   useLayoutEffect(() => {
      if (typeof module.luarNegeri !== "undefined") {
         const sorted = [...module.luarNegeri].sort((a, b) => new Date(b.create_at) - new Date(a.create_at));
         const utama = sorted[0];
         const lainnya = sorted.slice(1, 5);

         setState({
            beritaUtama: typeof utama === "undefined" ? {} : utama,
            beritaLainnya: lainnya,
         });
      }
      return () => {};
   }, [module]);

   return (
      <div className="post-inner">
         <div className="align-items-center d-flex post-head">
            <h2 className="title">
               <strong>Berita</strong> Internasional
            </h2>
         </div>
         <div className="post-body">
            {typeof module.luarNegeri !== "undefined" && (
               <Row>
                  <Col md={6} sm={12} className="bord-right">
                     <article>
                        <figure>
                           <Link to={`/berita/read/${state.beritaUtama.slug}`}>
                              <Image
                                 fluid
                                 src={state.beritaUtama.thumbnail ? state.beritaUtama.thumbnail : blank_thumbnail}
                                 style={{ height: 242, width: 345 }}
                                 alt={state.beritaUtama.judul}
                              />
                           </Link>
                        </figure>
                        <div className="post-info">
                           <h3>
                              <Link to={`/berita/read/${state.beritaUtama.slug}`}>{state.beritaUtama.judul}</Link>
                           </h3>
                           <ul className="authar-info d-flex flex-wrap">
                              <li>
                                 <i className="ti-timer" /> {moment(state.beritaUtama.create_at).format("DD MMMM YYYY")}
                              </li>
                              <li className="like">
                                 <i className="ti-thumb-up" /> {state.beritaUtama.likes} likes
                              </li>
                           </ul>
                           <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(decode(state.beritaUtama.content)) }} />
                        </div>
                     </article>
                  </Col>
                  <Col md={6} sm={12}>
                     <div className="news-list">
                        <Each
                           of={state.beritaLainnya}
                           render={(row) => (
                              <div className="news-list-item" key={row.slug}>
                                 <div className="img-wrapper">
                                    <Link to={`/berita/read/${row.slug}`} className="thumb">
                                       <Image
                                          fluid
                                          src={row.thumbnail ? row.thumbnail : blank_thumbnail}
                                          alt={row.judul}
                                          style={{ width: 100, height: 74 }}
                                       />
                                    </Link>
                                 </div>
                                 <div className="post-info-2">
                                    <h5>
                                       <Link to={`/berita/read/${row.slug}`} className="title">
                                          {row.judul}
                                       </Link>
                                    </h5>
                                    <ul className="authar-info d-flex flex-wrap">
                                       <li>
                                          <i className="ti-timer" /> {moment(row.create_at).format("DD MMMM YYYY")}
                                       </li>
                                       <li className="d-lg-block d-none like">
                                          <i className="ti-thumb-up" /> {row.likes} likes
                                       </li>
                                    </ul>
                                 </div>
                              </div>
                           )}
                        />
                     </div>
                  </Col>
               </Row>
            )}
         </div>
         <div className="post-footer">
            <Row className="thm-margin">
               <Col md={12} className="thm-padding">
                  <Link to={`/berita/jenis/luarnegeri`} className="more-btn">
                     Lainnya Berita Internasional
                  </Link>
               </Col>
            </Row>
         </div>
      </div>
   );
};
export default BeritaInternasional;
