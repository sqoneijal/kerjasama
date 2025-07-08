import { Each, PageSuspense } from "@helpers";
import moment from "moment";
import React from "react";
import { Accordion, Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";

const DataUmum = React.lazy(() => import("./DataUmum"));
const RuangLingkup = React.lazy(() => import("./RuangLingkup"));
const IdentitasMitra = React.lazy(() => import("./IdentitasMitra"));
const Implementasi = React.lazy(() => import("./Implementasi"));

const Lists = () => {
   const { module } = useSelector((e) => e.redux);
   const { data } = module;

   const potongString = (text, maxLength) => {
      if (text.length <= maxLength) return text;
      const trimmed = text.slice(0, maxLength);
      const lastSpace = trimmed.lastIndexOf(" ");
      return `${trimmed.slice(0, lastSpace)}...`;
   };

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

   const getTahunPerjanjian = (tanggal) => {
      return moment(tanggal).format("YYYY");
   };

   return (
      <React.Suspense fallback={<PageSuspense />}>
         <div className="tabs-wrapper">
            <Tabs fill={false}>
               {data.daftarJenisMoU.map((row) => {
                  return (
                     <Tab eventKey={row.label} title={row.label} key={row.value}>
                        <Accordion>
                           <Each
                              of={data.content.filter((e) => e.id_jenis_mou === row.value)}
                              render={(row, index) => (
                                 <Accordion.Item eventKey={row.id} key={row.id}>
                                    <Accordion.Header>
                                       <span className="fw-bold">
                                          {index + 1}. {potongString(row.mitra_nama, 80)} | {getTahunPerjanjian(row.tanggal_mulai)} |{" "}
                                          <span className="text-primary">{renderStatus(row)}</span>
                                       </span>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                       <DataUmum {...row} />
                                       <RuangLingkup {...row} />
                                       <IdentitasMitra {...row} />
                                       <Implementasi {...row} />
                                    </Accordion.Body>
                                 </Accordion.Item>
                              )}
                           />
                        </Accordion>
                     </Tab>
                  );
               })}
            </Tabs>
         </div>
      </React.Suspense>
   );
};
export default Lists;
