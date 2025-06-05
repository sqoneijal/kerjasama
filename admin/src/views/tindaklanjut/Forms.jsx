import { setModule } from "@/redux";
import { FormTypeahead, get, post } from "@helpers";
import { useLayoutEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Forms = () => {
   const { init, module } = useSelector((e) => e.redux);
   const { pageType } = module;
   const dispatch = useDispatch();

   const [state, setState] = useState({
      isSubmit: false,
      dropdown: {},
      selectedDropdown: [],
      input: {},
      errors: {},
   });

   const getDropdown = () => {
      get("/tindaklanjut/getdropdown").then((res) => {
         const { data } = res;
         setState((prev) => ({ ...prev, dropdown: data }));
      });
   };

   useLayoutEffect(() => {
      dispatch(
         setModule({
            pageType: "",
            dataUpdate: {},
            pageButton: {
               variant: "danger",
               label: "Batal",
               href: "/tindaklanjut",
            },
         })
      );
      getDropdown();
      return () => {};
   }, []);

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

      const formData = { pageType, user_modified: init.user_modified };
      Object.keys(state.input).forEach((key) => (formData[key] = state.input[key]));

      post("/tindaklanjut/submit", formData, { headers: { ...init.token } })
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
      <Form disabled={state.isSubmit} onSubmit={handleSubmit}>
         <Card className="shadow-sm">
            <Card.Body>
               <Row>
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
