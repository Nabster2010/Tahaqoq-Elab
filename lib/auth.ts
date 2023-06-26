import { compare } from "bcryptjs";
import type { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("User and Pass");
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !(await compare(credentials.password, user.password))) {
          throw new Error("Wrong email or password cannot be empty");
        }
        if (!user.active) {
          throw new Error("User is not active");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          active: user.active,
          role: user.role,
          branch: user.branch,
        };
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }: any) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.active = user.active;
        token.role = user.role;
        token.branch = user.branch;
      }
      return token;
    },

    session({ session, token }: { session: Session; token: JWT }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          active: token.active,
          role: token.role,
          branch: token.branch,
        },
      };
    },
  },
};
