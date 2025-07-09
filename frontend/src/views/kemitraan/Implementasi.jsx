import { setModule } from "@/redux";
import { Each } from "@helpers";
import moment from "moment";
import { Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const Implementasi = ({ ...data }) => {
   const { implementasi } = data;
   const { module } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   const statusEvaluasi = {
      sudah: "Sudah Evaluasi",
      belum: "Belum Evaluasi",
   };

   const handleClickDetailTindakLanjut = (row) => {
      dispatch(setModule({ ...module, detailTindakLanjut: row }));
   };

   return (
      <Row>
         <Col xs={12}>
            <fieldset>
               <legend>Tindak Lanjut</legend>
               <Table size="sm">
                  <thead>
                     <tr>
                        <th className="text-center">No</th>
                        <th style={{ textAlign: "left" }}>Judul Kegiatan</th>
                        <th style={{ textAlign: "left" }}>Bentuk Tindak Lanjut</th>
                        <th style={{ textAlign: "left" }}>Tanggal Pelaksanaan</th>
                        <th style={{ textAlign: "left" }}>Status Evaluasi</th>
                     </tr>
                  </thead>
                  <tbody>
                     {implementasi.length > 0 ? (
                        <Each
                           of={implementasi}
                           render={(row, index) => (
                              <tr key={row.id}>
                                 <td className="text-center">{index + 1}</td>
                                 <td>
                                    <a
                                       href="#"
                                       onClick={(e) => {
                                          e.preventDefault();
                                          handleClickDetailTindakLanjut(row);
                                       }}>
                                       {row.judul_kegiatan}
                                    </a>
                                 </td>
                                 <td>{row.bentuk_tindak_lanjut}</td>
                                 <td>{moment(row.tgl_pelaksanaan).format("DD-MM-YYYY")}</td>
                                 <td>{statusEvaluasi[row.status_evaluasi]}</td>
                              </tr>
                           )}
                        />
                     ) : (
                        <tr>
                           <td className="text-center" colSpan={5}>
                              Belum ada tindak lanjut
                           </td>
                        </tr>
                     )}
                  </tbody>
               </Table>
            </fieldset>
         </Col>
      </Row>
   );
};
export default Implementasi;
