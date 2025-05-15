import { NextAuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// 토큰 타입 정의
interface Token {
  accessToken?: string;
  refreshToken?: string;
  expires_in?: number;
  refresh_token_expires_in?: number;
}

// 세션 타입 정의
interface Session extends DefaultSession {
  accessToken?: string;
  refreshToken?: string;
  expires_in?: number;
  refresh_token_expires_in?: number;
}

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    expires_in?: number;
    refresh_token_expires_in?: number;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "save token",
      credentials: {
        expires_in: { type: "text" },
        access_token: { type: "text" },
        refresh_token: { type: "text" },
        refresh_token_expires_in: { type: "text" },
      },
      async authorize(credentials) {
        if (
          !credentials?.access_token ||
          !credentials?.refresh_token ||
          !credentials?.expires_in ||
          !credentials?.refresh_token_expires_in
        ) {
          return null;
        }

        return {
          id: "User",
          accessToken: credentials.access_token,
          refreshToken: credentials.refresh_token,
          expires_in: Number(credentials.expires_in),
          refresh_token_expires_in: Number(
            credentials.refresh_token_expires_in,
          ),
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expires_in = user.expires_in;
        token.refresh_token_expires_in = user.refresh_token_expires_in;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.expires_in = token.expires_in;
      session.refresh_token_expires_in = token.refresh_token_expires_in;
      return session;
    },
  },
};
