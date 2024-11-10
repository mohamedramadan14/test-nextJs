import NextAuth, { CallbacksOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

const authOptions = {
  callbacks: {
    async signIn({ profile }: { profile: { login: string } }) {
      return profile.login === "mohamedramadan14";
    },
  } as unknown as CallbacksOptions,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  basePath: "/api/auth",
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
