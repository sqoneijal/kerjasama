"use client";

import CIcon from "@coreui/icons-react";
import { CCloseButton, CSidebar, CSidebarBrand, CSidebarFooter, CSidebarHeader, CSidebarToggler } from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { logo } from "../assets/brand/logo";
import { sygnet } from "../assets/brand/sygnet";
import AppSidebarNav from "../components/AppSidebarNav";
import { setSidebarShow, setUnfoldable } from "../store";

import navigation from "../_nav";

export default function AppSidebar() {
   const dispatch = useDispatch();
   const { sidebarShow, unfoldable } = useSelector((state) => state.store);

   return (
      <CSidebar
         className="border-end"
         colorScheme="dark"
         position="fixed"
         unfoldable={unfoldable}
         visible={sidebarShow}
         onVisibleChange={(visible) => {
            dispatch(setSidebarShow(visible));
         }}>
         <CSidebarHeader className="border-bottom">
            <CSidebarBrand to="/">
               <CIcon customClassName="sidebar-brand-full" icon={logo} height={32} />
               <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32} />
            </CSidebarBrand>
            <CCloseButton className="d-lg-none" dark onClick={() => dispatch(setSidebarShow(false))} />
         </CSidebarHeader>
         <AppSidebarNav items={navigation} />
         <CSidebarFooter className="border-top d-none d-lg-flex">
            <CSidebarToggler onClick={() => dispatch(setUnfoldable(!unfoldable))} />
         </CSidebarFooter>
      </CSidebar>
   );
}
