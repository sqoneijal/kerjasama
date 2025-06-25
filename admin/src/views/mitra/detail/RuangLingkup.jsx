import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

const RuangLingkup = () => {
   const { module } = useSelector((e) => e.redux);
   const { data } = module;

   const renderArray = (str) => {
      if (typeof str !== "string") return "";
      str = str.slice(1, -1);
      const regex = /"([^"]+)"|([^,]+)/g;
      const result = [];
      let match;

      while ((match = regex.exec(str)) !== null) {
         result.push(match[1] || match[2]);
      }

      return result.join(", ");
   };

   const tingkat = {
      universitas: "Universitas",
      fakultas: "Fakultas",
      prodi: "Program Studi",
   };

   return (
      <Table bordered>
         <tbody>
            <tr>
               <th style={{ width: "20%" }}>Bidang Kerja Sama</th>
               <td>{renderArray(data.bidang_kerjasama)}</td>
            </tr>
            <tr>
               <th>Tingkat</th>
               <td>{tingkat[data.tingkat]}</td>
            </tr>
            <tr>
               <th>Unit Penanggung Jawab</th>
               <td>{data.unit_penanggung_jawab}</td>
            </tr>
            <tr>
               <th>Fakultas Terkait</th>
               <td>{renderArray(data.fakultas)}</td>
            </tr>
            <tr>
               <th>Prodi Terkait</th>
               <td>{renderArray(data.prodi)}</td>
            </tr>
            <tr>
               <th>Tujuan Kerja Sama</th>
               <td>{data.tujuan_kerjasama}</td>
            </tr>
         </tbody>
      </Table>
   );
};
export default RuangLingkup;
