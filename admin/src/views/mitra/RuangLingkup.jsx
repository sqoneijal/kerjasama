import { FormSelect, FormText, FormTypeaheadMultiple } from "@helpers";
import { Row } from "react-bootstrap";

const RuangLingkup = ({ state, setState, handleChangeDropdown, getSelectedDropdown }) => {
   const tingkat = state.input.tingkat;

   return (
      <Row className="mt-3">
         <h5>Ruang Lingkup</h5>
         <Row>
            <FormTypeaheadMultiple
               label="Bidang Kerja Sama"
               name="bidang_kerjasama"
               errors={state.errors}
               onChange={(item) => handleChangeDropdown(item, "bidang_kerjasama", true)}
               selected={getSelectedDropdown("bidang_kerjasama")}
               options={state.dropdown?.daftarBidangKerjasama}
               multiple={true}
            />
         </Row>
         <Row>
            <FormSelect
               label="Tingkat"
               name="tingkat"
               errors={state.errors}
               options={[
                  { value: "universitas", label: "Universitas" },
                  { value: "fakultas", label: "Fakultas" },
                  { value: "prodi", label: "Program Studi" },
               ]}
               col={{ md: 2 }}
               onChange={(e) => setState((prev) => ({ ...prev, input: { ...prev.input, tingkat: e.target.value } }))}
               value={state?.input?.tingkat}
            />
            {tingkat === "fakultas" && (
               <FormTypeaheadMultiple
                  label="Fakultas"
                  name="id_fakultas"
                  errors={state.errors}
                  onChange={(item) => handleChangeDropdown(item, "id_fakultas", true)}
                  selected={getSelectedDropdown("id_fakultas")}
                  options={state.dropdown?.daftarFakultas}
                  multiple={true}
                  col={{ md: 10 }}
               />
            )}
            {tingkat === "prodi" && (
               <FormTypeaheadMultiple
                  label="Program Studi"
                  name="id_prodi"
                  errors={state.errors}
                  onChange={(item) => handleChangeDropdown(item, "id_prodi", true)}
                  selected={getSelectedDropdown("id_prodi")}
                  options={state.dropdown?.daftarProdi}
                  multiple={true}
                  col={{ md: 10 }}
               />
            )}
         </Row>
         <Row>
            <FormText
               label="Unit Penanggung Jawab"
               name="unit_penanggung_jawab"
               errors={state.errors}
               onChange={(e) => setState({ ...state, input: { ...state.input, unit_penanggung_jawab: e.target.value } })}
               value={state.input.unit_penanggung_jawab || ""}
               col={{ md: 6 }}
            />
            <FormText
               label="Tujuan Kerja Sama"
               name="tujuan_kerjasama"
               errors={state.errors}
               onChange={(e) => setState({ ...state, input: { ...state.input, tujuan_kerjasama: e.target.value } })}
               value={state.input.tujuan_kerjasama || ""}
               col={{ md: 6 }}
            />
         </Row>
      </Row>
   );
};
export default RuangLingkup;
