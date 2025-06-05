import { setModule } from "@/redux";
import React, { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";

const Page = () => {
   const dispatch = useDispatch();

   useLayoutEffect(() => {
      dispatch(
         setModule({
            pageType: "",
            dataUpdate: {},
            pageButton: {
               variant: "primary",
               label: "Tambah Data",
               href: "/tindaklanjut/forms",
            },
         })
      );
      return () => {};
   }, []);

   return <React.Suspense fallback={<h2>🌀 Loading...</h2>}>Page</React.Suspense>;
};
export default Page;
