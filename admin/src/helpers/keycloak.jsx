import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
   url: "https://iam.ar-raniry.ac.id/",
   realm: "uinar",
   clientId: "kerjasama",
});

export default keycloak;
