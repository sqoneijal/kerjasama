import AppHeader from "./components/AppHeader";
import AppSidebar from "./components/AppSidebar";

export default function DefaultLayout({ children }) {
   return (
      <div>
         <AppSidebar />
         <div className="wrapper d-flex flex-column min-vh-100">
            <AppHeader />
            <div className="body flex-grow-1">{children}</div>
         </div>
      </div>
   );
}
