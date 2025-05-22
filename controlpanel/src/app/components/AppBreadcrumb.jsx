"use client";

import { CBreadcrumb, CBreadcrumbItem } from "@coreui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import navigation from "../_nav";
import { Each } from "../Each";

export default function AppBreadcrumb() {
   const { module } = useSelector((e) => e.store);
   const pathname = usePathname();

   const getRouteName = (pathname, routes) => {
      for (const route of routes) {
         if (route.href === pathname) {
            return route.name;
         }

         if (route.items) {
            const name = getRouteName(pathname, route.items);
            if (name) return name;
         }
      }

      return null;
   };

   const getBreadcrumbs = (location) => {
      const breadcrumbs = [];
      location.split("/").reduce((prev, curr, index, array) => {
         const currentPathname = `${prev}/${curr}`;
         const routeName = getRouteName(currentPathname, navigation);
         routeName &&
            breadcrumbs.push({
               pathname: currentPathname,
               name: routeName,
               active: index + 1 === array.length,
            });
         return currentPathname;
      });
      return breadcrumbs;
   };

   const breadcrumbs = getBreadcrumbs(pathname);

   const renderPageButton = (module) => {
      if (typeof module.pageButton !== "undefined" && Object.keys(module.pageButton).length > 0) {
         const { label, href, variant } = module.pageButton;

         return (
            <CBreadcrumb className="my-0">
               <li className="breadcrumb-item">
                  <Link href={href} className={`fw-bold btn btn-${variant} btn-sm`}>
                     {label}
                  </Link>
               </li>
            </CBreadcrumb>
         );
      }
   };

   return (
      <>
         <CBreadcrumb className="my-0">
            <li className="breadcrumb-item">
               <Link href="/">Home</Link>
            </li>
            <Each
               of={breadcrumbs}
               render={(breadcrumb, index) => (
                  <CBreadcrumbItem {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })} key={index}>
                     {breadcrumb.name}
                  </CBreadcrumbItem>
               )}
            />
         </CBreadcrumb>
         {renderPageButton(module)}
      </>
   );
}
