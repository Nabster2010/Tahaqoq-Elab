import NextAuth, { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
interface User {
  id: string;
  name: string;
  email: string;
  active: boolean;
  role: string;
  branch: string;
}
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      active: boolean;
      role: string;
      branch: string;
    } & DefaultSession["user"];
  }
  interface JWT {
    user: {
      id: string;
      name: string;
      email: string;
      active: boolean;
      role: string;
      branch: string;
    } & DefaultJWT["user"];
  }
}
