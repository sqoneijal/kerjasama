import React from "react";
import "./assets/css/style.css";

const App = () => {
   return <React.Suspense fallback={<h2>🌀 Loading...</h2>}>App</React.Suspense>;
};
export default App;
