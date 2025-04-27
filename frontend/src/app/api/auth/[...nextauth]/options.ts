import NextAuth, { AuthOptions, JWT } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { LOGIN_URL } from "@/lib/apiAuthRoutes";

export interface CustomUser {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
  provider?: string;
  token?: string;
}

export const authOptions: AuthOptions = {
  pages: { signIn: "/" },
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // 1) Persist your backend token into the NextAuth JWT
    async jwt({ token, user, account }) {
      // On initial sign-in (account is non-null), call your backend
      if (account && user) {
        // build payload from the Google user info
        const payload = {
          email: user.email,
          name: user.name,
          oauth_id: account.providerAccountId,
          provider: account.provider,
          image: user.image,
        };
        try {
          const { data } = await axios.post(LOGIN_URL, payload);
          // store everything you need
          token.user = {
            id: data.user.id.toString(),
            name: user.name!,
            email: user.email!,
            image: user.image!,
            provider: account.provider,
            token: data.user.token,    // <— your backend JWT
          } as CustomUser;
        } catch (err) {
          console.error("Error logging into backend:", err);
          // you can decide to throw or just leave `token.user` undefined
        }
      }
      return token;
    },

    // 2) Copy your custom user (with token) into the session
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as CustomUser;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
