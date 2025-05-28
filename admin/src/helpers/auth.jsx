import keycloak from "./keycloak";

export const initKeycloak = async () => {
   if (typeof window === "undefined" || !window.crypto?.subtle) {
      console.warn("Web Crypto API not available — Keycloak not initialized.");
      return null;
   }

   const authenticated = await keycloak.init({
      onLoad: "check-sso",
      checkLoginIframe: false,
   });

   if (authenticated && !keycloak.isTokenExpired()) {
      const user = await keycloak.loadUserInfo();
      return { keycloak, user };
   } else {
      keycloak.login();
      return null;
   }
};

export const handleLogout = () => {
   if (keycloak?.logout) {
      keycloak.logout({
         redirectUri: window.location.origin,
      });
   } else {
      console.warn("Keycloak belum diinisialisasi.");
   }
};
