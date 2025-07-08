import { setModule } from "@/redux";
import { FormText, FormTextarea, post } from "@helpers";
import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Forms = () => {
   const { module } = useSelector((e) => e.redux);
   const { pageType, dataUpdate } = module;
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const [state, setState] = useState({
      input: {},
      errors: {},
      isSubmit: false,
   });

   const { isSubmit } = state;

   useEffect(() => {
      if (pageType === "update" && Object.keys(dataUpdate).length) {
         setState((prev) => ({ ...prev, input: { ...dataUpdate } }));
      }
      return () => {};
   }, [pageType, dataUpdate]);

   useEffect(() => {
      dispatch(
         setModule({
            pageType: "",
            dataUpdate: {},
            pageButton: {
               variant: "danger",
               label: "Batal",
               href: "/referensi/tindaklanjut",
            },
         })
      );
      return () => {};
   }, []);

   const clearState = () => {
      setState({ input: {}, errors: {}, isSubmit: false });
      navigate("/referensi/tindaklanjut");
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      setState((prev) => ({ ...prev, isSubmit: true }));

      const formData = { pageType };
      Object.keys(state.input).forEach((key) => (formData[key] = state.input[key]));

      post("/referensi/tindaklanjut/submit", formData)
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
            setState((prev) => ({ ...prev, isSubmit: false }));
         });
   };

   return (
      <Form onSubmit={handleSubmit} disabled={isSubmit}>
         <Card className="shadow-sm">
            <Card.Body>
               <FormText
                  label="Nama"
                  name="nama"
                  errors={state.errors}
                  onChange={(e) => setState({ ...state, input: { ...state.input, nama: e.target.value } })}
                  value={state.input.nama || ""}
               />
               <FormTextarea
                  label="Keterangan"
                  name="keterangan"
                  errors={state.errors}
                  onChange={(e) => setState({ ...state, input: { ...state.input, keterangan: e.target.value } })}
                  value={state.input.keterangan || ""}
               />
            </Card.Body>
            <Card.Footer>
               <Button variant="primary" className="fw-bold" size="sm" type="submit" disabled={isSubmit}>
                  {isSubmit ? "Loading..." : `Simpan`}
               </Button>
            </Card.Footer>
         </Card>
      </Form>
   );
};
export default Forms;
