import blank_thumbnail from "@/assets/images/blank-thumbnail.jpg";
import { Each } from "@helpers";
import moment from "moment";
import React, { useLayoutEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const Sidebar = () => {
   const { module } = useSelector((e) => e.redux);

   const [state, setState] = useState({
      beritaUtama: {},
      beritaLainnya: [],
      banyakDilihat: [],
   });

   useLayoutEffect(() => {
      if (typeof module.terbaru !== "undefined") {
         const sorted = [...module.terbaru].sort((a, b) => new Date(b.create_at) - new Date(a.create_at));
         const utama = sorted[0];
         const lainnya = sorted.slice(1, 5);

         setState({
            beritaUtama: typeof utama === "undefined" ? {} : utama,
            beritaLainnya: lainnya,
            banyakDilihat: module.banyakDilihat,
         });
      }
      return () => {};
   }, [module]);

   return (
      <React.Fragment>
         <div className="panel_inner review-inner">
            <div className="panel_header">
               <h4>
                  <strong>Berita</strong> Terbaru
               </h4>
            </div>
            <div className="panel_body">
               {Object.keys(state.beritaUtama) && (
                  <div className="more-post">
                     <Link to={`/berita/read/${state.beritaUtama.slug}`} className="news-image">
                        <Image
                           fluid
                           src={state.beritaUtama.thumbnail ? state.beritaUtama.thumbnail : blank_thumbnail}
                           alt={state.beritaUtama.judul}
                           style={{ width: 312, height: 197 }}
                        />
                     </Link>
                     <div className="post-text">
                        <h4>{state.beritaUtama.judul}</h4>
                        <ul className="authar-info d-flex flex-wrap">
                           <li>
                              <i className="ti-timer" /> {moment(state.beritaUtama.create_at).format("DD MMMM YYYY")}
                           </li>
                           <li className="like">
                              <a href="#">
                                 <i className="ti-thumb-up" /> {state.beritaUtama.likes} likes
                              </a>
                           </li>
                        </ul>
                     </div>
                  </div>
               )}
               <div className="mt-3 news-list">
                  <Each
                     of={state.beritaLainnya}
                     render={(row) => (
                        <div className="news-list-item" key={row.slug}>
                           <div className="img-wrapper">
                              <Link to={`/berita/read/${row.slug}`} className="thumb">
                                 <Image fluid src={row.thumbnail ? row.thumbnail : blank_thumbnail} alt={row.judul} />
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
                                 <li className="like">
                                    <a href="#">
                                       <i className="ti-thumb-up" /> {row.likes} likes
                                    </a>
                                 </li>
                              </ul>
                           </div>
                        </div>
                     )}
                  />
               </div>
            </div>
         </div>
         <div className="tabs-wrapper">
            <ul className="nav nav-tabs">
               <li className="nav-item" role="presentation">
                  <button className="nav-link border-0 active">Banyak Dilihat</button>
               </li>
            </ul>
            <div className="tab-content">
               <div className="tab-pane fade show active">
                  <div className="most-viewed">
                     <ul className="content tabs-content">
                        <Each
                           of={state.banyakDilihat}
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
      </React.Fragment>
   );
};
export default Sidebar;
