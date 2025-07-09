import { setModule } from "@/redux";
import DOMPurify from "dompurify";
import { decode } from "html-entities";
import moment from "moment";
import { useEffect, useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const DetailTindakLanjut = () => {
   const { module } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   const [openModal, setOpenModal] = useState(false);
   const [data, setData] = useState({});

   useEffect(() => {
      const { detailTindakLanjut } = module;
      if (typeof detailTindakLanjut !== "undefined" && Object.keys(detailTindakLanjut).length > 0) {
         setOpenModal(true);
         setData(detailTindakLanjut);
      }
      return () => {};
   }, [module]);

   const handleClose = () => {
      setOpenModal(false);
      dispatch(setModule({ ...module, detailTindakLanjut: {} }));
   };

   const statusEvaluasi = {
      sudah: "Sudah Evaluasi",
      belum: "Belum Evaluasi",
   };

   return (
      <Modal show={openModal} onHide={handleClose} size="lg">
         <Modal.Header closeButton>
            <Modal.Title>{data.judul_kegiatan}</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Row>
               <Col>
                  <Form.Label className="fw-bold">Bentuk Tindak Lanjut</Form.Label>
                  <p>{data.bentuk_tindak_lanjut}</p>
               </Col>
               <Col>
                  <Form.Label className="fw-bold">Tanggal Pelaksanaan</Form.Label>
                  <p>{moment(data.tgl_pelaksanaan).format("DD-MM-YYYY")}</p>
               </Col>
               <Col>
                  <Form.Label className="fw-bold">Status Evaluasi</Form.Label>
                  <p>{statusEvaluasi[data.status_evaluasi]}</p>
               </Col>
            </Row>
            <Row>
               <Col>
                  <Form.Label className="fw-bold">Kegiatan yang Sudah Dilakukan</Form.Label>
                  <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(decode(data.dilakukan), { format: "html5" }) }} />
               </Col>
            </Row>
            <Row>
               <Col>
                  <Form.Label className="fw-bold">Capaian Output dan Review Manfaat Kerjasama</Form.Label>
                  <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(decode(data.capaian_output), { format: "html5" }) }} />
               </Col>
            </Row>
            <Row>
               <Col>
                  <Form.Label className="fw-bold">Dokumentasi Pendukung</Form.Label>
                  <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(decode(data.dokumentasi_pendukung), { format: "html5" }) }} />
               </Col>
            </Row>
         </Modal.Body>
      </Modal>
   );
};
export default DetailTindakLanjut;
