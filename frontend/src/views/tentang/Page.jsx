import { setModule } from "@/redux";
import { PageSuspense, get } from "@helpers";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

const Title = React.lazy(() => import("./Title"));
const Content = React.lazy(() => import("./Content"));

const Page = () => {
   const dispatch = useDispatch();
   const { slug } = useParams();

   const [state, setState] = useState({
      pageLoading: true,
   });

   const getData = (slug) => {
      get(`/tentang/${slug}`)
         .then((res) => {
            if (res.status !== 201) {
               toast.error("Terjadi sesuatu kesalahan!!!");
               return;
            }

            dispatch(setModule({ tentang: res.data }));
         })
         .finally(() => setState({ pageLoading: false }));
   };

   useEffect(() => {
      getData(slug);
      return () => {};
   }, [slug]);

   return state.pageLoading ? (
      <PageSuspense />
   ) : (
      <React.Suspense fallback={<PageSuspense />}>
         <Title />
         <Content />
      </React.Suspense>
   );
};
export default Page;
