import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Page"));

// Referensi
const ReferensiLayananList = React.lazy(() => import("./views/referensi/layanan/Page"));
const ReferensiLayananForms = React.lazy(() => import("./views/referensi/layanan/Forms"));
const ReferensiLayananJenisMoU = React.lazy(() => import("./views/referensi/jenismou/Page"));
const ReferensiLayananJenisMoUForms = React.lazy(() => import("./views/referensi/jenismou/Forms"));
const ReferensiLayananMoU = React.lazy(() => import("./views/referensi/mou/Page"));
const ReferensiLayananMoUForms = React.lazy(() => import("./views/referensi/mou/Forms"));
const ReferensiLayananLembaga = React.lazy(() => import("./views/referensi/lembaga/Page"));
const ReferensiLayananLembagaForms = React.lazy(() => import("./views/referensi/lembaga/Forms"));
const TentangProfile = React.lazy(() => import("./views/tentang/Profile"));
const TentangStrukturOrganisasi = React.lazy(() => import("./views/tentang/StrukturOrganisasi"));
const TentangSekretariat = React.lazy(() => import("./views/tentang/Sekretariat"));
const Mitra = React.lazy(() => import("./views/mitra/Page"));
const MitraForms = React.lazy(() => import("./views/mitra/Forms"));

const routes = [
   { path: "/dashboard", name: "Dashboard", element: Dashboard },
   { path: "/referensi", name: "Referensi", element: ReferensiLayananList },
   { path: "/referensi/layanan", name: "Layanan", element: ReferensiLayananList },
   { path: "/referensi/layanan/forms", name: "Forms", element: ReferensiLayananForms },
   { path: "/referensi/jenismou", name: "Jenis MoU", element: ReferensiLayananJenisMoU },
   { path: "/referensi/jenismou/forms", name: "Forms", element: ReferensiLayananJenisMoUForms },
   { path: "/referensi/mou", name: "MoU", element: ReferensiLayananMoU },
   { path: "/referensi/mou/forms", name: "Forms", element: ReferensiLayananMoUForms },
   { path: "/referensi/lembaga", name: "Lembaga", element: ReferensiLayananLembaga },
   { path: "/referensi/lembaga/forms", name: "Forms", element: ReferensiLayananLembagaForms },
   { path: "/tentang", name: "Tentang", element: TentangProfile },
   { path: "/tentang/profil", name: "Profile", element: TentangProfile },
   { path: "/tentang/strukturorganisasi", name: "Struktur Organisasi", element: TentangStrukturOrganisasi },
   { path: "/tentang/sekretariat", name: "Sekretariat", element: TentangSekretariat },
   { path: "/mitra", name: "Mitra", element: Mitra },
   { path: "/mitra/forms", name: "Forms", element: MitraForms },
];

export default routes;
