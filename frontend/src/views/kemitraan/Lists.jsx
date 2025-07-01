import { Each, PageSuspense } from "@helpers";
import React from "react";
import { Accordion } from "react-bootstrap";
import { useSelector } from "react-redux";

const DataUmum = React.lazy(() => import("./DataUmum"));
const RuangLingkup = React.lazy(() => import("./RuangLingkup"));
const IdentitasMitra = React.lazy(() => import("./IdentitasMitra"));

const Lists = () => {
   const { module } = useSelector((e) => e.redux);
   const { data } = module;

   const potongString = (text, maxLength) => {
      if (text.length <= maxLength) return text;
      const trimmed = text.slice(0, maxLength);
      const lastSpace = trimmed.lastIndexOf(" ");
      return `${trimmed.slice(0, lastSpace)}...`;
   };

   return (
      <React.Suspense fallback={<PageSuspense />}>
         <Accordion>
            <Each
               of={data}
               render={(row, index) => (
                  <Accordion.Item eventKey={row.id} key={row.id}>
                     <Accordion.Header className="fw-bold">
                        {index + 1}. {potongString(row.mitra_nama, 80)}
                     </Accordion.Header>
                     <Accordion.Body>
                        <DataUmum {...row} />
                        <RuangLingkup {...row} />
                        <IdentitasMitra {...row} />
                     </Accordion.Body>
                  </Accordion.Item>
               )}
            />
         </Accordion>
      </React.Suspense>
   );
};
export default Lists;
