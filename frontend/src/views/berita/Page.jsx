import { PageSuspense } from "@helpers";
import React from "react";

const Title = React.lazy(() => import("./Title"));
const Content = React.lazy(() => import("./Content"));

const Page = () => {
   return (
      <React.Suspense fallback={<PageSuspense />}>
         <Title />
         <Content />
      </React.Suspense>
   );
};
export default Page;
