import blank_thumbnail from "@/assets/images/blank-thumbnail.jpg";
import { Each, PageSuspense, get } from "@helpers";
import DOMPurify from "dompurify";
import { decode } from "html-entities";
import moment from "moment";
import { useCallback, useEffect, useRef, useState } from "react";
import { Col, Image } from "react-bootstrap";
import toast from "react-hot-toast";
import { Link } from "react-router";

const PostInner = () => {
   const loaderRef = useRef(null);

   const [state, setState] = useState({
      pageLoading: true,
      items: [],
      page: 0,
      loading: false,
      hasMore: true,
   });

   const { page, pageLoading, loading, hasMore } = state;

   const fetchData = (pageNumber) => {
      setState((prev) => ({ ...prev, loading: true }));
      get(`/berita/getdata?page=${pageNumber}`)
         .then((res) => {
            if (res.status !== 201 && typeof res.data !== "undefined") {
               toast.error("Terjadi sesuatu kesalahan!!!");
               return;
            }

            const { data } = res;
            if (data.length === 0) {
               setState((prev) => ({ ...prev, hasMore: false }));
            } else {
               setState((prev) => ({ ...prev, items: [...prev.items, ...data] }));
            }
         })
         .finally(() => setState((prev) => ({ ...prev, pageLoading: false, loading: false })));
   };

   useEffect(() => {
      document.title = "Daftar Berita";
      fetchData(page);
      return () => {};
   }, [page]);

   const handleObserver = useCallback(
      (entries) => {
         const target = entries[0];
         if (target.isIntersecting && !loading && hasMore) {
            setState((prev) => ({ ...prev, page: prev.page + 1 }));
         }
      },
      [loading, hasMore]
   );

   useEffect(() => {
      const option = {
         root: null,
         rootMargin: "20px",
         threshold: 1.0,
      };
      const observer = new IntersectionObserver(handleObserver, option);
      if (loaderRef.current) observer.observe(loaderRef.current);

      return () => {
         if (loaderRef.current) observer.unobserve(loaderRef.current);
      };
   }, [handleObserver]);

   return pageLoading ? (
      <PageSuspense />
   ) : (
      <Col sm={12} md={12} className="col-p main-content">
         <div className="post-inner">
            <div className="post-body">
               <Each
                  of={state.items}
                  render={(row) => (
                     <div className="news-list-item articles-list" key={row.slug}>
                        <div className="img-wrapper">
                           <Link to={`/berita/read/${row.slug}`} className="thumb">
                              <Image fluid className="w-100" src={row.thumbnail ? row.thumbnail : blank_thumbnail} alt={row.judul} />
                           </Link>
                        </div>
                        <div className="post-info-2">
                           <h4>
                              <Link to={`/berita/read/${row.slug}`} className="title">
                                 {row.judul}
                              </Link>
                           </h4>
                           <ul className="authar-info d-flex flex-wrap">
                              <li>
                                 <i className="ti-timer" /> {moment(row.create_at).format("DD-MM-YYYY")}
                              </li>
                              <li>
                                 <i className="ti-thumb-up" /> 15 likes
                              </li>
                           </ul>
                           <p className="d-lg-block d-none" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(decode(row.content)) }} />
                        </div>
                     </div>
                  )}
               />
            </div>
            {loading && <PageSuspense />}
            <div ref={loaderRef} style={{ height: 20 }} />
         </div>
      </Col>
   );
};
export default PostInner;
