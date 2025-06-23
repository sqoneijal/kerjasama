import Editor from "@/components/TinyMCEEditor";
import { setModule } from "@/redux";
import { DropzoneUpload, FormText, FormTypeaheadMultiple, get, post } from "@helpers";
import { decode } from "html-entities";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function Forms() {
   const { module, init } = useSelector((e) => e.redux);
   const { pageType } = module;
   const editorRef = useRef(null);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [isLoadingDropdown, setIsLoadingDropdown] = useState(true);
   const [state, setState] = useState({
      isLoading: false,
      content: "",
      input: {},
      errors: {},
      selectedKategori: [],
      selectedTags: [],
      previewLink: "",
   });

   useEffect(() => {
      if (pageType === "update" && !isLoadingDropdown) {
         const { dataUpdate } = module;
         const { kategori, tags } = dataUpdate;

         const updateSelectedKategori = [];
         if (kategori)
            JSON.parse(kategori).forEach((row) => {
               updateSelectedKategori.push({
                  value: row.id_kategori,
                  label: row.nama,
               });
            });

         const updateSelectedTags = [];
         if (tags)
            JSON.parse(tags).forEach((row) => {
               updateSelectedTags.push({
                  value: row.id_tags,
                  label: row.nama,
               });
            });

         setState((prev) => ({
            ...prev,
            input: {
               ...prev.input,
               thumbnail: dataUpdate.thumbnail,
               id: dataUpdate.id,
               judul: dataUpdate.judul,
               content: decode(dataUpdate.content, { level: "html5" }),
            },
            selectedKategori: updateSelectedKategori,
            selectedTags: updateSelectedTags,
            previewLink: dataUpdate.thumbnail,
         }));
      }
      return () => {};
   }, [pageType, isLoadingDropdown]);

   const clearState = () => {
      dispatch(setModule({ ...module, pageType: "", dataUpdate: {} }));
      navigate("/berita/dalamnegeri");
   };

   const getDropdown = () => {
      get("/berita/dalamnegeri/getdropdown", { headers: { ...init.token } })
         .then((res) => {
            setState((prev) => ({ ...prev, dropdown: res.data }));
         })
         .finally(() => {
            setIsLoadingDropdown(false);
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
      setState((prev) => ({ ...prev, input: { ...prev.input, file_thumbnail: file } }));
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      setState((prev) => ({ ...prev, isLoading: true }));

      const formData = { pageType, user_modified: init.user_modified };
      Object.keys(state.input).forEach((key) => (formData[key] = state.input[key]));
      formData.content = editorRef.current.getContent();
      formData.selectedKategori = JSON.stringify(state.selectedKategori);
      formData.selectedTags = JSON.stringify(state.selectedTags);

      post("/berita/dalamnegeri/submit", formData, { headers: { ...init.token } })
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
                     <DropzoneUpload onFileSelect={handleFile} previewLink={state.previewLink} />
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
