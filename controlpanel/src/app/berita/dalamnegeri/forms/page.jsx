"use client";
import { DropzoneUpload, FormText, FormTypeaheadMultiple, get, post } from "@/app/helpers";
import { setModule } from "@/app/store";
import { decode } from "html-entities";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Editor = dynamic(() => import("@/app/components/TinyMCEEditor"), {
   ssr: false,
});

export default function FormsPage() {
   const { module } = useSelector((e) => e.store);
   const { pageType } = module;
   const editorRef = useRef(null);
   const dispatch = useDispatch();
   const router = useRouter();

   const [state, setState] = useState({
      isLoading: false,
      content: "",
      input: {},
      errors: {},
      selectedKategori: [],
      selectedTags: [],
   });

   useEffect(() => {
      if (pageType === "update") {
         const { dataUpdate } = module;
         setState((prev) => ({
            ...prev,
            input: { ...prev.input, id: dataUpdate.id, judul: dataUpdate.judul, content: decode(dataUpdate.content, { level: "html5" }) },
         }));
      }
      return () => {};
   }, [pageType]);

   const clearState = () => {
      dispatch(setModule({ ...module, pageType: "", dataUpdate: {} }));
      router.push("/berita/dalamnegeri");
   };

   const getDropdown = () => {
      get("/berita/dalamnegeri/getdropdown").then((res) => {
         setState((prev) => ({ ...prev, dropdown: res.data }));
      });
   };

   useEffect(() => {
      getDropdown();
      dispatch(
         setModule({
            ...module,
            pageButton: {
               variant: "danger",
               label: "Batal",
               href: "/berita/dalamnegeri",
            },
         })
      );
      return () => {};
   }, []);

   const handleFile = (file) => {
      const nama_dokumen = file ? file.name : "";
      setState((prev) => ({ ...prev, input: { ...prev.input, nama_dokumen, file_mou: file } }));
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      setState((prev) => ({ ...prev, isLoading: true }));

      const formData = { pageType };
      Object.keys(state.input).forEach((key) => (formData[key] = state.input[key]));
      formData.content = editorRef.current.getContent();
      formData.selectedKategori = JSON.stringify(state.selectedKategori);
      formData.selectedTags = JSON.stringify(state.selectedTags);

      post("/berita/dalamnegeri/submit", formData)
         .then((res) => {
            const { data } = res;

            setState((prev) => ({ ...prev, errors: data.errors }));

            if (data.status) {
               clearState();
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
      <Form onSubmit={state.isLoading ? null : handleSubmit}>
         <Row>
            <Col md={8} sm={12}>
               <Row>
                  <Col xs={12}>
                     <FormText
                        label="Judul Berita"
                        name="judul"
                        onChange={(e) => setState((prev) => ({ ...prev, input: { ...prev.input, judul: e.target.value } }))}
                        value={state?.input?.judul || ""}
                        errors={state.errors}
                     />
                  </Col>
                  <Col xs={12}>
                     <Editor onInit={(_evt, editor) => (editorRef.current = editor)} initialValue={state.input.content} />
                  </Col>
               </Row>
            </Col>
            <Col md={4} sm={12}>
               <Row>
                  <Col xs={12}>
                     <h6>Thumbnail</h6>
                     <DropzoneUpload onFileSelect={handleFile} />
                  </Col>
                  <Col xs={12} className="mb-3">
                     <h6>Kategori</h6>
                     <FormTypeaheadMultiple
                        label="Kategori"
                        name="kategori"
                        errors={state.errors}
                        onChange={(data) =>
                           setState((prev) => ({
                              ...prev,
                              selectedKategori: data,
                           }))
                        }
                        selected={state.selectedKategori}
                        options={state.dropdown?.daftarKategori}
                        allowNew={true}
                        multiple={true}
                        newSelectionPrefix="Tambah kategori baru: "
                     />
                  </Col>
                  <Col xs={12} className="mb-3">
                     <h6>Tags</h6>
                     <FormTypeaheadMultiple
                        label="Tags"
                        name="tags"
                        errors={state.errors}
                        onChange={(data) =>
                           setState((prev) => ({
                              ...prev,
                              selectedTags: data,
                           }))
                        }
                        selected={state.selectedTags}
                        options={state.dropdown?.daftarTags}
                        allowNew={true}
                        multiple={true}
                        newSelectionPrefix="Tambah tags baru: "
                     />
                  </Col>
                  <Col xs={12}>
                     <Button variant="primary" className="fw-bold" size="sm" type="submit" disabled={state.isLoading}>
                        {state.isLoading ? "Loading..." : `Simpan`}
                     </Button>
                  </Col>
               </Row>
            </Col>
         </Row>
      </Form>
   );
}
