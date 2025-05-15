import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    accessToken?: string;
    refreshToken?: string;
    expires_in?: number;
    refresh_token_expires_in?: number;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    accessToken?: string;
    refreshToken?: string;
    expires_in?: number;
    refresh_token_expires_in?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken?: string;
    refreshToken?: string;
    expires_in?: number;
    refresh_token_expires_in?: number;
  }
}
