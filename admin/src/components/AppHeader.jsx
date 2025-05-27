import { setSidebarShow } from "@/redux";
import { cilMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CContainer, CHeader, CHeaderNav, CHeaderToggler } from "@coreui/react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBreadcrumb from "./AppBreadcrumb";
import AppHeaderDropdown from "./AppHeaderDropdown";

const AppHeader = () => {
   const { sidebarShow } = useSelector((e) => e.redux);
   const dispatch = useDispatch();
   const headerRef = useRef(null);

   useEffect(() => {
      document.addEventListener("scroll", () => {
         headerRef.current?.classList.toggle("shadow-sm", document.documentElement.scrollTop > 0);
      });
   }, []);

   return (
      <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
         <CContainer className="border-bottom px-4" fluid>
            <CHeaderToggler onClick={() => dispatch(setSidebarShow(!sidebarShow))} style={{ marginInlineStart: "-14px" }}>
               <CIcon icon={cilMenu} size="lg" />
            </CHeaderToggler>
            <CHeaderNav>
               <li className="nav-item py-1">
                  <div className="vr h-100 mx-2 text-body text-opacity-75" />
               </li>
               <AppHeaderDropdown />
            </CHeaderNav>
         </CContainer>
         <CContainer className="px-4" fluid>
            <AppBreadcrumb />
         </CContainer>
      </CHeader>
   );
};

export default AppHeader;
