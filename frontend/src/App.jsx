import Headers from "@components/Headers";
import React from "react";
import "./assets/css/style.css";
import Routing from "./Routing";

const App = () => {
   return (
      <React.Suspense fallback={<div className="se-pre-con" />}>
         <Headers />
         <Routing />
      </React.Suspense>
   );
};
export default App;
