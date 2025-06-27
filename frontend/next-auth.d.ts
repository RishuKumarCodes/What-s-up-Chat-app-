import { DefaultSession } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      /** Your app guarantees name is always a non-null string */
      name: string;
      email?: string;
      image?: string;
      token: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    token?: string
  }
}