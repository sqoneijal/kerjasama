import { setModule } from "@/redux";
import { DropzoneUpload, FormDatePicker, FormSelect, FormText, FormTypeahead, get, post } from "@helpers";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

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
      if (pageType === "update" && Object.keys(dataUpdate).length > 0 && !isLoadingGetDropdown) {
         setState((prev) => ({
            ...prev,
            input: dataUpdate,
            selectedDropdown: {
               ...prev.selectedDropdown,
               id_mou: filterByValue(state.dropdown.daftarMoU, dataUpdate.id_mou),
               id_lembaga: filterByValue(state.dropdown.daftarLembaga, dataUpdate.id_lembaga),
               id_mitra: filterByValue(state.dropdown.daftarMitra, dataUpdate.id_mitra),
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

      const formData = { pageType, user_modified: init.user_modified };
      Object.keys(state.input).forEach((key) => (formData[key] = state.input[key]));

      post("/mitra/submit", formData, { headers: { ...init.token } })
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
      const dataValue = data.length > 0 ? data[0].value : "";
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
                     <FormTypeahead
                        name="id_mitra"
                        label="Nama Mitra"
                        options={state.dropdown.daftarMitra}
                        selected={getSelectedDropdown("id_mitra")}
                        onChange={(item) => handleChangeDropdown(item, "id_mitra")}
                        errors={state.errors}
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
