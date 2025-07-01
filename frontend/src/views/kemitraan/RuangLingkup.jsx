import { Col, Row } from "react-bootstrap";

const RuangLingkup = ({ ...data }) => {
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
      <Row>
         <Col xs={12}>
            <h6>Bidang Kerja Sama</h6>
            <p>{renderArray(data.bidang_kerjasama)}</p>
         </Col>
         <Col xs={12}>
            <Row>
               <Col>
                  <h6>Tingkat</h6>
                  <p>{tingkat[data.tingkat]}</p>
               </Col>
               <Col>
                  <h6>Unit Penanggung Jawab</h6>
                  <p>{data.unit_penanggung_jawab}</p>
               </Col>
            </Row>
         </Col>
         {data.tingkat === "tingkat" && (
            <Col xs={12}>
               <h6>Fakultas Terkait</h6>
               <p>{renderArray[data.fakultas]}</p>
            </Col>
         )}
         {data.tingkat === "prodi" && (
            <Col xs={12}>
               <h6>Program Studi Terkait</h6>
               <p>{renderArray[data.prodi]}</p>
            </Col>
         )}
         <Col xs={12}>
            <h6>Tujuan Kerja Sama</h6>
            <p>{data.tujuan_kerjasama}</p>
         </Col>
      </Row>
   );
};
export default RuangLingkup;
