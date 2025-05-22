import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions = {
   providers: [
      KeycloakProvider({
         clientId: process.env.KEYCLOAK_CLIENT_ID,
         clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
         issuer: `https://iam.ar-raniry.ac.id/realms/${process.env.KEYCLOAK_REALM}`,
         authorization: {
            params: {
               scope: "openid profile email",
            },
         },
      }),
   ],
   session: {
      strategy: "jwt",
   },
   callbacks: {
      async session({ session, token }) {
         session.accessToken = token.accessToken;
         return session;
      },
      async jwt({ token, account }) {
         if (account) {
            token.accessToken = account.access_token;
         }
         return token;
      },
   },
};
