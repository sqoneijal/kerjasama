import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Page"));

// Referensi
const ReferensiLayananList = React.lazy(() => import("./views/referensi/layanan/Page"));
const ReferensiLayananForms = React.lazy(() => import("./views/referensi/layanan/Forms"));
const ReferensiMitra = React.lazy(() => import("./views/referensi/mitra/Page"));
const ReferensiMitraForms = React.lazy(() => import("./views/referensi/mitra/Forms"));
const ReferensiLayananJenisMoU = React.lazy(() => import("./views/referensi/jenismou/Page"));
const ReferensiLayananJenisMoUForms = React.lazy(() => import("./views/referensi/jenismou/Forms"));
const ReferensiLayananMoU = React.lazy(() => import("./views/referensi/mou/Page"));
const ReferensiLayananMoUForms = React.lazy(() => import("./views/referensi/mou/Forms"));
const ReferensiLayananLembaga = React.lazy(() => import("./views/referensi/lembaga/Page"));
const ReferensiLayananLembagaForms = React.lazy(() => import("./views/referensi/lembaga/Forms"));
const ReferensiBidangKerjasama = React.lazy(() => import("./views/referensi/bidangkerjasama/Page"));
const ReferensiBidangKerjasamaForms = React.lazy(() => import("./views/referensi/bidangkerjasama/Forms"));

// Tentang
const TentangProfile = React.lazy(() => import("./views/tentang/Profile"));
const TentangStrukturOrganisasi = React.lazy(() => import("./views/tentang/StrukturOrganisasi"));
const TentangSekretariat = React.lazy(() => import("./views/tentang/Sekretariat"));

// Mitra
const Mitra = React.lazy(() => import("./views/mitra/Page"));
const MitraForms = React.lazy(() => import("./views/mitra/Forms"));
const MitraDetail = React.lazy(() => import("./views/mitra/detail/Page"));

// Berita
const Berita = React.lazy(() => import("./views/berita/dalamnegeri/Page"));
const BeritaDalamNegeri = React.lazy(() => import("./views/berita/dalamnegeri/Page"));
const BeritaDalamNegeriForms = React.lazy(() => import("./views/berita/dalamnegeri/Forms"));
const BeritaLuarNegeri = React.lazy(() => import("./views/berita/luarnegeri/Page"));
const BeritaLuarNegeriForms = React.lazy(() => import("./views/berita/luarnegeri/Forms"));

// tindak lanjut
const Implementasi = React.lazy(() => import("./views/implementasi/Page"));
const ImplementasiForms = React.lazy(() => import("./views/implementasi/Forms"));

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
   { path: "/referensi/mitra", name: "Mitra", element: ReferensiMitra },
   { path: "/referensi/mitra/forms", name: "Forms", element: ReferensiMitraForms },
   { path: "/referensi/bidangkerjasama", name: "Bidang Kerja Sama", element: ReferensiBidangKerjasama },
   { path: "/referensi/bidangkerjasama/forms", name: "Forms", element: ReferensiBidangKerjasamaForms },
   { path: "/tentang", name: "Tentang", element: TentangProfile },
   { path: "/tentang/profil", name: "Profile", element: TentangProfile },
   { path: "/tentang/strukturorganisasi", name: "Struktur Organisasi", element: TentangStrukturOrganisasi },
   { path: "/tentang/sekretariat", name: "Sekretariat", element: TentangSekretariat },
   { path: "/mitra", name: "Mitra", element: Mitra },
   { path: "/mitra/forms", name: "Forms", element: MitraForms },
   { path: "/mitra/detail/:id", name: "Detail", element: MitraDetail },
   { path: "/berita", name: "Berita", element: Berita },
   { path: "/berita/dalamnegeri", name: "Dalam Negeri", element: BeritaDalamNegeri },
   { path: "/berita/dalamnegeri/forms", name: "Forms", element: BeritaDalamNegeriForms },
   { path: "/berita/luarnegeri", name: "Luar Negeri", element: BeritaLuarNegeri },
   { path: "/berita/luarnegeri/forms", name: "Forms", element: BeritaLuarNegeriForms },
   { path: "/implementasi", name: "Implementasi", element: Implementasi },
   { path: "/implementasi/forms", name: "Forms", element: ImplementasiForms },
];

export default routes;
