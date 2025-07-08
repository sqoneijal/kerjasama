import moment from "moment";
import { Col, Row } from "react-bootstrap";

const DataUmum = ({ ...data }) => {
   const renderStatus = (row) => {
      if (row.is_tak_terhingga === "t") {
         return `Aktif`;
      }

      const awal = moment();
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

   const renderDokumen = (row) => {
      if (row.status_dokumen === "private") {
         return <span>-</span>;
      }

      return (
         <a href={`https://drive.google.com/file/d/${row.id_dokumen}/view?usp=drive_link`} target="_blank" rel="noopener noreferrer">
            {row.nama_dokumen}
         </a>
      );
   };

   return (
      <Row>
         <Col xs={12}>
            <Row>
               <Col>
                  <h6>Jenis Dokumen</h6>
                  <p>{data.mou}</p>
               </Col>
               <Col>
                  <h6>Nomor Dokumen</h6>
                  <p>{data.nomor_dokumen}</p>
               </Col>
               <Col>
                  <h6>Tanggal Kerjasama</h6>
                  <p>
                     {moment(data.tanggal_mulai).format("DD-MM-YYYY")} s/d{" "}
                     {data.is_tak_terhingga === "t" ? "-" : moment(data.tanggal_berakhir).format("DD-MM-YYYY")}
                  </p>
               </Col>
            </Row>
         </Col>
         <Col xs={12}>
            <h6>Judul Kegiatan</h6>
            <p>{data.judul_kegiatan}</p>
         </Col>
         <Col xs={12}>
            <Row>
               <Col>
                  <h6>Status</h6>
                  <p>
                     {renderStatus({
                        tanggal_mulai: data.tanggal_mulai,
                        tanggal_berakhir: data.tanggal_berakhir,
                        is_tak_terhingga: data.is_tak_terhingga,
                     })}
                  </p>
               </Col>
               <Col>
                  <h6>Dokumen</h6>
                  <p>{renderDokumen(data)}</p>
               </Col>
            </Row>
         </Col>
      </Row>
   );
};
export default DataUmum;
