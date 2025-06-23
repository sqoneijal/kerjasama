import React from "react";

const Beranda = React.lazy(() => import("@/views/beranda/Page"));
const Berita = React.lazy(() => import("@/views/berita/Page"));
const BeritaRead = React.lazy(() => import("@/views/berita/read/Page"));
const Tentang = React.lazy(() => import("@/views/tentang/Page"));

const routes = [
   { path: "/", name: "Beranda", element: Beranda },
   { path: "/berita", name: "Berita", element: Berita },
   { path: "/berita/read/:slug", name: "Baca Berita", element: BeritaRead },
   { path: "/tentang/:slug", name: "Tentang", element: Tentang },
];

export default routes;
