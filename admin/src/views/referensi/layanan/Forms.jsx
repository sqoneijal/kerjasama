import { setModule } from "@/redux";
import { FormText, FormTextarea, post } from "@helpers";
import { useEffect, useState } from "react";
import { Button, Card, Form, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function Forms() {
   const { module, init } = useSelector((e) => e.redux);
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
      navigate("/referensi/layanan");
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
               href: "/referensi/layanan",
            },
         })
      );
      return () => {};
   }, []);

   const handleSubmit = async (e) => {
      e.preventDefault();

      setState((prev) => ({ ...prev, isLoading: true }));
      const formData = { pageType, user_modified: init.user.preferred_username };
      Object.keys(state.input).forEach((key) => (formData[key] = state.input[key]));

      post("/referensi/layanan/submit", formData, { headers: { ...init.token } })
         .then((res) => {
            if (typeof res?.data === "undefined") {
               console.log(res);
               return;
            }

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
               <Row>
                  <FormText
                     label="Nama Layanan"
                     name="nama"
                     errors={state.errors}
                     onChange={(e) => setState({ ...state, input: { ...state.input, nama: e.target.value } })}
                     value={state.input.nama || ""}
                     col={{ md: 12, sm: 12 }}
                  />
               </Row>
               <Row>
                  <FormTextarea
                     label="Keterangan Layanan"
                     name="keterangan"
                     errors={state.errors}
                     onChange={(e) => setState({ ...state, input: { ...state.input, keterangan: e.target.value } })}
                     value={state.input.keterangan || ""}
                     col={{ md: 12, sm: 12 }}
                  />
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
