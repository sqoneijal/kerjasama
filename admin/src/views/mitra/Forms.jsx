import { setModule } from "@/redux";
import { DropzoneUpload, FormDatePicker, FormSelect, FormText, FormTypeahead, get, post } from "@helpers";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Forms() {
   const { module } = useSelector((e) => e.redux);
   const { pageType, dataUpdate } = module;
   const dispatch = useDispatch();
   const navigate = useNavigate();

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
      get("/mitra/dropdown")
         .then((res) => {
            const { data } = res;
            setState((prev) => ({ ...prev, dropdown: data }));
         })
         .catch((err) => {
            toast.error(err.message);
         });
   };

   useEffect(() => {
      loadDropdown();
      if (pageType === "update" && Object.keys(dataUpdate).length > 0) {
         setState((prev) => ({ ...prev, input: dataUpdate }));
      }
      return () => {};
   }, [pageType, dataUpdate]);

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

   const handleChangeDropdown = (data, name) => {
      if (data.length > 0) {
         setState((prev) => ({
            ...prev,
            input: { ...prev.input, [name]: data[0].value },
            selectedDropdown: { ...state.selectedDropdown, [name]: data },
         }));
      } else {
         setState((prev) => ({
            ...prev,
            input: { ...prev.input, [name]: "" },
            selectedDropdown: { ...state.selectedDropdown, [name]: [] },
         }));
      }
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

   return (
      <Form onSubmit={handleSubmit} disabled={state.isLoading}>
         <Card className="shadow-sm">
            <Card.Body>
               <Row>
                  <Col md={3} sm={12}>
                     <FormTypeahead
                        name="id_mou"
                        label="MoU"
                        options={state.dropdown.daftarMoU}
                        selected={getSelectedDropdown("id_mou")}
                        onChange={(item) => handleChangeDropdown(item, "id_mou")}
                        errors={state.errors}
                     />
                  </Col>
                  <Col>
                     <FormText
                        label="Nama Mitra"
                        name="nama_mitra"
                        errors={state.errors}
                        onChange={(e) => setState({ ...state, input: { ...state.input, nama_mitra: e.target.value } })}
                        value={state.input.nama_mitra || ""}
                     />
                  </Col>
               </Row>
               <Row>
                  <Col md={3} sm={12}>
                     <FormText
                        label="Nomor Dokumen/Perjanjian"
                        name="nomor_dokumen"
                        errors={state.errors}
                        onChange={(e) => setState({ ...state, input: { ...state.input, nomor_dokumen: e.target.value } })}
                        value={state.input.nomor_dokumen || ""}
                     />
                  </Col>
                  <Col md={3} sm={12}>
                     <FormTypeahead
                        name="id_lembaga"
                        label="Lembaga"
                        options={state.dropdown.daftarLembaga}
                        selected={getSelectedDropdown("id_lembaga")}
                        onChange={(item) => handleChangeDropdown(item, "id_lembaga")}
                        errors={state.errors}
                     />
                  </Col>
                  <Col md={3} sm={12}>
                     <FormSelect
                        name="id_jenis_mou"
                        label="Jenis MoU"
                        options={state.dropdown.daftarJenisMoU}
                        errors={state.errors}
                        onChange={(e) => setState({ ...state, input: { ...state.input, id_jenis_mou: e.target.value } })}
                        value={state.input.id_jenis_mou || ""}
                     />
                  </Col>
               </Row>
               <Row>
                  <h5>Tanggal Kerjasama</h5>
                  <Col md={2} sm={12}>
                     <FormDatePicker
                        label="Tanggal Mulai"
                        name="tanggal_mulai"
                        errors={state.errors}
                        onChange={(e) => setState({ ...state, input: { ...state.input, tanggal_mulai: e.target.value } })}
                        value={state.input.tanggal_mulai || ""}
                     />
                  </Col>
                  <Col md={2} sm={12}>
                     <FormSelect
                        name="durasi"
                        label="Durasi"
                        options={[
                           { label: "Sampai Dengan", value: "sampai-dengan" },
                           { label: "Tak Terbatas", value: "tak-terbatas" },
                        ]}
                        errors={state.errors}
                        onChange={(e) =>
                           setState({
                              ...state,
                              input: {
                                 ...state.input,
                                 durasi: e.target.value,
                                 tanggal_berakhir: e.target.value === "tak-terbatas" ? "" : state.input.tanggal_berakhir,
                              },
                           })
                        }
                        value={state.input.durasi || ""}
                     />
                  </Col>
                  {state.input.durasi === "sampai-dengan" && (
                     <Col md={2} sm={12}>
                        <FormDatePicker
                           label="Tanggal Berakhir"
                           name="tanggal_berakhir"
                           errors={state.errors}
                           onChange={(e) => setState({ ...state, input: { ...state.input, tanggal_berakhir: e.target.value } })}
                           value={state.input.tanggal_berakhir || ""}
                        />
                     </Col>
                  )}
               </Row>
               <Row className="justify-content-md-center">
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
   );
}
