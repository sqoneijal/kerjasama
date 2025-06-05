import { Each } from "@helpers";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const BeritaTrending = () => {
   const { module } = useSelector((e) => e.redux);

   return (
      typeof module.trending !== "undefined" &&
      Object.keys(module.trending) > 0 && (
         <Container>
            <div className="newstricker_inner">
               <div className="trending">
                  <strong>Trending</strong>
               </div>
               <div className="news-ticker-wrp position-relative">
                  <Swiper
                     modules={[Navigation]}
                     navigation={{
                        nextEl: ".news-ticker-next",
                        prevEl: ".news-ticker-prev",
                     }}
                     loop={true}>
                     <Each
                        of={module.trending}
                        render={(row) => (
                           <SwiperSlide>
                              <Link to={`/berita/read/${row.slug}`}>{row.judul}</Link>
                           </SwiperSlide>
                        )}
                     />
                  </Swiper>
                  <div className="news-ticker-buttons d-flex end-0 gap-1 position-absolute top-0">
                     <div className="end-0 m-0 news-ticker-prev position-relative rounded-circle start-0 swiper-button-prev top-0" />
                     <div className="end-0 m-0 news-ticker-next position-relative rounded-circle start-0 swiper-button-next top-0" />
                  </div>
               </div>
            </div>
         </Container>
      )
   );
};
export default BeritaTrending;
