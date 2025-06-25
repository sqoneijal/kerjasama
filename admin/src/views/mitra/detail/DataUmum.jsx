import moment from "moment";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

const DataUmum = () => {
   const { module } = useSelector((e) => e.redux);
   const { data } = module;

   const renderStatus = (row) => {
      if (row.is_tak_terhingga === "t") {
         return `Aktif`;
      }

      const awal = moment(row.tanggal_mulai);
      const akhir = moment(row.tanggal_berakhir);

      const diff = akhir.diff(awal, "days");
      if (diff < 0) {
         return `Tidak Aktif`;
      } else if (diff <= 30) {
         return `Akan Berakhir ${diff} Hari Lagi`;
      } else {
         return `Aktif`;
      }
   };

   return (
      <Table bordered>
         <tbody>
            <tr>
               <th style={{ width: "20%" }}>Jenis Dokumen</th>
               <td>{data.mou}</td>
            </tr>
            <tr>
               <th>Nomor Dokumen</th>
               <td>{data.nomor_dokumen}</td>
            </tr>
            <tr>
               <th>Judul Kegiatan</th>
               <td>{data.judul_kegiatan}</td>
            </tr>
            <tr>
               <th>Tanggal Kerjasama</th>
               <td>
                  {moment(data.tanggal_mulai).format("DD-MM-YYYY")} s/d{" "}
                  {data.is_tak_terhingga === "t" ? "-" : moment(data.tanggal_berakhir).format("DD-MM-YYYY")}
               </td>
            </tr>
            <tr>
               <th>Status</th>
               <td>
                  {renderStatus({
                     tanggal_mulai: data.tanggal_mulai,
                     tanggal_berakhir: data.tanggal_berakhir,
                     is_tak_terhingga: data.is_tak_terhingga,
                  })}
               </td>
            </tr>
            <tr>
               <th>Dokumen</th>
               <td>
                  <a href={`https://drive.google.com/file/d/${data.id_dokumen}/view?usp=drive_link`} target="_blank">
                     {data.nama_dokumen}
                  </a>
               </td>
            </tr>
         </tbody>
      </Table>
   );
};
export default DataUmum;
