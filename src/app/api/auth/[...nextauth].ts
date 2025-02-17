import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail } from "@/utils/database";  // Import the function we created
import { Session, User } from "next-auth"; // Import necessary types

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          return null; // If email is not provided, return null
        }
        const user = await getUserByEmail(credentials.email); // Now credentials.email is guaranteed to be a string
        if (user && user.password === credentials.password) {
          // Assuming user object has a 'role' field that tells if the user is admin
          return { ...user, isAdmin: user.role === "admin" }; // Add 'isAdmin' flag
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user }: { session: Session; user: User }) {
      session.user.id = user.id;
      session.user.isAdmin = user.isAdmin; 
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin", // Custom sign-in page (optional)
  },
};

export default NextAuth(authOptions);

declare module "next-auth" {
  interface User {
    isAdmin?: boolean;
  }
  interface Session {
    user: {
      id: string;
      isAdmin?: boolean;
      email?: string;
      name?: string;
      image?: string;
    }
  }
}
