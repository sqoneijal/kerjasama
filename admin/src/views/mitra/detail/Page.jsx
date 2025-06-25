import { setModule } from "@/redux";
import { CSpinner } from "@coreui/react";
import { post } from "@helpers";
import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

const DataUmum = React.lazy(() => import("./DataUmum"));
const RuangLingkup = React.lazy(() => import("./RuangLingkup"));
const IdentitasMitra = React.lazy(() => import("./IdentitasMitra"));
const Implementasi = React.lazy(() => import("./Implementasi"));

const Page = () => {
   const { id } = useParams();
   const { module } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   const [state, setState] = useState({
      pageLoading: true,
   });

   const { pageLoading } = state;

   const getData = async (id) => {
      await post(`/mitra/detail`, { id })
         .then((res) => {
            dispatch(
               setModule({
                  ...module,
                  data: res.data,
                  pageButton: {
                     variant: "danger",
                     label: "Kembali",
                     href: "/mitra",
                  },
               })
            );
         })
         .finally(() => setState({ pageLoading: false }));
   };

   useEffect(() => {
      getData(id);
      return () => {};
   }, [id]);

   return pageLoading ? (
      <CSpinner color="primary" />
   ) : (
      <React.Suspense fallback={<CSpinner color="primary" />}>
         <Tabs defaultActiveKey="umum" className="mb-2">
            <Tab eventKey="umum" title="Data Umum">
               <DataUmum />
            </Tab>
            <Tab eventKey="ruang_lingkup" title="Ruang Lingkup">
               <RuangLingkup />
            </Tab>
            <Tab eventKey="identitas_mitra" title="Identitas Mitra">
               <IdentitasMitra />
            </Tab>
            <Tab eventKey="implementasi" title="Implementasi">
               <Implementasi />
            </Tab>
         </Tabs>
      </React.Suspense>
   );
};
export default Page;
