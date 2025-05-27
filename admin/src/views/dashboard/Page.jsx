import React from "react";

const Page = () => {
   return <React.Suspense fallback={<h2>🌀 Loading...</h2>}>Page</React.Suspense>;
};
export default Page;
