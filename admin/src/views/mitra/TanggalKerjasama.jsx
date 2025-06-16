import { FormDatePicker, FormSelect } from "@helpers";
import { Row } from "react-bootstrap";

const TanggalKerjasama = ({ setState, state }) => {
   return (
      <Row className="mt-2">
         <h5>Tanggal Kerjasama</h5>
         <FormDatePicker
            label="Tanggal Mulai"
            name="tanggal_mulai"
            errors={state.errors}
            onChange={(e) => setState({ ...state, input: { ...state.input, tanggal_mulai: e.target.value } })}
            value={state.input.tanggal_mulai || ""}
            col={{ md: 2 }}
         />
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
            col={{ md: 2 }}
         />
         {state.input.durasi === "sampai-dengan" && (
            <FormDatePicker
               label="Tanggal Berakhir"
               name="tanggal_berakhir"
               errors={state.errors}
               onChange={(e) => setState({ ...state, input: { ...state.input, tanggal_berakhir: e.target.value } })}
               value={state.input.tanggal_berakhir || ""}
               col={{ md: 2 }}
            />
         )}
      </Row>
   );
};
export default TanggalKerjasama;
