"use client";

import { post } from "@/app/helpers";
import { decode } from "html-entities";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import toast from "react-hot-toast";

const Editor = dynamic(() => import("@/app/components/TinyMCEEditor"), {
   ssr: false,
});

export default function SekretariatPage() {
   const editorRef = useRef(null);

   const [state, setState] = useState({
      isLoading: false,
      content: "",
   });

   const getData = () => {
      post("/tentang/sekretariat/getdata")
         .then((res) => {
            const { data } = res;
            setState((prev) => ({ ...prev, content: decode(data.content, { level: "html5" }) }));
         })
         .catch((err) => {
            toast.error(err.message);
         });
   };

   useEffect(() => {
      getData();
      return () => {};
   }, []);

   const handleSubmit = (e) => {
      e.preventDefault();

      setState((prev) => ({ ...prev, isLoading: true }));

      const formData = {};
      formData.content = editorRef.current.getContent();

      post("/tentang/sekretariat/submit", formData)
         .then((res) => {
            const { data } = res;

            if (data.status) {
               toast.success(data.message);
            } else {
               toast.error(data.message);
            }
         })
         .finally(() => {
            setState((prev) => ({ ...prev, isLoading: false }));
         });
   };

   return (
      <>
         <Editor onInit={(_evt, editor) => (editorRef.current = editor)} initialValue={state.content} />
         <Button type="submit" className="fw-bold mt-3" size="sm" disabled={state.isLoading} onClick={handleSubmit}>
            {state.isLoading ? `Loading...` : `Simpan`}
         </Button>
      </>
   );
}
