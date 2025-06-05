import { setModule } from "@/redux";
import { get, PageSuspense } from "@helpers";
import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

const Title = React.lazy(() => import("./Title"));
const Content = React.lazy(() => import("./Content"));

const Page = () => {
   const { module } = useSelector((e) => e.redux);
   const dispatch = useDispatch();
   let { slug } = useParams();

   const [isLoading, setIsLoading] = useState(true);

   const getData = (slug) => {
      get(`/berita/read/${slug}`)
         .then((res) => {
            const { data } = res;
            dispatch(setModule({ ...module, ...data }));
         })
         .finally(() => {
            setIsLoading(false);
         });
   };

   useLayoutEffect(() => {
      getData(slug);
      return () => {};
   }, [slug]);

   return isLoading ? (
      <PageSuspense />
   ) : (
      <React.Suspense fallback={<PageSuspense />}>
         <Title />
         <Content />
      </React.Suspense>
   );
};
export default Page;
