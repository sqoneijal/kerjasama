import { withAuth } from "next-auth/middleware";

export default withAuth({
   pages: {
      signIn: "/api/auth/signin/keycloak",
   },
});

export const config = {
   matcher: ["/((?!api|_next|static|favicon.ico).*)"], // Lindungi semua halaman selain asset/public/api
};
