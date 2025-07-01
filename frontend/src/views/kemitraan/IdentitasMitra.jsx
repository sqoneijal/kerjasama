import { Col, Row } from "react-bootstrap";

const IdentitasMitra = ({ ...data }) => {
   const asal_mitra = {
      dalamnegeri: "Dalam Negeri",
      luarnegeri: "Luar Negeri",
   };

   return (
      <Row>
         <Col xs={12}>
            <Row>
               <Col>
                  <h6>Nama Mitra</h6>
                  <p>{data.mitra_nama}</p>
               </Col>
               <Col>
                  <h6>Jenis Mitra</h6>
                  <p>{data.mitra_lembaga}</p>
               </Col>
               <Col>
                  <h6>Negara/Asal Mitra</h6>
                  <p>{asal_mitra[data.mitra_asal]}</p>
               </Col>
            </Row>
         </Col>
         <Col xs={12}>
            <h6>Alamat Mitra</h6>
            <p>{data.mitra_alamat}</p>
         </Col>
         <Col xs={12}>
            <h6>Website Mitra</h6>
            <p>{data.mitra_website}</p>
         </Col>
      </Row>
   );
};
export default IdentitasMitra;
