import { setModule } from "@/redux";
import { CSpinner } from "@coreui/react";
import { FormSelect, FormText, FormTypeahead, get, post } from "@helpers";
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

   const [state, setState] = useState({
      isLoading: true,
      input: {},
      errors: {},
      isSubmit: false,
      dropdown: {},
      selectedDropdown: {},
   });

   useEffect(() => {
      if (pageType === "update" && Object.keys(dataUpdate).length > 0) {
         setState((prev) => ({
            ...prev,
            input: dataUpdate,
            selectedDropdown: {
               id_lembaga: [{ value: dataUpdate.id_lembaga, label: dataUpdate.jenis_mitra }],
            },
         }));
      }
      return () => {};
   }, [pageType, dataUpdate]);

   const getDropdown = () => {
      get("/referensi/mitra/getdropdown", { headers: { ...init.token } })
         .then((res) => {
            const { data } = res;
            setState((prev) => ({ ...prev, dropdown: data }));
         })
         .finally(() => setState((prev) => ({ ...prev, isLoading: false })));
   };

   useEffect(() => {
      getDropdown();
      dispatch(
         setModule({
            ...module,
            pageButton: {
               variant: "danger",
               label: "Batal",
               href: "/referensi/mitra",
            },
         })
      );
      return () => {};
   }, []);

   const handleSubmit = async (e) => {
      e.preventDefault();

      setState((prev) => ({ ...prev, isSubmit: true }));
      const formData = { pageType, user_modified: init.user.preferred_username };
      Object.keys(state.input).forEach((key) => (formData[key] = state.input[key]));

      post("/referensi/mitra/submit", formData, { headers: { ...init.token } })
         .then((res) => {
            if (typeof res?.data === "undefined") {
               console.log(res);
               return;
            }

            const { data } = res;

            setState((prev) => ({ ...prev, errors: data.errors }));

            if (data.status) {
               navigate("/referensi/mitra");
               toast.success(data.message);
            } else {
               toast.error(data.message);
            }
         })
         .finally(() => {
            setState((prev) => ({ ...prev, isSubmit: false }));
         });
   };

   const getSelectedDropdown = (name) => {
      if (typeof state.selectedDropdown[name] !== "undefined") {
         return state.selectedDropdown[name];
      }
      return [];
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

   return state.isLoading ? (
      <CSpinner color="primary" />
   ) : (
      <Form onSubmit={handleSubmit} disabled={state.isSubmit}>
         <Card className="shadow-sm">
            <Card.Body>
               <Row>
                  <Col md={8} sm={12}>
                     <FormText
                        label="Nama Mitra"
                        name="nama"
                        errors={state.errors}
                        onChange={(e) => setState({ ...state, input: { ...state.input, nama: e.target.value } })}
                        value={state.input.nama || ""}
                     />
                  </Col>
                  <Col md={4} sm={12}>
                     <FormTypeahead
                        name="id_lembaga"
                        label="Jenis Mitra"
                        options={state.dropdown.daftarLembaga}
                        selected={getSelectedDropdown("id_lembaga")}
                        onChange={(item) => handleChangeDropdown(item, "id_lembaga")}
                        errors={state.errors}
                     />
                  </Col>
               </Row>
               <Row>
                  <Col md={2} sm={12}>
                     <FormSelect
                        name="asal_mitra"
                        label="Negara/Asal Mitra"
                        options={state.dropdown.daftarAsalMitra}
                        errors={state.errors}
                        onChange={(e) => setState({ ...state, input: { ...state.input, asal_mitra: e.target.value } })}
                        value={state.input.asal_mitra || ""}
                     />
                  </Col>
                  <Col md={10} sm={12}>
                     <FormText
                        label="Alamat Mitra"
                        name="alamat"
                        errors={state.errors}
                        onChange={(e) => setState({ ...state, input: { ...state.input, alamat: e.target.value } })}
                        value={state.input.alamat || ""}
                     />
                  </Col>
               </Row>
               <Row>
                  <Col md={3} sm={12}>
                     <FormText
                        label="Website Mitra"
                        name="website"
                        errors={state.errors}
                        onChange={(e) => setState({ ...state, input: { ...state.input, website: e.target.value } })}
                        value={state.input.website || ""}
                     />
                  </Col>
               </Row>
            </Card.Body>
            <Card.Footer>
               <Button variant="primary" className="fw-bold" size="sm" type="submit" disabled={state.isSubmit}>
                  {state.isSubmit ? "Loading..." : `Simpan`}
               </Button>
            </Card.Footer>
         </Card>
      </Form>
   );
}
