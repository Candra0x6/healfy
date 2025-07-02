import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./db";
import { createInitialChacarter } from "../service/api/user-character";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      characterId: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    characterId: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  events: {
    async createUser({ user }) {
      await createInitialChacarter(user.id);
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 2 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/sign-in",
    signOut: "/setting",
  },
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: {
            Character: {
              select: {
                id: true,
              },
            },
          },
        });

        if (dbUser) {
          token.characterId = dbUser.Character?.id as string;
        }
      }
      return token;
    },
    async session({ token, session }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.characterId = token.characterId;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Handle sign-in

      if (url.startsWith(baseUrl + "/setting")) {
        return "/sign-in"; // Or any other page you want to redirect to after sign-out
      }

      if (url.startsWith(baseUrl + "/sign-in")) {
        return "/getting-started";
      }
      return "/getting-started";

      // Handle sign-out
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
