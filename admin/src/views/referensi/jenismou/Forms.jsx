"use client";

import { setModule } from "@/redux";
import { FormText, FormTextarea, post } from "@helpers";
import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
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
   });

   const clearState = () => {
      setState({
         input: {},
         errors: {},
         isLoading: false,
      });
      navigate("/referensi/jenismou");
   };

   useEffect(() => {
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
               href: "/referensi/jenismou",
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

      post("/referensi/jenismou/submit", formData)
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
      <Form onSubmit={handleSubmit} disabled={state.isLoading}>
         <Card className="shadow-sm">
            <Card.Body>
               <FormText
                  label="Nama Jenis MoU"
                  name="nama"
                  errors={state.errors}
                  onChange={(e) => setState({ ...state, input: { ...state.input, nama: e.target.value } })}
                  value={state.input.nama || ""}
               />
               <FormTextarea
                  label="Keterangan Jenis MoU"
                  name="keterangan"
                  errors={state.errors}
                  onChange={(e) => setState({ ...state, input: { ...state.input, keterangan: e.target.value } })}
                  value={state.input.keterangan || ""}
               />
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
