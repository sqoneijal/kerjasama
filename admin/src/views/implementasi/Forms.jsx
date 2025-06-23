import Editor from "@/components/TinyMCEEditor";
import { setModule } from "@/redux";
import { CSpinner } from "@coreui/react";
import { FormDatePicker, FormSelect, FormTypeahead, get, post } from "@helpers";
import { decode } from "html-entities";
import { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Forms = () => {
   const { module } = useSelector((e) => e.redux);
   const { pageType } = module;
   const dispatch = useDispatch();
   const dilakukan = useRef(null);
   const capaian_output = useRef(null);
   const dokumentasi_pendukung = useRef(null);
   const navigate = useNavigate();

   const [state, setState] = useState({
      isSubmit: false,
      isLoadingDropdown: true,
      dropdown: {},
      selectedDropdown: [],
      input: {},
      errors: {},
   });

   const clearState = () => {
      setState({ isSubmit: false, isLoadingDropdown: true, dropdown: {}, selectedDropdown: [], input: {}, errors: {} });
      navigate("/implementasi");
   };

   const getDropdown = () => {
      get("/implementasi/getdropdown")
         .then((res) => {
            const { data } = res;
            setState((prev) => ({ ...prev, dropdown: data }));
         })
         .finally(() => {
            setState((prev) => ({ ...prev, isLoadingDropdown: false }));
         });
   };

   useEffect(() => {
      dispatch(
         setModule({
            pageType: "",
            dataUpdate: {},
            pageButton: {
               variant: "danger",
               label: "Batal",
               href: "/implementasi",
            },
         })
      );
      getDropdown();
      return () => {};
   }, []);

   useEffect(() => {
      const { pageType, dataUpdate } = module;
      if (pageType === "update" && Object.keys(dataUpdate).length > 0) {
         setState((prev) => ({
            ...prev,
            input: {
               id: dataUpdate.id,
               dilakukan: decode(dataUpdate.dilakukan),
               tgl_pelaksanaan: dataUpdate.tgl_pelaksanaan,
               capaian_output: decode(dataUpdate.capaian_output),
               status_evaluasi: dataUpdate.status_evaluasi,
               dokumentasi_pendukung: decode(dataUpdate.dokumentasi_pendukung),
               id_mitra: dataUpdate.id_mitra,
            },
            selectedDropdown: {
               id_mitra: [{ value: dataUpdate.id_mitra, label: `${dataUpdate.judul_kegiatan} - ${dataUpdate.nama} (${dataUpdate.nomor_dokumen})` }],
            },
         }));
      }
      return () => {};
   }, [module]);

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

   const handleSubmit = (e) => {
      e.preventDefault();
      setState((prev) => ({ ...prev, isLoading: true }));

      const formData = { pageType };
      Object.keys(state.input).forEach((key) => (formData[key] = state.input[key]));
      formData.dilakukan = dilakukan.current.getContent();
      formData.capaian_output = capaian_output.current.getContent();
      formData.dokumentasi_pendukung = dokumentasi_pendukung.current.getContent();

      post("/implementasi/submit", formData)
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

   return state.isLoadingDropdown ? (
      <CSpinner color="primary" />
   ) : (
      <Form disabled={state.isSubmit} onSubmit={handleSubmit}>
         <Card className="shadow-sm">
            <Card.Body>
               <Row>
                  <FormTypeahead
                     name="id_mitra"
                     label="Kegiatan"
                     options={state.dropdown.daftarMitra}
                     selected={getSelectedDropdown("id_mitra")}
                     onChange={(item) => handleChangeDropdown(item, "id_mitra")}
                     errors={state.errors}
                     col={{ md: 8 }}
                  />
                  <FormDatePicker
                     label="Tanggal Pelaksanaan"
                     errors={state.errors}
                     name="tgl_pelaksanaan"
                     value={state?.input?.tgl_pelaksanaan}
                     onChange={(e) => setState((prev) => ({ ...prev, input: { ...prev.input, tgl_pelaksanaan: e.target.value } }))}
                     col={{ md: 2 }}
                  />
                  <FormSelect
                     label="Status Evaluasi"
                     options={[
                        { label: "Sudah Evaluasi", value: "sudah" },
                        { label: "Belum Evaluasi", value: "belum" },
                     ]}
                     name="status_evaluasi"
                     errors={state.errors}
                     onChange={(e) => setState((prev) => ({ ...prev, input: { ...prev.input, status_evaluasi: e.target.value } }))}
                     value={state?.input?.status_evaluasi}
                     col={{ md: 2 }}
                  />
               </Row>
               <Row>
                  <Col>
                     <Form.Label>Kegiatan yang Sudah Dilakukan</Form.Label>
                     <Editor onInit={(_evt, editor) => (dilakukan.current = editor)} initialValue={state?.input?.dilakukan} />
                  </Col>
                  <Col>
                     <Form.Label>Capaian Output</Form.Label>
                     <Editor onInit={(_evt, editor) => (capaian_output.current = editor)} initialValue={state?.input?.capaian_output} />
                  </Col>
               </Row>
               <Row className="mt-2">
                  <Col>
                     <Form.Label>Dokumentasi Pendukung</Form.Label>
                     <Editor onInit={(_evt, editor) => (dokumentasi_pendukung.current = editor)} initialValue={state?.input?.dokumentasi_pendukung} />
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
};
export default Forms;
