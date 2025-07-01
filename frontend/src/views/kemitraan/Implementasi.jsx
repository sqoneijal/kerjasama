import { Each } from "@helpers";
import DOMPurify from "dompurify";
import { decode } from "html-entities";
import moment from "moment";
import { Col, Row } from "react-bootstrap";

const Implementasi = ({ ...data }) => {
   const { implementasi } = data;

   const statusEvaluasi = {
      sudah: "Sudah Evaluasi",
      belum: "Belum Evaluasi",
   };

   return (
      <Row>
         <Col xs={12}>
            <fieldset>
               <legend>Implementasi</legend>
               <Each
                  of={implementasi}
                  render={(row, index) => (
                     <Row key={row.id}>
                        <Col sm={6}>
                           <h6>Tanggal Pelaksanaan</h6>
                           <p>{moment(row.tgl_pelaksanaan).format("DD-MM-YYYY")}</p>
                        </Col>
                        <Col sm={6}>
                           <h6>Status Evaluasi</h6>
                           <p>{statusEvaluasi[row.status_evaluasi]}</p>
                        </Col>
                        <Col xs={12}>
                           <h6>Kegiatan yang Sudah Dilakukan</h6>
                           <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(decode(row.dilakukan), { format: "html5" }) }} />
                        </Col>
                        <Col xs={12}>
                           <h6>Capaian Output</h6>
                           <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(decode(row.capaian_output), { format: "html5" }) }} />
                        </Col>
                        <Col xs={12}>
                           <h6>Dokumentasi Pendukung</h6>
                           <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(decode(row.dokumentasi_pendukung), { format: "html5" }) }} />
                        </Col>
                        {index % 2 === 0 && <hr />}
                     </Row>
                  )}
               />
            </fieldset>
         </Col>
      </Row>
   );
};
export default Implementasi;
