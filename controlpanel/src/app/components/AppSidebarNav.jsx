import { CBadge, CSidebarNav } from "@coreui/react";
import Link from "next/link";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

export default function AppSidebarNav({ items }) {
   const navLink = (name, icon, badge, indent = false) => {
      return (
         <>
            {icon ||
               (indent && (
                  <span className="nav-icon">
                     <span className="nav-icon-bullet" />
                  </span>
               ))}
            {name}
            {badge && (
               <CBadge color={badge.color} className="ms-auto" size="sm">
                  {badge.text}
               </CBadge>
            )}
         </>
      );
   };

   const navItem = (item, index, indent = false) => {
      const { component, name, badge, icon, href } = item;
      const Component = component;
      return (
         <Component as="div" key={index}>
            {href ? (
               <Link className="nav-link" href={href}>
                  {navLink(name, icon, badge, indent)}
               </Link>
            ) : (
               navLink(name, icon, badge, indent)
            )}
         </Component>
      );
   };

   const navGroup = (item, index) => {
      const { component, name, icon, items, ...rest } = item;
      const Component = component;
      return (
         <Component compact as="div" key={index} toggler={navLink(name, icon)} {...rest}>
            {items?.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index, true)))}
         </Component>
      );
   };

   return <CSidebarNav as={SimpleBar}>{items?.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}</CSidebarNav>;
}
