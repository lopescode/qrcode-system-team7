import { HttpRequestHelper } from "@/helpers/HTTPRequestHelper";
import { JWTHelper } from "@/helpers/JWTHelper";
import { type GetServerSidePropsContext } from "next";
import {
  Session,
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      access_token: string;
      order_id: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        return { access_token: user.access_token };
      }

      return token;
    },
    session({ session, token }: { session: Session; token: JWT }) {
      const accessToken = String(token.access_token);

      if (!accessToken) return session;

      session.user.access_token = accessToken;
      session.user.id = (JWTHelper.decodeToken(accessToken) as any).id;
      session.user.order_id = (
        JWTHelper.decodeToken(accessToken) as any
      ).order_id;

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
