import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

const IdentitasMitra = () => {
   const { module } = useSelector((e) => e.redux);
   const { data } = module;

   const asal_mitra = {
      dalamnegeri: "Dalam Negeri",
      luarnegeri: "Luar Negeri",
   };

   return (
      <Table bordered>
         <tbody>
            <tr>
               <th style={{ width: "20%" }}>Nama Mitra</th>
               <td>{data.mitra_nama}</td>
            </tr>
            <tr>
               <th>Jenis Mitra</th>
               <td>{data.mitra_lembaga}</td>
            </tr>
            <tr>
               <th>Negara/Asal Mitra</th>
               <td>{asal_mitra[data.mitra_asal]}</td>
            </tr>
            <tr>
               <th>Alamat Mitra</th>
               <td>{data.mitra_alamat}</td>
            </tr>
            <tr>
               <th>Website Mitra</th>
               <td>{data.mitra_website}</td>
            </tr>
         </tbody>
      </Table>
   );
};
export default IdentitasMitra;
