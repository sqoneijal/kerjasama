import React from "react";

const Beranda = React.lazy(() => import("@/views/beranda/Page"));
const BeritaRead = React.lazy(() => import("@/views/berita/read/Page"));

const routes = [
   { path: "/", name: "Beranda", element: Beranda },
   { path: "/berita/read/:slug", name: "Baca Berita", element: BeritaRead },
];

export default routes;
