import { setModule } from "@/redux";
import { PageSuspense, get } from "@helpers";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Title = React.lazy(() => import("./Title"));

const Page = () => {
   const { module } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   const [state, setState] = useState({
      pageLoading: true,
   });

   const { pageLoading } = state;

   const getData = () => {
      get("/kemitraan/getdata")
         .then((res) => {
            dispatch(setModule({ ...module, data: res.data }));
         })
         .finally(() => setState({ pageLoading: false }));
   };

   useEffect(() => {
      getData();
      return () => {};
   }, []);

   return pageLoading ? (
      <PageSuspense />
   ) : (
      <React.Suspense fallback={<PageSuspense />}>
         <Title />
      </React.Suspense>
   );
};
export default Page;
