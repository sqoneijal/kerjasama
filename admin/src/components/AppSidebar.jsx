import { logo } from "@/assets/brand/logo";
import { sygnet } from "@/assets/brand/sygnet";
import { setSidebarShow, setSidebarUnfoldable } from "@/redux";
import CIcon from "@coreui/icons-react";
import { CCloseButton, CSidebar, CSidebarFooter, CSidebarHeader, CSidebarToggler } from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import navigation from "../_nav";
import AppSidebarNav from "./AppSidebarNav";

const AppSidebar = () => {
   const { sidebarShow, sidebarUnfoldable } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   return (
      <CSidebar
         className="border-end"
         colorScheme="dark"
         position="fixed"
         unfoldable={sidebarUnfoldable}
         visible={sidebarShow}
         onVisibleChange={(visible) => {
            dispatch(setSidebarShow(visible));
         }}>
         <CSidebarHeader className="border-bottom">
            <Link to="/" className="sidebar-brand">
               <CIcon customClassName="sidebar-brand-full" icon={logo} height={32} />
               <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32} />
            </Link>
            <CCloseButton className="d-lg-none" dark onClick={() => dispatch(setSidebarShow(false))} />
         </CSidebarHeader>
         <AppSidebarNav items={navigation} />
         <CSidebarFooter className="border-top d-none d-lg-flex">
            <CSidebarToggler onClick={() => dispatch(setSidebarUnfoldable(!sidebarUnfoldable))} />
         </CSidebarFooter>
      </CSidebar>
   );
};
export default AppSidebar;
