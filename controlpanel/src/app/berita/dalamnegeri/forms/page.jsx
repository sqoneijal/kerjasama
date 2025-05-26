"use client";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

const Editor = dynamic(() => import("@/app/components/TinyMCEEditor"), {
   ssr: false,
});

export default function FormsPage() {
   const editorRef = useRef(null);

   const [state, setState] = useState({
      isLoading: false,
      content: "",
   });

   return (
      <Form>
         <Row>
            <Col>
               <Editor onInit={(_evt, editor) => (editorRef.current = editor)} initialValue={state.content} />
            </Col>
         </Row>
      </Form>
   );
}
