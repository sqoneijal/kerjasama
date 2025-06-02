import routes from "@/routes";
import { CBreadcrumb } from "@coreui/react";
import { Each } from "@helpers";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router";

const AppBreadcrumb = () => {
   const { module } = useSelector((e) => e.redux);
   const currentLocation = useLocation().pathname;

   const getRouteName = (pathname, routes) => {
      const currentRoute = routes.find((route) => route.path === pathname);
      return currentRoute ? currentRoute.name : false;
   };

   const getBreadcrumbs = (location) => {
      const breadcrumbs = [];
      location.split("/").reduce((prev, curr, index, array) => {
         const currentPathname = `${prev}/${curr}`;
         const routeName = getRouteName(currentPathname, routes);
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

   const breadcrumbs = getBreadcrumbs(currentLocation);

   const renderPageButton = (module) => {
      if (typeof module.pageButton !== "undefined" && Object.keys(module.pageButton).length > 0) {
         const { label, href, variant } = module.pageButton;

         return (
            <CBreadcrumb className="my-0">
               <li className="breadcrumb-item">
                  <Link to={href} className={`fw-bold btn btn-${variant} btn-sm`}>
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
               <Link to="/dashboard">Home</Link>
            </li>
            <Each
               of={breadcrumbs}
               render={(breadcrumb) => (
                  <li className="breadcrumb-item" key={breadcrumb.pathname}>
                     {breadcrumb.active ? breadcrumb.name : <Link to={breadcrumb.pathname}>{breadcrumb.name}</Link>}
                  </li>
               )}
            />
         </CBreadcrumb>{" "}
         {renderPageButton(module)}
      </>
   );
};
export default AppBreadcrumb;
