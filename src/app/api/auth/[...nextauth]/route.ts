import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "save token",
      credentials: {
        id: { type: "text" },
        accessToken: { type: "text" },
        refreshToken: { type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.accessToken) return null;

        return {
          id: credentials.id,
          accessToken: credentials.accessToken,
          refreshToken: credentials.refreshToken,
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
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
