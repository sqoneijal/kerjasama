import { setModule } from "@/redux";
import { CSpinner } from "@coreui/react";
import { DropzoneUpload, FormSelect, FormText, FormTypeahead, get, post } from "@helpers";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const RuangLingkup = React.lazy(() => import("./RuangLingkup"));
const TanggalKerjasama = React.lazy(() => import("./TanggalKerjasama"));

export default function Forms() {
   const { module, init } = useSelector((e) => e.redux);
   const { pageType, dataUpdate } = module;
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [isLoadingGetDropdown, setIsLoadingGetDropdown] = useState(true);
   const [state, setState] = useState({
      input: {},
      errors: {},
      isLoading: false,
      dropdown: [],
      selectedDropdown: {},
   });

   const clearState = () => {
      setState({
         input: {},
         errors: {},
         isLoading: false,
         dropdown: [],
         selectedDropdown: {},
      });
      navigate("/mitra");
   };

   const loadDropdown = async () => {
      get("/mitra/dropdown", { headers: { ...init.token } })
         .then((res) => {
            const { data } = res;
            setState((prev) => ({ ...prev, dropdown: data }));
         })
         .finally(() => {
            setIsLoadingGetDropdown(false);
         })
         .catch((err) => {
            toast.error(err.message);
         });
   };

   const filterByValue = (dataArray, targetValue) => {
      return dataArray.filter((item) => item.value === targetValue);
   };

   useEffect(() => {
      loadDropdown();
      return () => {};
   }, []);

   useEffect(() => {
      if (pageType === "update" && Object.keys(dataUpdate).length > 0 && !isLoadingGetDropdown) {
         const bidang_kerjasama = JSON.parse(dataUpdate.bidang_kerjasama).map((item) => ({
            ...item,
            label: item.bidang_kerjasama,
            value: item.id,
         }));

         const id_fakultas = JSON.parse(dataUpdate.id_fakultas).map((item) => ({
            ...item,
            label: item.fakultas,
            value: item.id,
         }));

         const id_prodi = JSON.parse(dataUpdate.id_prodi).map((item) => ({
            ...item,
            label: item.prodi,
            value: item.id,
         }));

         setState((prev) => ({
            ...prev,
            input: dataUpdate,
            selectedDropdown: {
               ...prev.selectedDropdown,
               id_mou: filterByValue(state.dropdown.daftarMoU, dataUpdate.id_mou),
               id_mitra: filterByValue(state.dropdown.daftarMitra, dataUpdate.id_mitra),
               bidang_kerjasama,
               id_fakultas,
               id_prodi,
            },
         }));
      }
      return () => {};
   }, [pageType, dataUpdate, isLoadingGetDropdown]);

   useEffect(() => {
      dispatch(
         setModule({
            ...module,
            pageButton: {
               variant: "danger",
               label: "Batal",
               href: "/mitra",
            },
         })
      );
      return () => {};
   }, []);

   const handleSubmit = async (e) => {
      e.preventDefault();

      setState((prev) => ({ ...prev, isLoading: true }));

      const formData = { pageType };
      Object.keys(state.input).forEach((key) => (formData[key] = state.input[key]));

      post("/mitra/submit", formData)
         .then((res) => {
            const { data } = res;

            setState((prev) => ({ ...prev, errors: data.errors }));

            if (data.status) {
               toast.success(data.message);
               clearState();
            } else {
               toast.error(data.message);
            }
         })
         .finally(() => {
            setState((prev) => ({ ...prev, isLoading: false }));
         });
   };

   const handleChangeDropdown = (data, name, isMultiple = false) => {
      let dataValue = [];
      if (isMultiple) {
         dataValue = data.length > 0 ? JSON.stringify(data) : "";
      } else {
         dataValue = data.length > 0 ? data[0].value : "";
      }
      const dataSelected = data.length > 0 ? data : [];

      setState((prev) => ({
         ...prev,
         input: { ...prev.input, [name]: dataValue },
         selectedDropdown: { ...state.selectedDropdown, [name]: dataSelected },
      }));
   };

   const getSelectedDropdown = (name) => {
      if (typeof state.selectedDropdown[name] !== "undefined") {
         return state.selectedDropdown[name];
      }
      return [];
   };

   const handleFile = (file) => {
      const nama_dokumen = file ? file.name : "";
      setState((prev) => ({ ...prev, input: { ...prev.input, nama_dokumen, file_mou: file } }));
   };

   const props = { state, setState, getSelectedDropdown, handleChangeDropdown };

   return isLoadingGetDropdown ? (
      <CSpinner color="primary" />
   ) : (
      <React.Suspense fallback={<CSpinner color="primary" />}>
         <Form onSubmit={handleSubmit} disabled={state.isLoading}>
            <Card className="shadow-sm">
               <Card.Body>
                  <Row>
                     <FormText
                        label="Judul Kegiatan"
                        name="judul_kegiatan"
                        errors={state.errors}
                        onChange={(e) => setState({ ...state, input: { ...state.input, judul_kegiatan: e.target.value } })}
                        value={state.input.judul_kegiatan || ""}
                     />
                  </Row>
                  <Row>
                     <FormTypeahead
                        name="id_mou"
                        label="MoU"
                        options={state.dropdown.daftarMoU}
                        selected={getSelectedDropdown("id_mou")}
                        onChange={(item) => handleChangeDropdown(item, "id_mou")}
                        errors={state.errors}
                        col={{ md: 3 }}
                     />
                     <FormTypeahead
                        name="id_mitra"
                        label="Nama Mitra"
                        options={state.dropdown.daftarMitra}
                        selected={getSelectedDropdown("id_mitra")}
                        onChange={(item) => handleChangeDropdown(item, "id_mitra")}
                        errors={state.errors}
                        col={{ md: 9 }}
                     />
                  </Row>
                  <Row>
                     <FormText
                        label="Nomor Dokumen/Perjanjian"
                        name="nomor_dokumen"
                        errors={state.errors}
                        onChange={(e) => setState({ ...state, input: { ...state.input, nomor_dokumen: e.target.value } })}
                        value={state.input.nomor_dokumen || ""}
                        col={{ md: 3 }}
                     />
                     <FormSelect
                        name="id_jenis_mou"
                        label="Jenis MoU"
                        options={state.dropdown.daftarJenisMoU}
                        errors={state.errors}
                        onChange={(e) => setState({ ...state, input: { ...state.input, id_jenis_mou: e.target.value } })}
                        value={state.input.id_jenis_mou || ""}
                        col={{ md: 3 }}
                     />
                  </Row>
                  <TanggalKerjasama {...props} />
                  <RuangLingkup {...props} />
                  <Row className="justify-content-md-center mt-3">
                     <h5>Dokumen</h5>
                     <Col md={12}>
                        <DropzoneUpload onFileSelect={handleFile} />
                     </Col>
                     <Col md={2} sm={12}>
                        <FormSelect
                           label="Status Dokumen"
                           name="status_dokumen"
                           errors={state.errors}
                           options={[
                              { value: "public", label: "Public" },
                              { value: "private", label: "Private" },
                           ]}
                           value={state.input.status_dokumen || ""}
                           onChange={(e) => setState({ ...state, input: { ...state.input, status_dokumen: e.target.value } })}
                        />
                     </Col>
                  </Row>
               </Card.Body>
               <Card.Footer>
                  <Button variant="primary" className="fw-bold" size="sm" type="submit" disabled={state.isLoading}>
                     {state.isLoading ? "Loading..." : `Simpan`}
                  </Button>
               </Card.Footer>
            </Card>
         </Form>
      </React.Suspense>
   );
}
