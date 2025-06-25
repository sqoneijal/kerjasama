import { Each } from "@helpers";
import DOMPurify from "dompurify";
import { decode } from "html-entities";
import moment from "moment";
import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

const Implementasi = () => {
   const { module } = useSelector((e) => e.redux);
   const { data } = module;
   const { implementasi } = data;

   const statusEvaluasi = {
      sudah: "Sudah Evaluasi",
      belum: "Belum Evaluasi",
   };

   return (
      <Table bordered>
         <tbody>
            <Each
               of={implementasi}
               render={(row, index) => (
                  <React.Fragment key={row.id}>
                     <tr>
                        <th className="text-center" rowSpan={5} style={{ width: "5%", fontSize: 20 }}>
                           {index + 1}
                        </th>
                        <th style={{ width: "20%" }}>Tanggal Pelaksanaan</th>
                        <td>{moment(row.tgl_pelaksanaan).format("DD-MM-YYYY")}</td>
                     </tr>
                     <tr>
                        <th>Status Evaluasi</th>
                        <td>{statusEvaluasi[row.status_evaluasi]}</td>
                     </tr>
                     <tr>
                        <th>Kegiatan yang Sudah Dilakukan</th>
                        <td dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(decode(row.dilakukan), { format: "html5" }) }} />
                     </tr>
                     <tr>
                        <th>Capaian Output</th>
                        <td dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(decode(row.capaian_output), { format: "html5" }) }} />
                     </tr>
                     <tr>
                        <th>Dokumentasi Pendukung</th>
                        <td dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(decode(row.dokumentasi_pendukung), { format: "html5" }) }} />
                     </tr>
                  </React.Fragment>
               )}
            />
         </tbody>
      </Table>
   );
};
export default Implementasi;
