import LogoUIN from "@/assets/images/LogoUIN";
import $ from "jquery";
import { useRef, useState } from "react";
import { Container, Form, InputGroup, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router";

const Navigation = () => {
   const searchRef = useRef(null);
   const navbarCollapse = useRef(null);

   const [showDropdown, setShowDropdown] = useState(false);

   const handleMouseEnter = () => setShowDropdown(true);
   const handleMouseLeave = () => setShowDropdown(false);

   const collapseClose = () => {
      const el = navbarCollapse.current;
      if (!el) return;
      el.classList.remove("show");
   };

   const toggleSearch = () => {
      const el = searchRef.current;
      if (!el) return;

      $(el).slideToggle();
   };

   const closeSearch = () => {
      const el = searchRef.current;
      if (!el) return;

      $(el).slideUp();
   };

   return (
      <Navbar expand="lg" sticky="top" className="custom-navbar flex-column no-logo no-logo">
         <div className="top-search w-100" ref={searchRef}>
            <Container>
               <InputGroup>
                  <InputGroup.Text>
                     <i className="fa fa-search" />
                  </InputGroup.Text>
                  <Form.Control placeholder="Cari..." />
                  <InputGroup.Text className="close-search" onClick={closeSearch}>
                     <i className="fa fa-times" />
                  </InputGroup.Text>
               </InputGroup>
            </Container>
         </div>
         <Container className="position-relative">
            <Navbar.Brand as={Link} className="d-md-none" href="/">
               <LogoUIN />
            </Navbar.Brand>
            <button type="button" className="btn btn-search d-lg-none ms-auto ms-md-0" onClick={toggleSearch}>
               <i className="fa fa-search" />
            </button>
            <Navbar.Toggle className="ms-1">
               <span className="navbar-toggler-icon" />
            </Navbar.Toggle>
            <Navbar.Collapse ref={navbarCollapse}>
               <div className="align-items-center border-bottom d-flex d-lg-none justify-content-between mb-3 navbar-collapse__header pb-3">
                  <div className="collapse-brand flex-shrink-0">
                     <a href="index.html">
                        <img src="https://theme.easital.com/html/inews/v3.2/assets/images/logo.png" className="header-logo_dark" alt="" />
                     </a>
                     <a href="index.html">
                        <img src="https://theme.easital.com/html/inews/v3.2/assets/images/logo-white.png" className="header-logo_white" alt="" />
                     </a>
                  </div>
                  <div className="flex-grow-1 ms-3 text-end">
                     <button type="button" className="bg-transparent border-0 collapse-close p-0 position-relative" onClick={collapseClose}>
                        <span />
                        <span />
                     </button>
                  </div>
               </div>
               <Nav as="ul">
                  <Nav.Item as="li">
                     <Link to="/" className="nav-link">
                        Beranda
                     </Link>
                  </Nav.Item>
                  <NavDropdown
                     as={"li"}
                     title="Tentang"
                     show={showDropdown}
                     onMouseEnter={handleMouseEnter}
                     onMouseLeave={handleMouseLeave}
                     renderMenuOnMount>
                     <Link to="/tentang/profil" className="dropdown-item">
                        Profil
                     </Link>
                     <Link to="/tentang/strukturorganisasi" className="dropdown-item">
                        Struktur Organisasi
                     </Link>
                     <Link to="/tentang/sekretariat" className="dropdown-item">
                        Sekretariat
                     </Link>
                  </NavDropdown>
                  <Nav.Item as="li">
                     <Link to="/kemitraan" className="nav-link">
                        Kemitraan
                     </Link>
                  </Nav.Item>
               </Nav>
            </Navbar.Collapse>
            <div className="w-100 w-lg-auto d-none d-lg-flex">
               <button type="button" className="btn btn-search ms-auto" onClick={toggleSearch}>
                  <i className="fa fa-search" />
               </button>
            </div>
         </Container>
      </Navbar>
   );
};
export default Navigation;
