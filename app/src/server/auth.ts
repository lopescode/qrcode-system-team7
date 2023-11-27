import { HttpRequestHelper } from "@/helpers/HTTPRequestHelper";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      accessToken: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
      }

      return token;
    },
    session({ session, token }: any) {
      if (!session) {
        console.error("No session passed to callback");
      }

      if (session.user) {
        session.user.id = token.user.id;
        session.user.accessToken = token.user.accessToken;
      }

      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        cpf: {
          label: "Cpf",
          type: "text",
          placeholder: "cpf",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) return;
        const { cpf, password } = credentials;

        const response = await HttpRequestHelper.post("auth/sign-in", {
          cpf,
          password,
        });

        if (!response || !response.result || response.result.length <= 0)
          return null;

        return response.result[0];
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/sign-in",
  },
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
