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
      ],
   },
];

export default _nav;
