import { PageSuspense } from "@helpers";
import React from "react";
import { Container, Row } from "react-bootstrap";

const PostInner = React.lazy(() => import("./PostInner"));

const Content = () => {
   return (
      <React.Suspense fallback={<PageSuspense />}>
         <main className="page_main_wrapper">
            <Container>
               <Row className="row-m">
                  <PostInner />

                  <div className="col-sm-5 col-md-4 col-p rightSidebar">
                     <div className="align-items-center d-flex fs-6 justify-content-center mb-1 text-center social-counter-total">
                        <i className="fa-solid fa-heart text-primary me-1"></i> Join <span className="fw-bold mx-1">2.5M</span> Followers
                     </div>

                     <div className="social-media-inner">
                        <ul className="g-1 row social-media">
                           <li className="col-4">
                              <a href="#" className="rss">
                                 <i className="fas fa-rss"></i>
                                 <div>2,035</div>
                                 <p>Subscribers</p>
                              </a>
                           </li>
                           <li className="col-4">
                              <a href="#" className="fb">
                                 <i className="fab fa-facebook-f"></i>
                                 <div>3,794</div>
                                 <p>Fans</p>
                              </a>
                           </li>
                           <li className="col-4">
                              <a href="#" className="insta">
                                 <i className="fab fa-instagram"></i>
                                 <div>941</div>
                                 <p>Followers</p>
                              </a>
                           </li>
                           <li className="col-4">
                              <a href="#" className="you_tube">
                                 <i className="fab fa-youtube"></i>
                                 <div>7,820</div>
                                 <p>Subscribers</p>
                              </a>
                           </li>
                           <li className="col-4">
                              <a href="#" className="twitter">
                                 <i className="fab fa-twitter"></i>
                                 <div>1,562</div>
                                 <p>Followers</p>
                              </a>
                           </li>
                           <li className="col-4">
                              <a href="#" className="pint">
                                 <i className="fab fa-pinterest-p"></i>
                                 <div>1,310</div>
                                 <p>Followers</p>
                              </a>
                           </li>
                        </ul>
                     </div>

                     <div className="add-inner">
                        <img src="assets/images/add320x270-1.jpg" className="img-fluid" alt="" />
                     </div>

                     <div className="tabs-wrapper">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                           <li className="nav-item" role="presentation">
                              <button
                                 className="nav-link border-0 active"
                                 id="most-viewed"
                                 data-bs-toggle="tab"
                                 data-bs-target="#most-viewed-pane"
                                 type="button"
                                 role="tab"
                                 aria-controls="most-viewed-pane"
                                 aria-selected="true">
                                 Most Viewed
                              </button>
                           </li>
                           <li className="nav-item" role="presentation">
                              <button
                                 className="nav-link border-0"
                                 id="popular-news"
                                 data-bs-toggle="tab"
                                 data-bs-target="#popular-news-pane"
                                 type="button"
                                 role="tab"
                                 aria-controls="popular-news-pane"
                                 aria-selected="false">
                                 Popular news
                              </button>
                           </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                           <div
                              className="tab-pane fade show active"
                              id="most-viewed-pane"
                              role="tabpanel"
                              aria-labelledby="most-viewed"
                              tabindex="0">
                              <div className="most-viewed">
                                 <ul id="most-today" className="content tabs-content">
                                    <li>
                                       <span className="count">01</span>
                                       <span className="text">
                                          <a href="#">South Africa bounce back on eventful day</a>
                                       </span>
                                    </li>
                                    <li>
                                       <span className="count">02</span>
                                       <span className="text">
                                          <a href="#">Steyn ruled out of series with shoulder fracture</a>
                                       </span>
                                    </li>
                                    <li>
                                       <span className="count">03</span>
                                       <span className="text">
                                          <a href="#">BCCI asks ECB to bear expenses of team's India tour</a>
                                       </span>
                                    </li>
                                    <li>
                                       <span className="count">04</span>
                                       <span className="text">
                                          <a href="#">Duminy, Elgar tons set Australia huge target</a>
                                       </span>
                                    </li>
                                    <li>
                                       <span className="count">05</span>
                                       <span className="text">
                                          <a href="#">English spinners are third-class citizens, says Graeme Swann</a>
                                       </span>
                                    </li>
                                 </ul>
                              </div>
                           </div>
                           <div className="tab-pane fade" id="popular-news-pane" role="tabpanel" aria-labelledby="popular-news" tabindex="0">
                              <div className="popular-news">
                                 <div className="p-post">
                                    <h4>
                                       <a href="#">It is a long established fact that a reader will be distracted by </a>
                                    </h4>
                                    <ul className="authar-info d-flex flex-wrap justify-content-center">
                                       <li className="date">
                                          <a href="#">
                                             <i className="ti-timer"></i> May 15, 2016
                                          </a>
                                       </li>
                                       <li className="like">
                                          <a href="#">
                                             <i className="ti-thumb-up"></i>15 likes
                                          </a>
                                       </li>
                                    </ul>
                                    <div className="reatting-2">
                                       <i className="fas fa-star"></i>
                                       <i className="fas fa-star"></i>
                                       <i className="fas fa-star"></i>
                                       <i className="fas fa-star-half-alt"></i>
                                       <i className="far fa-star"></i>
                                    </div>
                                 </div>
                                 <div className="p-post">
                                    <h4>
                                       <a href="#">It is a long established fact that a reader will be distracted by </a>
                                    </h4>
                                    <ul className="authar-info d-flex flex-wrap justify-content-center">
                                       <li className="date">
                                          <a href="#">
                                             <i className="ti-timer"></i> May 15, 2016
                                          </a>
                                       </li>
                                       <li className="like">
                                          <a href="#">
                                             <i className="ti-thumb-up"></i>15 likes
                                          </a>
                                       </li>
                                    </ul>
                                    <div className="reatting-2">
                                       <i className="fas fa-star"></i>
                                       <i className="fas fa-star"></i>
                                       <i className="fas fa-star"></i>
                                       <i className="fas fa-star-half-alt"></i>
                                       <i className="far fa-star"></i>
                                    </div>
                                 </div>
                                 <div className="p-post">
                                    <h4>
                                       <a href="#">It is a long established fact that a reader will be distracted by </a>
                                    </h4>
                                    <ul className="authar-info d-flex flex-wrap justify-content-center">
                                       <li className="date">
                                          <a href="#">
                                             <i className="ti-timer"></i> May 15, 2016
                                          </a>
                                       </li>
                                       <li className="like">
                                          <a href="#">
                                             <i className="ti-thumb-up"></i>15 likes
                                          </a>
                                       </li>
                                    </ul>
                                    <div className="reatting-2">
                                       <i className="fas fa-star"></i>
                                       <i className="fas fa-star"></i>
                                       <i className="fas fa-star"></i>
                                       <i className="fas fa-star-half-alt"></i>
                                       <i className="far fa-star"></i>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </Row>
            </Container>
         </main>
      </React.Suspense>
   );
};
export default Content;
