export default async function handler(req, res) {
   const KEYCLOAK_LOGOUT_URL = `https://iam.ar-raniry.ac.id/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/logout`;
   const redirectUri = `${process.env.NEXTAUTH_URL}`;
   const logoutUrl = `${KEYCLOAK_LOGOUT_URL}?redirect_uri=${encodeURIComponent(redirectUri)}`;

   res.redirect(logoutUrl);
}
