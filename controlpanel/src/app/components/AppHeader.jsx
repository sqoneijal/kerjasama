"use client";

import { cilMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CContainer, CHeader, CHeaderNav, CHeaderToggler } from "@coreui/react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSidebarShow } from "../store";
import AppBreadcrumb from "./AppBreadcrumb";
import AppHeaderDropdown from "./AppHeaderDropdown";

export default function AppHeader() {
   const headerRef = useRef();
   const dispatch = useDispatch();
   const { sidebarShow } = useSelector((e) => e.store);

   return (
      <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
         <CContainer className="border-bottom px-4" fluid>
            <CHeaderToggler onClick={() => dispatch(setSidebarShow(!sidebarShow))} style={{ marginInlineStart: "-14px" }}>
               <CIcon icon={cilMenu} size="lg" />
            </CHeaderToggler>
            <CHeaderNav>
               <AppHeaderDropdown />
            </CHeaderNav>
         </CContainer>
         <CContainer className="px-4" fluid>
            <AppBreadcrumb />
         </CContainer>
      </CHeader>
   );
}
