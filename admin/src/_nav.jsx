import { cilSpeedometer } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CNavGroup, CNavItem } from "@coreui/react";

const _nav = [
   {
      component: CNavItem,
      name: "Dashboard",
      href: "/dashboard",
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
   },
   {
      component: CNavGroup,
      name: "Referensi",
      href: "/referensi",
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      items: [
         {
            component: CNavItem,
            name: "Layanan",
            href: "/referensi/layanan",
         },
         {
            component: CNavItem,
            name: "Jenis MoU",
            href: "/referensi/jenismou",
         },
         {
            component: CNavItem,
            name: "Naskah Kerjasama",
            href: "/referensi/mou",
         },
         {
            component: CNavItem,
            name: "Lembaga",
            href: "/referensi/lembaga",
         },
         {
            component: CNavItem,
            name: "Mitra",
            href: "/referensi/mitra",
         },
         {
            component: CNavItem,
            name: "Bidang Kerja Sama",
            href: "/referensi/bidangkerjasama",
         },
      ],
   },
   {
      component: CNavGroup,
      name: "Tentang",
      href: "/tentang",
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      items: [
         {
            component: CNavItem,
            name: "Profil",
            href: "/tentang/profil",
         },
         {
            component: CNavItem,
            name: "Struktur Organisasi",
            href: "/tentang/strukturorganisasi",
         },
         {
            component: CNavItem,

            name: "Sekretariat",
            href: "/tentang/sekretariat",
         },
      ],
   },
   {
      component: CNavItem,
      name: "Mitra",
      href: "/mitra",
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
   },
   {
      component: CNavItem,
      name: "Implementasi",
      href: "/implementasi",
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
   },
   {
      component: CNavGroup,
      name: "Berita",
      href: "/berita",
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      items: [
         {
            component: CNavItem,
            name: "Dalam Negeri",
            href: "/berita/dalamnegeri",
         },
         {
            component: CNavItem,
            name: "Luar Negeri",
            href: "/berita/luarnegeri",
         },
      ],
   },
];

export default _nav;
