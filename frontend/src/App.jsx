import React from "react";
import "./assets/css/style.css";
import Routing from "./Routing";

const Headers = React.lazy(() => import("@components/Headers"));
const Footer = React.lazy(() => import("@components/Footer"));
const SubFooter = React.lazy(() => import("@components/SubFooter"));

const App = () => {
   return (
      <React.Suspense fallback={<div className="se-pre-con" />}>
         <Headers />
         <Routing />
         <Footer />
         <SubFooter />
      </React.Suspense>
   );
};
export default App;
